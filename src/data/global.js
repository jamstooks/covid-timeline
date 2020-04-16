import _ from "lodash";
import { parse } from "date-fns";

import cases from "./global_cases.json";
import deaths from "./global_deaths.json";

export const COMPARE_COUNTRIES = [
  "United States",
  "China",
  "Korea, South",
  "Spain",
  "Germany",
  "Italy",
  "France",
  "United Kingdom"
];

export const getCountries = () => {
  return { cases: processGlobalSet(cases), deaths: processGlobalSet(deaths) };
};

const processGlobalSet = dataSet => {
  const filtered = _.filter(
    dataSet,
    c => _.intersection([c["Country/Region"]], COMPARE_COUNTRIES).length
  );
  const consolidated = mergeProvinces(filtered);
  return mapDates(consolidated);
};

// take [
/// {"Country/Region": "US", "Province/State": "RI", "1/22/20": 0, "1/23/20": 0, ...}
/// {"Country/Region": "US", "Province/State": "WA", "1/22/20": 1, "1/23/20": 0, ...}
// ...]
// convert to {"US": {"1/22/20": 1, "1/23/20": 0, ...}...}
const mergeProvinces = countries => {
  return countries.reduce((acc, c) => {
    const {
      "Country/Region": country,
      "Province/State": state,
      Lat,
      Long,
      ...dates
    } = c;
    if (!(country in acc)) acc[country] = {};

    _.keys(dates).forEach(date => {
      if (!(date in acc[country])) acc[country][date] = 0;
      acc[country][date] += dates[date];
    });
    return acc;
  }, {});
};

// convert {
//  "US": {"1/22/20": 0, "1/23/20": 1, ...},
//  "China": {"1/22/20": 1, "1/23/20": 1, ...}
// ...}
//
// to [
//  {date: "1/22/20", "US": 0, "China": 1},
//  {date: "1/22/20", "US": 1, "China": 1},
// ]
const mapDates = countries => {
  // to {'1/22/20': "us": 1, 'china': 1} ...

  const reduced = _.keys(countries).reduce((acc, countryName) => {
    const dates = countries[countryName];

    _.keys(dates).forEach(date => {
      if (!(date in acc)) acc[date] = {};
      acc[date] = { ...acc[date], [countryName]: dates[date] };
    });

    return acc;
  }, {});

  // return reduced;
  return _.keys(reduced).map(date => {
    return {
      date: parse(date, "M/d/yy", new Date()).getTime(),
      ...reduced[date]
    };
  });
};
