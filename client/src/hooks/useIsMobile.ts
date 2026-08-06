import { useState, useLayoutEffect } from 'react';

const getMediaQuery = () => window.matchMedia('(max-width: 744px)');

const useIsMobile = () => {
  // Get result immediately, though modification needed for future SSR
  const [isMobile, setIsMobile] = useState(getMediaQuery().matches);

  useLayoutEffect(() => {
    const mediaQuery = getMediaQuery();

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
