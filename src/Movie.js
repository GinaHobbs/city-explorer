import React from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <Card style={{ width: '18rem' }}>
          {/* <Card.Img variant="top" src={this.props.image_src} /> */}
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>
              <p>{this.props.description}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Movie;