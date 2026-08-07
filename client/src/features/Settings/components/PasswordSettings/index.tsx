import { WithAnimation } from '@/Animation';
import { useState } from 'react';
import { ANIMATION_EDITOR_MODAL } from '../../constants';
import SettingsItem from '../SettingsItem';
import PasswordEditor from './PasswordEditor';
import ActionButton from '../ActionButton';
import { useHardwareBack } from '@/hooks';

const PasswordSettings = () => {
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const openEditor = () => setIsEditorVisible(true);
  const closeEditor = () => setIsEditorVisible(false);
  useHardwareBack(isEditorVisible, closeEditor);

  return (
    <>
      <SettingsItem
        label="Password"
        value=""
        actionButton={
          <ActionButton text="Change Password" onClick={openEditor} />
        }
      />

      <WithAnimation
        isVisible={isEditorVisible}
        options={ANIMATION_EDITOR_MODAL}
        render={(style) => (
          <PasswordEditor onClose={closeEditor} animationStyle={style} />
        )}
      />
    </>
  );
};

export default PasswordSettings;
