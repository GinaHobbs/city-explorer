import React from 'react';
import axios from 'axios'
import './App.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      locationData: {},
      latitude: '',
      longitude: '',
      map: {},
      weather: [],
      movies: []
    }
  }

  getLocationData = async () => {
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`
      const response = await axios.get(API);
      this.setState({locationData: response.data[0]})
      this.setState({latitude: this.state.locationData.lat})
      this.setState({longitude: this.state.locationData.lon})
      let url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.latitude},${this.state.longitude}&zoom=18`
      this.setState({map: url})
      this.getWeatherData();
      this.getMovieData();
    }
    catch (e) {
      alert(e.message)
    }
  }

  getWeatherData = async () => {
    const API = 'http://localhost:3333';
    const weatherData = await axios.get(`${API}/weather?lat=${this.state.latitude}&lon=${this.state.longitude}`);
    this.setState({weather: weatherData.data})
    // console.log(weatherData)
  }

  getMovieData = async () => {
    const API = 'http://localhost:3333';
    const movieData = await axios.get(`${API}/movies?query=${this.state.searchQuery}`)
    this.setState({movies: movieData.data})
    console.log(movieData.data)
  }

  getSearchQuery = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="type city here..." onChange={this.getSearchQuery}></input>
        <button onClick={this.getLocationData}>Explore!</button>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.state.map} />
          <Card.Body>
            <Card.Title>Location: {this.state.locationData.display_name}</Card.Title>
            <Card.Text>
            <p>Latitude: {this.state.locationData.lat}</p>
            <p>Longitude: {this.state.locationData.lon}</p>
            <p>Weather Date: {this.state.weather.length?this.state.weather[0].date:null}</p>
            <p>Weather Description: {this.state.weather.length?this.state.weather[0].description:null}</p>
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
        <p>{this.state.movies.length?this.state.movies[0].title:null}</p>
        <p>{this.state.movies.length?this.state.movies[0].description:null}</p>
      </div>
    );
  }
  
}

export default App;
