import { useState, useEffect, useCallback } from 'react';
import api from '@/services/api';

/**
 * Custom hook for data fetching with loading and error states.
 * 
 * @param {string} url - The API endpoint to fetch
 * @param {object} options - Axios config options
 * @param {Array} dependencies - Dependencies to re-trigger the fetch
 */
export const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api(url, options);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, error, isLoading, refetch };
};

export default useFetch;
