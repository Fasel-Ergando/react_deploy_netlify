import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // run at load time

    window.addEventListener("resize", handleResize);

    return () => {
      //runs when the current component unmounts
      window.removeEventListener("resize", handleResize);
    }; //prevent a memory leak
  }, []);

  return windowSize;
};

export default useWindowSize;
