import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mapContainer: {
    width: "100%",
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      height: "33vh"
    },
    [theme.breakpoints.up("md")]: {
      height: "42vh"
    }
  }
}));

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

export default function Map({ data }) {
  const mapContainer = useRef(null);
  const [renderedMap, setRenderedMap] = useState();
  const classes = useStyles();

  // Load the map
  useEffect(() => {
    if (!renderedMap) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/jamstooks/ck8wbxsdc0i6c1ipbwnxatah0",
        center: [-96, 36.5],
        zoom: 1,
        interactive: false
      });

      map.on("load", () => {
        map.addSource("states", {
          type: "vector",
          url: "mapbox://mapbox.us_census_states_2015"
        });

        // Add layer from the vector tile source with data-driven style
        map.addLayer({
          id: "state-fills",
          type: "fill",
          source: "states",
          "source-layer": "states",
          paint: {
            "fill-color": "#bbbbbb"
          }
        });
        map.addLayer({
          id: "state-borders",
          type: "line",
          source: "states",
          "source-layer": "states",
          layout: {},
          paint: {
            "line-color": "#ffffff",
            "line-width": 1
          }
        });

        const bounds = [[-127, 50], [-65, 23]];
        map.fitBounds(bounds);
        window.addEventListener("resize", () => map.fitBounds(bounds));
        setRenderedMap(map);
      });
    }
  }, [renderedMap]);

  // Load the data
  useEffect(() => {
    if (renderedMap) {
      var expression = ["match", ["get", "STATE_NAME"]];

      // // Calculate color for each state based
      data.forEach(function(row) {
        var color = row["color"];
        expression.push(row["state"], color);
      });
      expression.push("#eeeeee");

      renderedMap.setPaintProperty("state-fills", "fill-color", expression);
    }
  }, [renderedMap, data]);

  return <div ref={mapContainer} className={classes.mapContainer} />;
}
