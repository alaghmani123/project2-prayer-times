import React from 'react';
import { breakStatement } from '@babel/types';

const Home = () => (
  <div className= "homePage">
    <h1>PRAYER TIMES</h1>
    <h6>SALAM ALIKUM</h6>
    <breakStatement>
    <p>Prayer Times is an application built for Muslims who live in non-Islamic countries and cannot hear</p>
    </breakStatement>
      <p> adhan (or azan) - the call to prayer - 5 times a day. The Prayer Times API is in JSON formats</p> 
      <breakStatement>
      <p>and allows users to stream the prayer announcement Adhan five times a day. Endpoints support </p>
      </breakStatement>
      <p>  prayer times calendar, geolocation information, and current time-stamp</p>
      
    
  </div>
)

export default Home