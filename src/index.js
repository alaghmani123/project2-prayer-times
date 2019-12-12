import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Prayer from "./Prayer"
// import axios from "axios";
import * as serviceWorker from './serviceWorker';



ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
