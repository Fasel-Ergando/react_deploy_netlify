import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // perform fetch operations only when the component is mounted to prevent memory leaks
    const source = axios.CancelToken.source(); // a cancel token to cancel request when the component is unmounted to prevent memory leaks

    const fetchData = async (url) => {
      setIsLoading(true); // start loading

      try {
        const response = await axios.get(url, {
          CancelToken: source.token,
        });

        if (isMounted) {
          // set the data state to the response data if the current component is mounted.
          // if the current component is unmounted, we do not want to set the data state to the response data because this will create memory leaks resulting in and inefficient performance.
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false; // component has unmounted
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
