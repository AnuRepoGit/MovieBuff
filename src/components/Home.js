import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'; 


const Home = () => {
  const backgroundImageStyle = {
    backgroundImage: 'url(/images/movies.jpg)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',     
  };

  return (
    <div style={backgroundImageStyle}>
      <Container className="text-center" style={{ paddingTop: '5rem' }}>
        <h1 className="home-title" style={{ color: 'black' }}>Welcome to the Movie Buff App</h1>
        <Row className="mt-4">
          <Col>
            <Link to="/search">
              <Button variant="primary" className="mx-2">Search Movies</Button>
            </Link>
            <Link to="/filter">
              <Button variant="secondary" className="mx-2">Filter Movies</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

