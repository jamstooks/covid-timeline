import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import _ from "lodash";

import states from "./states.json";
import events from "./events.json";

import { getColor } from "./utils";
import { getCountries } from "./global";

// This should use an API eventually
export const useData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    if (!data) {
      // US Data

      // Transform state data to key-values with date keys
      const stateCounts = states.reduce((acc, state) => {
        const { date, ...s } = state;

        if (!acc[date]) acc[date] = [];
        acc[date].push({ ...s, color: getColor(s) });
        return acc;
      }, {});

      // Get running global totals from state data
      const dateList = Object.keys(stateCounts).sort();

      const USTotals = dateList.reduce((acc, d) => {
        const caseCount = _.sum(stateCounts[d].map(state => state.cases));
        const deathCount = _.sum(stateCounts[d].map(state => state.deaths));
        acc[d] = { cases: caseCount, deaths: deathCount };
        return acc;
      }, {});

      const sortedDates = dateList.map(d => parse(d, "yyyy-MM-dd", new Date()));

      const countries = getCountries();

      // Add US to Countries
      sortedDates.forEach(date => {
        const caseRow = _.find(countries.cases, ["date", date.getTime()]);
        if (caseRow)
          caseRow["United States"] = USTotals[format(date, "yyyy-MM-dd")].cases;
        const deathRow = _.find(countries.deaths, ["date", date.getTime()]);
        if (deathRow)
          deathRow["United States"] =
            USTotals[format(date, "yyyy-MM-dd")].deaths;
      });

      console.log(countries);

      setData([stateCounts, sortedDates, countries, events]);
    }
  }, [data]);

  return data;
};
