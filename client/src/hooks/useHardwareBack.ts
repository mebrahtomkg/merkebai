import { useEffect, useRef } from 'react';

class Stack {
  arr: string[];

  constructor() {
    this.arr = [];
  }

  push(value: string) {
    this.arr.push(value);
  }

  remove(value: string) {
    this.arr = this.arr.filter((item) => item !== value);
  }

  peek() {
    return this.arr[this.arr.length - 1];
  }
}

const stack = new Stack();

const useHardwareBack = (isVisible: boolean, onClose: () => void) => {
  const modalId = useRef(Math.random().toString(36).substring(2, 9)).current;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    // 1. If modal showed up, push stack to history after a tiny delay
    if (isVisible) {
      // Delay pushing to allow any previous modal's asynchronous history.back() to resolve safely
      timeoutId = setTimeout(() => {
        window.history.pushState({ modalId }, '', window.location.href);
        stack.push(modalId);
      }, 50);
    }

    // 2. If modal gets closed programmatically, take out the stack from history.
    if (!isVisible) {
      stack.remove(modalId);

      // Only go back if we are actually in that history currently
      if (window.history.state?.modalId === modalId) {
        window.history.back();
      }
    }

    return () => clearTimeout(timeoutId);
  }, [isVisible, modalId]);

  useEffect(() => {
    // 3. If back hardware is pressed, close the modal.
    const handlePopState = (e: PopStateEvent) => {
      if (
        stack.peek() === modalId &&
        e.state?.modalId !== modalId // Avoids top modal from closing a modal below it.
      ) {
        stack.remove(modalId);
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [onClose, modalId]);
};

export default useHardwareBack;
