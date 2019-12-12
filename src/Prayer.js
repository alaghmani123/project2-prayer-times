import React from 'react';
import axios from "axios"




class Prayer extends React.Component {


  state = {
    lat: null,
    long: null,
    errorMessage: "",
    city: null,
    country: null,
    array: [],
    GetTime: Number,
    Verse: ""
  };
  
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(position =>
      this.setState(
        {
          lat: position.coords.latitude,
          long: position.coords.longitude
        },
        () => {
          this.locationLookUp(this.state.lat, this.state.long);
        }
      )
    );
  }


  locationLookUp(lat, long) {
    console.log("locationLookUp");
    if (this.state.lat && this.state.long) {
      axios({
        url: `https://us1.locationiq.com/v1/reverse.php?key=8ef09f9d46ab63&lat=${lat}&lon=${long}&format=json`,
        method: "get"
      }).then(response => {
        console.log(response.data.address.city, response.data.address.country);
        this.setState({
          city: response.data.address.city,
          country: response.data.address.country
        });
        this.prayerApi();
      });
    }
  }
  handleChange(e) {
    this.setState({ city: e.target.value })
    
  }

  onFormSearch = event => {
    event.preventDefault()
    this.prayerApi()
    
  }


  prayerApi = () => {


    axios({
      method: "GET",
      url: `https://api.aladhan.com/v1/calendarByAddress?address=${this.state.city}&method=2&month=04&year=2017`

    }).then(response => {
      let date = response.data.data[0]
   
      console.log(date.timings);
      let singleTiming =
        <div>
          <p>Fajr: {date.timings.Fajr}</p>
          <p>Dhuhr: {date.timings.Dhuhr}</p>
          <p>Asr: {date.timings.Asr}</p>
          <p>Maghrib: {date.timings.Maghrib}</p>
          <p>Isha: {date.timings.Isha}</p>
          <h3>Sunrise: {date.timings.Sunrise}</h3>
          <h3>Midnight: {date.timings.Midnight}</h3>
          
        </div>

      
      this.setState({ singleTiming })
    });

    

  
  };

  QuranApi = () => {
    const randomNumber = Math.floor((Math.random() * 15) + 1);

    axios({
      method: "GET",
      url: `https://api.alquran.cloud/v1/sajda/en.asad`
    }).then(response => {
      console.log(response.data.data.ayahs[randomNumber])

      this.setState({
        Verse: response.data.data.ayahs[randomNumber].text
      })
    })
  }




  render() {

    return (
      <div>
          <p className="App-clock">
          
          Your time is {(new Date()).toLocaleTimeString()}
          {/* {(window.navigator.geolocation.getCurrentPosition)} */}
          <i class="huge clock outline icon"></i>
        </p> 
        {this.state.long &&
          this.state.lat &&
          this.state.city &&
          this.state.country ? (
            <div>

              <h1>PRAYER TIMES</h1>
              <div>Current longitude: {this.state.long}</div>
              <div>Current latitude: {this.state.lat}</div>
              <div>City: {this.state.city}</div>
              <div>country: {this.state.country}</div>
              
           
              {this.state.singleTiming}
            </div>
          ) : (
            
            <div>
              <div>
              {/* (new Date()).toLocaleTimeString() */}
            
          
        </div>
              
              
              <h1>Please Accept Location Request To Continue</h1>
              <i class="huge notched circle loading icon"></i>
            </div>

          )}
        <div>
          <button className="buttonContainer" onClick={() => this.QuranApi()}>GET THE VERSE OF THE DAY </button>
       
          <div>Verse: {this.state.Verse}</div>
          <form onSubmit={(e) => this.onFormSearch(e)}>
            <input onChange={(e) => this.setState({ city: e.target.value })} name="city" type="text" placeholder="Enter City" />
            <input type='submit' value="Search location" />

          </form>
        </div>
      </div>

    )
  }

}


export default Prayer;