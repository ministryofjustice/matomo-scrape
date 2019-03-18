const knex = require("knex");
const request = require("request-promise");
const datefn = require("date-fns");

const PromiseBar = require("promise.bar");
PromiseBar.enable();

const visitSchema = {
  visitorId: "string",
  serverTimestamp: "integer",
  firstActionTimestamp: "integer",
  lastActionTimestamp: "integer",
  visitDuration: "integer",
  daysSinceFirstVisit: "integer"
};

const detailSchema = {
  type: "string",
  url: "string",
  pageTitle: "string",
  timestamp: "integer",
  timeSpent: "integer",
  eventCategory: "string",
  eventAction: "string",
  eventName: "string"
};

const url = getenv("URL");
const token = getenv("TOKEN");
const dbFilename = getenv("DB");

const date = process.argv[2];
const numberOfDays = process.argv[3] || 1;

if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  throw new Error("Expected <date range argument> argument (YYYY-MM-DD)");
}

Array.prototype.flatMap = function(lambda) {
  return Array.prototype.concat.apply([], this.map(lambda));
};

module.exports = async function main() {
  const db = await setupDatabase();
  const dates = generateDatesToStore(date, numberOfDays);

  await PromiseBar.all(storeStats(db, dates), { label: "Progress" });
};

async function setupDatabase() {
  const db = knex({
    client: "sqlite3",
    connection: {
      filename: dbFilename
    },
    useNullAsDefault: true
  });
  await db.schema.hasTable("visits").then(exists => {
    if (!exists) {
      return db.schema.createTable("visits", t => {
        t.integer("idVisit").primary();

        Object.keys(visitSchema).forEach(name => {
          t[visitSchema[name]](name).notNull();
        });
      });
    }
  });

  await db.schema.hasTable("actionDetails").then(exists => {
    if (!exists) {
      return db.schema.createTable("actionDetails", t => {
        t.integer("pageId").primary();
        t.integer("idVisit").notNull();
        t.foreign("idVisit").references("visits.idVisit");

        Object.keys(detailSchema).forEach(name => {
          t[detailSchema[name]](name).notNull();
        });
      });
    }
  });

  return db;
}

function generateDatesToStore(startDate, numberOfDaysToAdd) {
  return Array(Number(numberOfDaysToAdd))
    .fill(undefined)
    .map((_, i) => {
      const daysToAdd = i;
      const theDate = datefn.parse(startDate);
      const newDate = datefn.addDays(theDate, daysToAdd);

      return datefn.format(newDate, "YYYY-MM-DD");
    });
}

function storeStats(db, dates) {
  return dates.map(async day => {
    console.log(`Fetching stats and storing data for the date: ${day}`);
    return storeResults(db, day);
  });
}

async function storeResults(db, day) {
  const results = await fetchResults(day);

  if (!results.map) {
    console.log(results);
  }

  await insertResults(db, results);
}

function fetchResults(day = date) {
  return request({
    url: url,
    json: true,
    qs: {
      token_auth: token,
      module: "API",
      method: "Live.getLastVisitsDetails",
      idSite: 1,
      period: "day",
      date: day,
      format: "Json",
      filter_limit: -1
    }
  });
}

async function insertResults(db, results) {
  const visits = results.map(visit =>
    pick(visitSchema, visit, {
      idVisit: visit.idVisit
    })
  );

  await db.batchInsert("visits", visits, 50);

  const actionDetails = results.flatMap(visit =>
    visit.actionDetails.map(actionDetail =>
      pick(detailSchema, actionDetail, {
        pageId: actionDetail.pageId,
        idVisit: visit.idVisit
      })
    )
  );

  await db.batchInsert("actionDetails", actionDetails, 50);
}

function pick(schema, data, extra) {
  const row = Object.assign({}, extra);
  Object.keys(schema).forEach(name => {
    row[name] = data[name] || "";
  });
  return row;
}

function getenv(name) {
  if (name in process.env) {
    return process.env[name];
  }
  throw new Error(`Missing ${name} environment variable`);
}
