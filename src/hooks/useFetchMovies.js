import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchMovies = (token, selectedGenre, searchQuery, totalMoviesToFetch) => {
  const [genres, setGenres] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    let isMounted = true;

    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/genres/movies`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          cancelToken: source.token,
        });
        if (isMounted) {
          setGenres(response.data.data || []);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching genres:', error);
          setError(error);
        }
      }
    };

    fetchGenres();

    return () => {
      isMounted = false;
      source.cancel('Component unmounted');
    };
  }, [token]);

  useEffect(() => {
    if (!token || !selectedGenre) return;

    setLoading(true);
    const source = axios.CancelToken.source();
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        let url = `${process.env.REACT_APP_API_BASE_URL}/movies?limit=${totalMoviesToFetch}`;
        
        if (searchQuery) {
          url += `&search=${searchQuery}`;
        }

        if (selectedGenre) {
          url += `&genre=${selectedGenre}`;
        }

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          cancelToken: source.token,
        });

        if (isMounted) {
          setAllMovies(response.data.data || []);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching movies:', error);
          setError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
      source.cancel('Component unmounted');
    };
  }, [token, selectedGenre, searchQuery, totalMoviesToFetch]);

  return { genres, allMovies, loading, error };
};

export default useFetchMovies;
