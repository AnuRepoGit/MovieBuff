// src/hooks/useGraphqlApi.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGraphqlApi = (token, searchQuery, totalMoviesToFetch) => {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchMovies = async () => {
      try {
        setLoading(true);  // Ensure loading state is set to true at the beginning of the fetch
        setError(null);    // Reset error state before new fetch

        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          cancelToken: source.token,
        };

        const graphqlQuery = {
          query: `
            query GetAllMovies($page: Int!, $perPage: Int!) {
              movies(pagination: { page: $page, perPage: $perPage }) {
                nodes {
                  id
                  title
                  posterUrl
                  rating
                  summary
                  duration
                  datePublished
                  genres {
                    title
                    id
                  }
                }
              }
            }
          `,
          variables: {
            page: 1,
            perPage: totalMoviesToFetch,
          },
        };

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/graphql`,
          graphqlQuery,
          config
        );

        console.log('GraphQL response:', response); // Log the response for debugging

        if (response.data && response.data.data && response.data.data.movies) {
          setAllMovies(response.data.data.movies.nodes);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Error fetching movies:', error);
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      source.cancel('Component unmounted');
    };
  }, [token, totalMoviesToFetch]);

  return { allMovies, loading, error };
};

export default useGraphqlApi;
