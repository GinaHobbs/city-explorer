import React from 'react';
import Movie from './Movie.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      this.props.movieData.map(movie => {
        return <Movie title={movie.title} description={movie.description} /> 
      })
    )
  }
}

export default Main;