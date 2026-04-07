import { IPrivacySetting } from '../../types';

export const PRIVACY_SETTINGS: IPrivacySetting[] = [
  {
    settingkey: 'emailVisibility',
    title: 'Should we use your chats to train AI model?',
    visibilityOptions: ['everybody', 'contacts', 'nobody'],
  },
];
