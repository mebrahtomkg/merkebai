import Home from '@/features/Home';
import {
  AccountUpdateProcessor,
  AttachmentUploadProcessor,
  HeartbeatProcessor,
  MessageRequestsProcessor,
} from '@/processors';
import { Route, Routes } from 'react-router';
import Chat from '@/features/Chat';
import {
  ANIMATION_SIDEBAR,
  ANIMATION_SLIDE_IN,
  WithAnimation,
} from '@/Animation';
import { useAppStateStore } from '@/store';
import Settings from '@/features/Settings';
import Profile from '@/features/Settings/Profile';
import useSidebarVisibility from './useSidebarVisibility';

const AuthenticatedApp = () => {
  const isSettingsModalVisible = useAppStateStore(
    (state) => state.isSettingsModalVisible,
  );

  const isProfileModalVisible = useAppStateStore(
    (state) => state.isProfileModalVisible,
  );

  const { isSidebarVisible } = useSidebarVisibility();

  const mainComponent = (
    <>
      <WithAnimation
        isVisible={isSidebarVisible}
        options={ANIMATION_SIDEBAR}
        render={(style) => <Home animationStyle={style} />}
      />

      <Chat />
    </>
  );

  return (
    <>
      <HeartbeatProcessor />
      <AccountUpdateProcessor />
      <MessageRequestsProcessor />
      <AttachmentUploadProcessor />

      <Routes>
        <Route path="/" element={mainComponent} />
        <Route path="/:chatId" element={mainComponent} />
      </Routes>

      <WithAnimation
        isVisible={isSettingsModalVisible}
        options={ANIMATION_SLIDE_IN}
        render={(style) => <Settings animationStyle={style} />}
      />

      <WithAnimation
        isVisible={isProfileModalVisible}
        options={ANIMATION_SLIDE_IN}
        render={(style) => <Profile animationStyle={style} />}
      />
    </>
  );
};

export default AuthenticatedApp;
