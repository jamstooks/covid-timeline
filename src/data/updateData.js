const axios = require("axios");
const csv = require("csvtojson");
const fs = require("file-system");

const runUpdate = () => {
  const pairs = [
    [
      "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv",
      "src/data/json/states.json",
    ],
    [
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
      "src/data/json/global_cases.json",
    ],
    [
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv",
      "src/data/json/global_deaths.json",
    ],
  ];

  pairs.forEach((p) => csvToFile(...p));
};

const csvToFile = async (url, path) => {
  const jsonObj = await fetchCSVasJSON(url);
  fs.writeFile(path, JSON.stringify(jsonObj), function (err) {});
  console.log(`Wrote ${path}`);
};

const fetchCSVasJSON = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const jsonData = await convertToJSON(data);
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const convertToJSON = async (csvStr) => {
  return await csv({ checkType: true }).fromString(csvStr);
};

runUpdate();
