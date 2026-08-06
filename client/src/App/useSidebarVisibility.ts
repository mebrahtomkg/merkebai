import { useIsMobile } from '@/hooks';
import { useAppStateStore } from '@/store';

const useSidebarVisibility = () => {
  const isSidebarVisible = useAppStateStore((state) => state.isSidebarVisible);

  const isMobile = useIsMobile();

  // In non mobile devices always show sidebar, otherwise it depend on the global store value.
  return {
    isSidebarVisible: !isMobile || isSidebarVisible,
  };
};

export default useSidebarVisibility;
