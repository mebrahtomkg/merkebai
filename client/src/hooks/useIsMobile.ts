import { useState, useLayoutEffect } from 'react';

const useIsMobile = () => {
  const mediaQuery = window.matchMedia('(max-width: 744px)');

  const [isMobile, setIsMobile] = useState(mediaQuery.matches);

  useLayoutEffect(() => {
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [mediaQuery]);

  return isMobile;
};

export default useIsMobile;
