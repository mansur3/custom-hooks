import { useState, useEffect } from "react";

export function useAsync(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((x) => x.json())
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
  }, []);

  return {
    loading,
    error,
    data
  };
}
