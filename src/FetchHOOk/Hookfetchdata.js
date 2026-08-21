import { useState, useEffect, useCallback } from "react";

const useFetch = (url, options = {}) => {
  const { immediate = true, defaultData = null } = options;
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(immediate);
  const [postLoading, setPostLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = useCallback(
    async (method = "GET", body = null, customUrl = null) => {
      const targetUrl = customUrl || url;
      if (!targetUrl) return null;

      if (method === "POST") {
        setPostLoading(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const response = await fetch(targetUrl, {
          method,
          headers: body ? { "Content-Type": "application/json" } : undefined,
          body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }
        const result = await response.json();
        if (method === "GET") {
          setData(result);
        }
        return result;
      } catch (err) {
        setError(err.message);
        return null;
      } finally {
        if (method === "POST") {
          setPostLoading(false);
        } else {
          setLoading(false);
        }
      }
    },
    [url]
  );

  useEffect(() => {
    if (immediate && url && !url.includes("/login")) {
      handleRequest("GET");
    } else {
      setLoading(false);
    }
  }, [immediate, url, handleRequest]);

  return {
    data,
    loading,
    error,
    postLoading,
    fetchData: () => handleRequest("GET"),
    postData: (body) => handleRequest("POST", body),
    request: (body) => handleRequest("POST", body) // Added request alias for backwards compatibility
  };
};

export default useFetch;
