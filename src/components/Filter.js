import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Container, Spinner, Alert, Row, Col, Form, Button } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import { AuthContext } from '../context/AuthProvider';
import MoviesList from '../components/MoviesList';
import PaginationComponent from '../components/Pagination';
import useFetchMovies from '../hooks/useFetchMovies';
import { useNavigate } from 'react-router-dom';

const Filter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [totalMoviesToFetch, setTotalMoviesToFetch] = useState(500); // Default value
  const [moviesPerPage, setMoviesPerPage] = useState(9); // Default value

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const { genres, allMovies, loading, error } = useFetchMovies(token, selectedGenre, searchQuery, totalMoviesToFetch);

  const getFilteredMovies = useCallback(() => {
    return allMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allMovies, searchQuery]);

  useEffect(() => {
    // Update displayed movies when the current page or movies per page changes
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    setDisplayedMovies(getFilteredMovies().slice(startIndex, endIndex));
  }, [currentPage, moviesPerPage, getFilteredMovies]);

  useEffect(() => {
    setTotalPages(Math.ceil(getFilteredMovies().length / moviesPerPage));
  }, [getFilteredMovies, moviesPerPage]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleMoviesPerPageChange = (event) => {
    setMoviesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when movies per page changes
  };

  const handleTotalMoviesToFetchChange = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setTotalMoviesToFetch(value);
      setCurrentPage(1); // Reset to the first page when total movies to fetch changes
    }
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
          <h1 className="d-inline">Movie Filter</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="genreFilter">
            <Form.Label>Filter by Genre</Form.Label>
            <Form.Control
              as="select"
              value={selectedGenre}
              onChange={handleGenreChange}
            >
              <option value="">Select Genre</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.title}>
                  {genre.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="totalMoviesToFetch">
            <Form.Label>Total Movies to Fetch</Form.Label>
            <Form.Control
              type="number"
              value={totalMoviesToFetch}
              onChange={handleTotalMoviesToFetchChange}
              min="1"
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
              min="1"
            />
          </Form.Group>
        </Col>
      </Row>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">Error: {error.message}</Alert>
      ) : (
        selectedGenre && (
          <>
            <MoviesList movies={displayedMovies} />
            <Row className="mt-4">
              <Col>
                <PaginationComponent 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  setPage={setCurrentPage} 
                />
              </Col>
              <Col className="text-right">
                <p>Total Movies: {getFilteredMovies().length}</p>
              </Col>
            </Row>
          </>
        )
      )}
    </Container>
  );
};

export default Filter;
