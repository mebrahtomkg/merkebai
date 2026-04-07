import { AnimationOptions } from '@/Animation';
import { VisibilityOption } from '@/types';

export const VISIBILITY_OPTION_LABELS: Record<VisibilityOption, string> = {
  everybody: 'Yes',
  contacts: 'Never',
  nobody: 'Only temproray',
};

export const ANIMATION_EDITOR_MODAL: AnimationOptions = {
  initialStyles: { opacity: 0, transform: 'translateX(15px)' },
  finalStyles: { opacity: 1, transform: 'translateX(0)' },
  transition: {
    property: ['transform', 'opacity'],
    duration: [150, 150],
    timingFunction: ['ease-out', 'ease-out'],
  },
};
