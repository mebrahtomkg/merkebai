import { BackButton } from '@/components/buttons';
import { useAccountInfo } from '@/hooks';
import { useState, type CSSProperties, type FC } from 'react';
import {
  NavMenuContainer,
  SettingsCategoryContainer,
  SettingsModal,
  TabbedMenu,
} from './styles';
import { useAppStateStore } from '@/store';
import NameSettings from './components/NameSettings';
import SettingsItem from './components/SettingsItem';
import TabButton from './components/TabButton';

type ProfileCategory = 'account' | 'profilePhoto';

interface ProfileProps {
  animationStyle?: CSSProperties;
}

const Profile: FC<ProfileProps> = ({ animationStyle }) => {
  const { email } = useAccountInfo();

  const closeProfileModal = useAppStateStore(
    (state) => state.closeProfileModal,
  );

  const [category, setCategory] = useState<ProfileCategory>('account');

  return (
    <SettingsModal style={animationStyle}>
      <NavMenuContainer>
        <BackButton onClick={closeProfileModal} />

        <TabbedMenu>
          <TabButton
            text="Account"
            isActive={category === 'account'}
            onClick={() => setCategory('account')}
          />
        </TabbedMenu>
      </NavMenuContainer>
      {category === 'account' && (
        <SettingsCategoryContainer>
          <NameSettings />
          <SettingsItem value={email} label="Email" />
        </SettingsCategoryContainer>
      )}
    </SettingsModal>
  );
};

export default Profile;
