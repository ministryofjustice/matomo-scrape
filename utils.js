const fs = require("fs");
const mkdirp = require("mkdirp");
const CLI = require("clui"),
  Spinner = CLI.Spinner;

module.exports.getEnv = getEnv;
module.exports.getEstablishmentDetails = getEstablishmentDetails;
module.exports.generateCSVFile = generateCSVFile;
module.exports.countDownSpinner = countDownSpinner;

function countDownSpinner(text) {
  return new Spinner(text || "Downloading data. Please wait...  ", [
    "⣾",
    "⣽",
    "⣻",
    "⢿",
    "⡿",
    "⣟",
    "⣯",
    "⣷"
  ]);
}

function getEstablishmentDetails(name) {
  const token =
    name === "berwyn"
      ? process.env.MATOMO_TOKEN_BERWYN
      : process.env.MATOMO_TOKEN_WAYLAND;
  const siteUrl =
    name === "berwyn"
      ? process.env.MATOMO_URL_BERWYN
      : process.env.MATOMO_URL_WAYLAND;

  return {
    name,
    siteUrl,
    token
  };
}

function generateCSVFile(folderPath, filePath, data) {
  return new Promise((resolve, reject) => {
    mkdirp(folderPath, error => {
      if (error) {
        reject(error);
      } else {
        fs.writeFileSync(filePath, data);
        resolve(true);
      }
    });
  });
}

function getEnv(name, fallback, options = {}) {
  if (process.env[name]) {
    return process.env[name];
  }
  if (fallback !== undefined && (!production || !options.requireInProduction)) {
    return fallback;
  }
  throw new Error(`Missing env var ${name}`);
}
