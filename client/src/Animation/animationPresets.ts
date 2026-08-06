import { AnimationOptions } from './types';

export const ANIMATION_DIALOG_FAST: AnimationOptions = {
  initialStyles: { opacity: 0, transform: 'translateY(10px)' },
  finalStyles: { opacity: 1, transform: 'translateY(0)' },
  transition: {
    property: ['transform', 'opacity'],
    duration: [200, 200],
    timingFunction: ['ease-out', 'ease-out'],
  },
};

export const ANIMATION_MODAL: AnimationOptions = {
  initialStyles: { opacity: 0, transform: 'scale(0.8)' },
  finalStyles: { opacity: 1, transform: 'scale(1.0)' },
  transition: {
    property: ['transform', 'opacity'],
    duration: [300, 300],
    timingFunction: ['ease-in-out', 'ease-in-out'],
  },
};

export const ANIMATION_MODAL_SUBSTANTIAL: AnimationOptions = {
  initialStyles: { opacity: 0, transform: 'scale(0.95)' },
  finalStyles: { opacity: 1, transform: 'scale(1.0)' },
  transition: {
    property: ['transform', 'opacity'],
    duration: [400, 400],
    // A custom bezier curve for a smooth, slightly exaggerated deceleration
    timingFunction: ['cubic-bezier(0.25, 0.46, 0.45, 0.94)', 'ease-in-out'],
  },
};

export const ANIMATION_FADE_SUBTLE: AnimationOptions = {
  initialStyles: { opacity: 0, transform: 'scale(1.0)' },
  finalStyles: { opacity: 1, transform: 'scale(1.0)' },
  transition: {
    property: ['opacity'],
    duration: [150],
    timingFunction: ['linear'],
  },
};

export const ANIMATION_CONTEXT_MENU_FAST: AnimationOptions = {
  initialStyles: { opacity: 0, transform: 'translateY(-10px)' },
  finalStyles: { opacity: 1, transform: 'translateY(0)' },
  transition: {
    property: ['transform', 'opacity'],
    duration: [200, 200],
    timingFunction: ['ease-out', 'ease-out'],
  },
};

export const ANIMATION_SLIDE_IN: AnimationOptions = {
  initialStyles: { opacity: 0, transform: 'translate(0px, 20px)' },
  finalStyles: { opacity: 1, transform: 'translate(0, 0)' },
  transition: {
    property: ['transform', 'opacity'],
    duration: [200, 200],
    timingFunction: ['ease-out', 'ease-out'],
  },
};

export const ANIMATION_SIDEBAR: AnimationOptions = {
  initialStyles: {
    transform: 'translateX(-100%)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    opacity: 0,
  },
  finalStyles: {
    transform: 'translateX(0)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    opacity: 1,
  },
  transition: {
    property: ['transform', 'background-color', 'opacity'],
    duration: [360, 300, 250],
    timingFunction: [
      'cubic-bezier(0.16, 1, 0.3, 1)',
      'cubic-bezier(0.25, 1, 0.5, 1)',
      'ease-out',
    ],
  },
};
