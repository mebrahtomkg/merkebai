import { useCallback, useEffect, useRef } from 'react';

const useHardwareBack = (isVisible: boolean, onClose: () => void) => {
  const isVisibleRef = useRef(false);

  const modalId = useRef(Math.random().toString(36).substring(2, 9)).current;

  const pushHistoryState = useCallback(() => {
    window.history.pushState({ modalId }, '', window.location.href);
  }, [modalId]);

  const goBackHistory = useCallback(() => {
    if (window.history.state?.modalId === modalId) {
      window.history.back();
    }
  }, [modalId]);

  useEffect(() => {
    // 1. If modal showedup, push stack to history.
    if (isVisible && !isVisibleRef.current) {
      isVisibleRef.current = true;
      pushHistoryState();
    }

    // 2. If modal get closed, take out the stack from history.
    if (isVisibleRef.current && !isVisible) {
      isVisibleRef.current = false;
      goBackHistory();
    }
  }, [isVisible, pushHistoryState, goBackHistory]);

  useEffect(() => {
    // 3. If back hardware is pressed, close the modal.
    const handlePopState = (e: PopStateEvent) => {
      if (isVisibleRef.current && e.state?.modalId !== modalId) {
        onClose();
        isVisibleRef.current = false;
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [onClose, modalId]);
};

export default useHardwareBack;
