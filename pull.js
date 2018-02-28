const knex = require('knex');
const request = require('request-promise');

const visitSchema = {
  visitorId: 'string',
  serverTimestamp: 'integer',
  firstActionTimestamp: 'integer',
  lastActionTimestamp: 'integer',
  visitDuration: 'integer',
  daysSinceFirstVisit: 'integer'
};

const detailSchema = {
  type: 'string',
  url: 'string',
  pageTitle: 'string',
  timestamp: 'integer',
  timeSpent: 'integer',
  eventCategory: 'string',
  eventAction: 'string',
  eventName: 'string'
};

const url = getenv('URL');
const token = getenv('TOKEN');
const dbFilename = getenv('DB');

const date = process.argv[2];
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  throw new Error('Expected <date> argument');
}

function getenv(name) {
  if (name in process.env) {
    return process.env[name];
  }
  throw new Error(`Missing ${name} environment variable`);
}

Array.prototype.flatMap = function(lambda) {
  return Array.prototype.concat.apply([], this.map(lambda));
};

async function main() {
  const db = await setupDatabase();
  const results = await fetchResults();

  await insertResults(db, results);

  console.log("Inserted %d visits", results.length);
  console.log("Sample Visit:");
  console.dir(results[0], {depth: null});
}

async function setupDatabase() {
  const db = knex({
    client: 'sqlite3',
    connection: {
      filename: dbFilename
    }
  });
  await db.schema
    .createTableIfNotExists('visits', (t) => {
      t.integer('idVisit').primary();

      Object.keys(visitSchema).forEach((name) => {
        t[visitSchema[name]](name).notNull();
      });
    })
    .createTableIfNotExists('actionDetails', (t) => {
      t.integer('pageId').primary();
      t.integer('idVisit').notNull();
      t.foreign('idVisit').references('visits.idVisit');

      Object.keys(detailSchema).forEach((name) => {
        t[detailSchema[name]](name).notNull();
      });
    });
  return db;
}

function fetchResults() {
  return request({
    url: url,
    json: true,
    qs: {
      token_auth: token,
      module: 'API',
      method: 'Live.getLastVisitsDetails',
      idSite: 1,
      period: 'day',
      date: date,
      format: 'Json',
      filter_limit: -1
    }
  });
}

async function insertResults(db, results) {
  const visits = results.map((visit) => pick(visitSchema, visit, {
    idVisit: visit.idVisit
  }));

  await db.batchInsert('visits', visits, 50);

  const actionDetails = results.flatMap((visit) =>
    visit.actionDetails.map((actionDetail) => pick(detailSchema, actionDetail, {
      pageId: actionDetail.pageId,
      idVisit: visit.idVisit
    }))
  );

  await db.batchInsert('actionDetails', actionDetails, 50);
}

function pick(schema, data, extra) {
  const row = Object.assign({}, extra);
  Object.keys(schema).forEach((name) => {
    row[name] = data[name] || '';
  });
  return row;
}



main().catch((err) => {
  console.error(err);
  process.exit(1);
});
