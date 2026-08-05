import { MouseEventHandler, useCallback, useState } from 'react';

const useShowChildOnHover = () => {
  const [isChildVisible, setIsChildVisible] = useState(false);

  const handleMouseEnter: MouseEventHandler = useCallback((e) => {
    setIsChildVisible(true);
  }, []);

  const handleMouseLeave: MouseEventHandler = useCallback((e) => {
    setIsChildVisible(false);
  }, []);

  return {
    isChildVisible,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useShowChildOnHover;
