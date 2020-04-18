# U.S. Covid Timeline

https://jamstooks.github.io/covid-timeline/

An app displaying transmission and deaths over time, highlighting key events along the way.

![Screenshot from 2020-04-16 07-17-30](https://user-images.githubusercontent.com/585436/79476973-7c0d9480-7fbe-11ea-879f-4b571a0cbc08.png)

## Tech

[React](https://reactjs.org/) |
[Mapbox](https://www.mapbox.com/) |
[Material-UI](https://material-ui.com/) |
[Recharts](https://recharts.org/en-US/)

## Data Sources

U.S. States Data: [The New York Times](https://github.com/nytimes/covid-19-data)

World Data: [Johns Hopkins University](https://github.com/CSSEGISandData/COVID-19)

## Local Development

Get a [Mapbox Token](https://www.mapbox.com/) and set the environment variable: `REACT_APP_MAPBOX_TOKEN`

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app), so just:

```
yarn install
yarn start
```

## Might do...

- [ ] process data nightly
- [ ] move from JSON to API
- [ ] add additional quote events, perhaps from the WHO
- [ ] add toggle switch to disable looping for playback
- [ ] improve mobile support

## License

[MIT](https://opensource.org/licenses/MIT)
