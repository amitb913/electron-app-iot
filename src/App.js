import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
import './weather-icons.min.css';
import cities from 'cities.json';
import Stock from './components/Stock';
import { News, YoutubeScreen } from './screens';
import moment from 'moment';

import {
  FirebaseDatabaseNode,
  FirebaseDatabaseProvider,
} from '@react-firebase/database';
import firebase from 'firebase';
import { config } from './config';

const Home = (props) => {
  const [currTime, setCurrTime] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(moment().format('h:mm:ss a'));
    }, 1000);
  }, []);

  useEffect(() => {
    getLatLong(city);
    getWeatherData();
  }, []);

  const [weather, setWeather] = useState({
    temperature: 0,
    name: 'Snow',
    city: 'Parsippany',
    highTemp: 0,
    lowTemp: 0,
  });
  const [hourlyWeather, setHourlyWeather] = useState();
  const [city, setCity] = useState('Parsippany');
  const [cityCoords, setCityCoords] = useState(
    cities.findIndex(
      (element) =>
        element.name.toLowerCase().replace(/\s/g, '') ==
        city.toLowerCase().replace(/\s/g, '')
    ) != -1
      ? {
          latitude:
            cities[
              cities.findIndex(
                (element) =>
                  element.name.toLowerCase().replace(/\s/g, '') ==
                  city.toLowerCase().replace(/\s/g, '')
              )
            ].lat,
          longitude:
            cities[
              cities.findIndex(
                (element) =>
                  element.name.toLowerCase().replace(/\s/g, '') ==
                  city.toLowerCase().replace(/\s/g, '')
              )
            ].lng,
        }
      : { latitude: 0, longitude: 0 }
  );
  function getWeatherData() {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cityCoords.latitude}&lon=${cityCoords.longitude}&units=imperial&appid=962bd3074ff80eaf5f861706dead66aa`
    )
      .then((response) => response.json())
      .then((data) => {
        setHourlyWeather(data.hourly);
        var unix_timestamp = data.hourly[0].dt;
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = '0' + date.getMinutes();
        var seconds = '0' + date.getSeconds();
        const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(
          -2
        )}`;
        console.log(hourlyWeather);
      });
  }

  const getLatLong = (cityName) => {
    let formattedCity = city.toLowerCase().replace(/\s/g, '');
    let cityIndex = cities.findIndex(
      (element) =>
        element.name.toLowerCase().replace(/\s/g, '') == formattedCity
    );
    setCityCoords(
      cityIndex != -1
        ? { latitude: cities[cityIndex].lat, longitude: cities[cityIndex].lng }
        : { latitude: 0, longitude: 0 }
    );
  };

  return (
    <div style={{ alignItems: 'center', justifyContent: 'center' }}>
      <link rel="stylesheet" href="./weather-icons.min.css"></link>
      <div>
        {/* <Stock symbol="AMZN" /> */}
        <FirebaseDatabaseNode path="navi/" limitToFirst={2}>
          {(d) => {
            return (
              <div>
                {d.value == null || d.value.naviPage == 'Home'
                  ? null
                  : d.value.naviPage == 'News'
                  ? props.history.push('/news')
                  : props.history.push('/youtubevid')}
              </div>
            );
          }}
        </FirebaseDatabaseNode>
      </div>
      <div>
        <h1 style={{ textAlign: 'center', fontSize: 50 }}>
          {/* {`${time.currentDisplayedHour}:${time.currentMinute}:${time.currentSeconds} ${time.amPM}`} */}
          {currTime}
        </h1>
        <h2 style={{ textAlign: 'center' }}>
          {moment().hour() >= 5 && moment().hour() <= 11
            ? 'Good morning, '
            : moment().hour() > 5 && moment().hour() <= 17
            ? 'Good afternoon, '
            : 'Good evening, '}
          Amit
        </h2>
      </div>

      <div
        id="hourlyForecast"
        style={{ alignItems: 'center', alignSelf: 'center' }}
      >
        {hourlyWeather != undefined
          ? hourlyWeather.slice(0, 11).map((item) => (
              <div id="cardContainer" style={styles.cardContainer}>
                <p style={{ color: 'darkslateblue' }}>
                  <b>{moment.unix(item.dt).format('h a')}</b>
                </p>
                <p style={{ color: 'cornflowerblue' }}>
                  <b>{Math.round(item.temp)}°F</b>
                </p>
                <i
                  style={{ color: 'darkslateblue', width: '100%' }}
                  className={`wi wi-owm-${item.weather[0].id}`}
                ></i>
                <p style={{ color: 'cornflowerblue' }}>
                  <b>{item.weather[0].main}</b>
                </p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    backgroundColor: 'white',
    display: 'inline-block',
    marginLeft: 8,
    marginRight: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 10,
    width: 100,
    // justifyContent: 'center'
  },
};

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/" />
        <Route path="/home" component={Home} />
        <Route path="/youtubevid" component={YoutubeScreen} />
        <Route path="/news" component={News} />
      </Switch>
    </HashRouter>
  );
}
