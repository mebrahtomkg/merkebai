import { useLogout } from '@/hooks';
import {
  BottomMenuStyled,
  IconContainer,
  MenuItemButton,
  MenuItemLabel,
  NewChatButton,
} from './styles';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ANIMATION_DIALOG_FAST, WithAnimation } from '@/Animation';
import { toggleTheme, useAppStateStore, useThemeStore } from '@/store';
import {
  AddIcon,
  LogoutIcon,
  MenuIcon,
  MoonIcon,
  ProfileIcon,
  SettingsIcon,
  SunIcon,
} from '@/components/icons';
import PopupMenu, { PopupMenuItemProps } from '../PopupMenu';
import { useNavigate } from 'react-router';

type Action = 'openProfile' | 'openSettings' | 'openContacts';

const BottomMenu = () => {
  const action = useRef<Action | null>(null);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const openMenu = useCallback(() => setIsMenuVisible(true), []);
  const closeMenu = useCallback(() => setIsMenuVisible(false), []);

  const openSettingsModal = useAppStateStore((s) => s.openSettingsModal);
  const openProfileModal = useAppStateStore((s) => s.openProfileModal);
  const theme = useThemeStore();

  const logout = useLogout();

  const openProfile = useCallback(() => {
    action.current = 'openProfile';
    closeMenu();
  }, [closeMenu]);

  const openSettings = useCallback(() => {
    action.current = 'openSettings';
    closeMenu();
  }, [closeMenu]);

  const runAction = useCallback(() => {
    const actionValue = action.current;
    action.current = null;
    switch (actionValue) {
      case 'openProfile':
        openProfileModal();
        break;

      case 'openSettings':
        openSettingsModal();
        break;
    }
  }, [openProfileModal, openSettingsModal]);

  const menuItems: PopupMenuItemProps[] = useMemo(
    () => [
      { onClick: openProfile, icon: <ProfileIcon />, label: 'My Profile' },
      { onClick: openSettings, icon: <SettingsIcon />, label: 'Settings' },
      { onClick: logout, icon: <LogoutIcon />, label: 'Log out' },
    ],
    [openProfile, openSettings, logout],
  );

  const navigate = useNavigate();

  const openNewChat = () => {
    navigate(`/chat`);
  };

  return (
    <>
      <BottomMenuStyled>
        <MenuItemButton type="button" onClick={openMenu}>
          <IconContainer>
            <MenuIcon />
          </IconContainer>
        </MenuItemButton>

        <NewChatButton type="button" onClick={openNewChat}>
          <IconContainer>
            <AddIcon />
          </IconContainer>
          <MenuItemLabel>New Chat</MenuItemLabel>
        </NewChatButton>

        <MenuItemButton type="button" onClick={toggleTheme}>
          <IconContainer>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </IconContainer>
        </MenuItemButton>
      </BottomMenuStyled>

      <WithAnimation
        isVisible={isMenuVisible}
        options={ANIMATION_DIALOG_FAST}
        render={(style) => (
          <PopupMenu
            menuItems={menuItems}
            onClose={closeMenu}
            animationStyle={style}
          />
        )}
        onUnmount={runAction}
      />
    </>
  );
};

export default BottomMenu;
