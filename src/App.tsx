import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';

const Home = () => {


  useEffect(() => {
    const interval = setInterval(() => {
        getCurrentTime()
    }, 1000)
}, [])


  const [time, setTime] = useState({ currentHour: 1, currentDisplayedHour: 1, currentMinute: 1, currentSeconds: 1, amPM: 'am' });
  const getCurrentTime = () => {
    let hour = new Date().getHours();
    let displayedHour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let am_pm = 'pm';

    if( minutes < 10 )
    {
        minutes = '0' + minutes;
    }

    if( seconds < 10 )
    {
        seconds = '0' + seconds;
    }

    if( hour > 12 )
    {
        displayedHour = hour - 12;
    }

    if( hour == 0 )
    {
        displayedHour = 12;
    }

    if( new Date().getHours() < 12 )
    {
        am_pm = 'am';
    }
      setTime({ currentHour: hour, currentDisplayedHour: displayedHour, currentMinute: minutes, currentSeconds: seconds, amPM: am_pm })

  }




  return (
    <div>
      <h1 style={{alignSelf: 'center', textAlign: 'center', fontSize: 50}}>
        {
        time.currentHour >= 5 && time.currentHour <= 11 ? "Good morning, "
        : time.currentHour <= 17 ? "Good afternoon, "
        : "Good evening, "
        }Amit.
      </h1>

      <h1 style={{textAlign: 'center', fontSize: 100}}>{`${time.currentDisplayedHour}:${time.currentMinute}:${time.currentSeconds} ${time.amPM}`}</h1>
      <div>

      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
