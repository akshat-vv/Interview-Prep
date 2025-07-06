import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url) => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    fetchData(url);
  }, []);

  return { data, loading, error };
};

export default useFetch;
