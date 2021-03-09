import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from 'firebase';
import { config } from './config';

render(
  <FirebaseDatabaseProvider firebase={firebase} {...config}>
    <App />
  </FirebaseDatabaseProvider>,
  document.getElementById('root')
);
