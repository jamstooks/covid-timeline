import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { theme } from "./theme";
import "./styles.css";

import Map from "./components/Map";
import DateSlider from "./components/DateSlider";
import Chart from "./components/Chart";
import LoadingIndicator from "./components/LoadingIndicator";
import Events, { EventProvider } from "./components/Events";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { useData } from "./data/";

export default function App() {
  const data = useData();
  const [date, setDate] = useState();

  useEffect(() => {
    if (!date && data) {
      const [, sortedDates] = data;
      setDate(sortedDates[0]);
    }
  }, [data, date]);

  if (!date) return <LoadingIndicator />;

  const [stateCounts, sortedDates, chartData, events] = data;

  const mapData = stateCounts[format(date, "yyyy-MM-dd")];

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <EventProvider>
          <CssBaseline />
          <Header />
          <Map data={mapData} />
          <DateSlider date={date} setDate={setDate} dates={sortedDates} />
          <Chart data={chartData} date={date} />
          <Events date={date} events={events} />
          <Footer />
        </EventProvider>
      </ThemeProvider>
    </div>
  );
}
