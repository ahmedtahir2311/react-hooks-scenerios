import { useEffect, useState } from 'react';

export const useDimensions = () => {
  const [currentSize, setCurrentSize] = useState(checkSize(window.innerWidth));

  useEffect(() => {
    const listener = () => {
      setCurrentSize(checkSize(window.innerWidth));
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  return { currentSize, width: window.innerWidth };
};

const sizes = {
  xs: [250, 359],
  sm: [360, 600],
  md: [601, 1280],
  lg: [1280, 3000],
};

const checkSize = (size) =>
  Object.keys(sizes).find((key) => size >= sizes[key][0] && size <= sizes[key][1]);
