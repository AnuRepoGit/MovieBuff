import React, { useEffect, useState, useContext } from 'react';
import { Container, Spinner, Alert, Row, Col, Button, Form } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import MovieSearch from '../components/MovieSearch';
import PaginationComponent from '../components/Pagination';
import MoviesList from '../components/MoviesList';
import useGraphqlApi from '../hooks/useGraphqlApi';
import { AuthContext } from '../context/AuthProvider';
import '../App.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [moviesPerPage, setMoviesPerPage] = useState(15); // Default value
  const [totalMoviesToFetch, setTotalMoviesToFetch] = useState(500); // Default value

  const { token } = useContext(AuthContext);
  const { allMovies, loading, error } = useGraphqlApi(token, searchQuery, totalMoviesToFetch);

  const getFilteredMovies = () => {
    return allMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    const filteredMovies = getFilteredMovies();
    setTotalPages(Math.ceil(filteredMovies.length / moviesPerPage));
    setMovies(filteredMovies.slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage));
  }, [searchQuery, currentPage, moviesPerPage, allMovies]);

  const handleMoviesPerPageChange = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setMoviesPerPage(value);
      setCurrentPage(1);
    }
  };

  const handleTotalMoviesToFetchChange = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setTotalMoviesToFetch(value);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container>
      <Row className="align-items-center my-4">
        <Col className="text-left" md={4}>
          <Button variant="link" href="/">
            <FaHome size={24} />
          </Button>
        </Col>
        <Col md={8}>
          <h1 className="d-inline">Search Movies</h1>
        </Col>
      </Row>
      <MovieSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={() => setCurrentPage(1)} />
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="totalMoviesToFetch">
            <Form.Label>Total Movies to Fetch</Form.Label>
            <Form.Control
              type="number"
              value={totalMoviesToFetch}
              onChange={handleTotalMoviesToFetchChange}
              min="1" // Set minimum value to 1
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="moviesPerPage">
            <Form.Label>Movies per Page</Form.Label>
            <Form.Control
              type="number"
              value={moviesPerPage}
              onChange={handleMoviesPerPageChange}
              min="1" // Set minimum value to 1
            />
          </Form.Group>
        </Col>
      </Row>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">Error: {error.message}</Alert>
      ) : (
        <>
          <MoviesList movies={movies} />
          <Row className="mt-4">
            <Col>
              <PaginationComponent currentPage={currentPage} totalPages={totalPages} setPage={handlePageChange} />
            </Col>
            <Col className="text-right">
              <p>Total Movies: {getFilteredMovies().length}</p>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Search;
