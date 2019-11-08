import React, { Component } from "react";
import "./App";
import axios from "axios";
import Search from './Search';
import Home from "./Home";
import Prayer from "./Prayer";
import About from "./About";
import PrayerToSay from "./PrayerToSay";

 import {
   BrowserRouter as Router,
   Route,
   Link,
  Switch
 } from 'react-router-dom';



class App extends Component {

// QuranApi = () => {
//       axios({
//         method: "GET",
//         url: `http://api.alquran.cloud/v1/surah`
//       }).then(response => {
//         console.log('quran',response)
//       })
//     }
  render() {
    console.log(this.state);

    return (
      
      <div>
        <Router>
          <nav>
           
                <Link to="/">Home page</Link>
             
                <Link to="/prayer">prayer Time</Link>
            
                <Link to="/About">About</Link>

                <Link to="/PrayerToSay">Prayers</Link>
            
            
          </nav>
          <Switch>
            <Route exact path="/" component={Home}></Route>

            <Route path="/prayer" component={Prayer}></Route>

            <Route path="/About" component={About}></Route>

            <Route path="/PrayerToSay" component={PrayerToSay}></Route>
            
          </Switch>
        </Router>

   
      </div>
    );
  }
}

export default App;
