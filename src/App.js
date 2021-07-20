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
      map: {}
    }
  }

  getLocationData = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`
    const response = await axios.get(API);
    this.setState({locationData: response.data[0]})
    console.log(this.state.locationData);
    this.setState({latitude: this.state.locationData.lat})
    this.setState({longitude: this.state.locationData.lon})
    let url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.latitude},${this.state.longitude}&zoom=18`
    this.setState({map: url})
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
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      </div>
    );
  }
  
}

export default App;
