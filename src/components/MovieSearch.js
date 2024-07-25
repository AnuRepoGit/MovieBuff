import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';


const MovieSearch = ({ searchQuery, setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  
  const handleSearchChange = (e) => {
    setLocalQuery(e.target.value);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setSearchQuery(localQuery);
  };

 
  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <Form className="mb-4 d-flex movie-search-form" onSubmit={handleSubmit}>
  <FormControl
    type="text"
    placeholder="Search movies"
    className="movie-search-input"
    value={localQuery}
    onChange={handleSearchChange}
  />
  <Button variant="outline-success" type="submit" className="movie-search-button">
    Search
  </Button>
  {localQuery && (
    <Button variant="outline-secondary" onClick={handleClear} className="movie-search-clear">
      Clear
    </Button>
  )}
</Form>

  );
};

export default MovieSearch;
