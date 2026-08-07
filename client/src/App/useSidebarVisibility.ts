import { useHardwareBack, useIsMobile } from '@/hooks';
import { useAppStateStore } from '@/store';

const useSidebarVisibility = () => {
  const isMobile = useIsMobile();

  const isSidebarVisible = useAppStateStore((state) => state.isSidebarVisible);
  const closeSidebar = useAppStateStore((state) => state.closeSidebar);

  // In non mobile devices always show sidebar, otherwise it depend on the global store value.
  const isVisible = !isMobile || isSidebarVisible;

  useHardwareBack(isVisible, closeSidebar);

  return {
    isSidebarVisible: isVisible,
  };
};

export default useSidebarVisibility;
