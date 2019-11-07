import React from 'react';
import axios from "axios"
import App from "./App"



class Prayer extends React.Component {

  state = {
    lat: null,
    long: null,
    errorMessage: "",
    city: null,
    country: null,
    array: []
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
      url: `http://api.aladhan.com/v1/calendarByAddress?address=${this.state.city}&method=2&month=04&year=2017`

    }).then(response => {
      let date = response.data.data[0]
      // let array = response.data.data.map((date, index) => {
      console.log(date.timings);
      let singleTiming =
        <div>
          <p>Fajr: {date.timings.Fajr}</p>
          <p>Dhuhr: {date.timings.Dhuhr}</p>
          <p>Asr: {date.timings.Asr}</p>
          <p>Maghrib: {date.timings.Maghrib}</p>
          <p>Isha: {date.timings.Isha}</p>
        </div>

      // });
      // this.setState({ array });
      this.setState({ singleTiming })
    });
    
    axios({
          method: "GET",
          url: `http://api.alquran.cloud/v1/sajda/en.asad`
        }).then(response => {
          console.log('quran',response.data.data)
        })

  };

 
    QuranApi = () => {
      axios({
        method: "GET",
        url: `http://api.alquran.cloud/v1/surah`
      }).then(response => {
        console.log('quran',response.config)
      })
    }
  
    

  render() {
   
    return (
      <div>
        {this.state.long &&
          this.state.lat &&
          this.state.city &&
          this.state.country ? (
            <div>
              <div>longitude: {this.state.long}</div>
              <div>latitude: {this.state.lat}</div>
              <div>City: {this.state.city}</div>
              <div>country: {this.state.country}</div>
              {/* {this.state.array} */}
              {this.state.singleTiming}
            </div>
          ) : (
            <div>
              <p>Loading</p>
            </div>

          )}
        <div>
          <div>{this.QuranApi}</div>
          <form onSubmit={(e) => this.onFormSearch(e)}>
            <input onChange={(e) => this.setState({ city: e.target.value })} name="city" type="text" placeholder="city?" />
            <input type='submit' value="Get city Prayer time" />
          </form>
        </div>
      </div>
      
    )
  }
  
}


export default Prayer;