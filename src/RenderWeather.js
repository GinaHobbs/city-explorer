import React from 'react';
import Weather from './Weather.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      this.props.weatherData.map(weather => {
        return <Weather date={weather.date} description={weather.description} />
      })
    )
  }
}

export default Main;