import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const MoviesList = ({ movies }) => {
  const defaultPosterUrl = process.env.PUBLIC_URL + 'images/default-poster.jpg'; // Path to the default image in the public directory
  const defaultDescription = "No description available.";
  const defaultRating = "N/A";

  if (movies.length === 0) {
    return <p>No movies to show.</p>;
  }

  return (
    <Row>
      {movies.map((movie) => (
        <Col key={movie.id} md={4} className="mb-4">
          <Card>
            <Card.Img 
              variant="top" 
              src={movie.posterUrl || defaultPosterUrl} 
              alt={movie.title} 
            />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.summary || defaultDescription}</Card.Text>
              <Card.Text>Rating: {movie.rating || defaultRating}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MoviesList;
