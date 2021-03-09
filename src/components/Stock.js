import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const Stock = (props) => {
  useEffect(() => {
    fetchStockData();
  }, []);

  const [xVals, setXVals] = useState([]);
  const [yVals, setYVals] = useState([]);

  const fetchStockData = () => {
    const symbol = props.symbol == undefined ? "AAPL" : props.symbol;
    const API_KEY = 'WP64PR22A1ZOM8EO';
    const API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`;

    const fetchedDates = [];
    const fetchedPrices = [];

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        for (var key in data['Time Series (Daily)']) {
          // console.log(`${data['Time Series (Daily)'][key]['1. open']} on ${key}`);
          fetchedDates.push(key);
          fetchedPrices.push(data['Time Series (Daily)'][key]['1. open']);
        }
        setXVals(fetchedDates);
        setYVals(fetchedPrices);
        console.log(`${xVals}, ${yVals}`);
      });
  };

  return (
    <div>
      <Plot
        data={[
          {
            x: xVals,
            y: yVals,
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'teal' },
            backgroundColor: 'red',
          },
        ]}
        layout={{ width: 720, height: 440, title: props.symbol == undefined ? "Undefined prop, showing AAPL" : '$' + props.symbol }}
      />
    </div>
  );
};

export default Stock;
