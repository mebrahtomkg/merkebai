import { useEffect, useRef } from 'react';

const useHardwareBack = (isVisible: boolean, onClose: () => void) => {
  const isVisibleRef = useRef(false);
  const isPushedRef = useRef(false);
  const modalId = useRef(Math.random().toString(36).substring(2, 9)).current;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    // 1. If modal showed up, push stack to history after a tiny delay
    if (isVisible && !isVisibleRef.current) {
      isVisibleRef.current = true;

      // Delay pushing to allow any previous modal's asynchronous history.back() to resolve safely
      timeoutId = setTimeout(() => {
        window.history.pushState({ modalId }, '', window.location.href);
        isPushedRef.current = true;
      }, 50);
    }

    // 2. If modal gets closed programmatically, take out the stack from history.
    if (isVisibleRef.current && !isVisible) {
      isVisibleRef.current = false;

      // Only go back in history if we actually successfully pushed a state earlier
      if (isPushedRef.current) {
        window.history.back();
        isPushedRef.current = false;
      }
    }

    return () => clearTimeout(timeoutId);
  }, [isVisible, modalId]);

  useEffect(() => {
    // 3. If back hardware is pressed, close the modal.
    const handlePopState = (e: PopStateEvent) => {
      // Only react if we are visible AND we successfully pushed our state.
      // This prevents us from catching the popstate of a completely different, closing modal.
      if (
        isVisibleRef.current &&
        isPushedRef.current &&
        e.state?.modalId !== modalId
      ) {
        onClose();
        isVisibleRef.current = false;
        isPushedRef.current = false;
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [onClose, modalId]);
};

export default useHardwareBack;
