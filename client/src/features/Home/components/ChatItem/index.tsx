import { FC, useCallback, useMemo, useState } from 'react';
import {
  ChatItemDateTime,
  ChatItemInfoContainer,
  ChatItemStyled,
  ClockIconContainer,
  MessagePreviewContainer,
  MessageStatusContainer,
  Title,
  TitleContainer,
  TickIconContainer,
  UnseenMessagesCount,
} from './styles';
import { Chat } from '@/types';
import MessagePreview from './MessagePreview';
import {
  ClockIcon,
  DeleteIcon,
  DoubleTickIcon,
  TickIcon,
} from '@/components/icons';
import { useHardwareBack } from '@/hooks';
import ContextMenu, {
  IMenuItem,
  MenuItem,
  useContextMenu,
} from '@/components/ContextMenu';
import {
  ANIMATION_CONTEXT_MENU_FAST,
  ANIMATION_DIALOG_FAST,
  WithAnimation,
} from '@/Animation';
import ConfirmDialog from '@/components/ConfirmDialog';
import MoreButton from './MoreButton';
import useChatItem from './useChatItem';

interface ChatItemProps {
  chat: Chat;
  index: number;
}

const ChatItem: FC<ChatItemProps> = ({ chat }) => {
  const {
    title,
    dateTime,
    lastMessage,
    unseenMessagesCount,
    isLastMessageOutgoing,
    isCurrentlyOpenedChat,
    lastMessageStatus,
    deleteChat,
    handleClick,
  } = useChatItem(chat);

  const {
    isContextMenuVisible,
    handleMoreButtonClick,
    contextMenuPosition,
    closeContextMenu,
  } = useContextMenu();

  const [isCfmDialogVisible, setIsCfmDialogVisible] = useState(false);
  const openCfmDialog = useCallback(() => setIsCfmDialogVisible(true), []);
  const closeCfmDialog = useCallback(() => setIsCfmDialogVisible(false), []);
  useHardwareBack(isCfmDialogVisible, closeCfmDialog);

  const menuItemsList = useMemo(() => {
    const menuItems: IMenuItem[] = [
      <MenuItem
        key={'delete-chat'}
        icon={<DeleteIcon />}
        label="Delete Chat"
        action={openCfmDialog}
        onClose={closeContextMenu}
      />,
    ];

    return menuItems;
  }, [openCfmDialog, closeContextMenu]);

  return (
    <ChatItemStyled
      onClick={handleClick}
      $isCurrentlyOpenedChat={isCurrentlyOpenedChat}
    >
      <ChatItemInfoContainer>
        <TitleContainer>
          <Title>{title || 'New Chat'}</Title>
          {dateTime && <ChatItemDateTime>{dateTime}</ChatItemDateTime>}
        </TitleContainer>

        <MessagePreviewContainer>
          {lastMessage && <MessagePreview message={lastMessage} />}

          {unseenMessagesCount > 0 && (
            <UnseenMessagesCount>{unseenMessagesCount}</UnseenMessagesCount>
          )}

          {lastMessage && isLastMessageOutgoing && (
            <MessageStatusContainer>
              {lastMessageStatus === 'sending' ||
              lastMessageStatus === 'updating' ? (
                <ClockIconContainer>
                  <ClockIcon />
                </ClockIconContainer>
              ) : (
                <TickIconContainer>
                  {lastMessage.isSeen ? <DoubleTickIcon /> : <TickIcon />}
                </TickIconContainer>
              )}
            </MessageStatusContainer>
          )}
        </MessagePreviewContainer>
      </ChatItemInfoContainer>

      <MoreButton onClick={handleMoreButtonClick} />

      <WithAnimation
        isVisible={isContextMenuVisible}
        options={ANIMATION_CONTEXT_MENU_FAST}
        render={(style) => (
          <ContextMenu
            menuItems={menuItemsList}
            position={contextMenuPosition}
            onClose={closeContextMenu}
            animationStyle={style}
          />
        )}
      />

      <WithAnimation
        isVisible={isCfmDialogVisible}
        options={ANIMATION_DIALOG_FAST}
        render={(style) => (
          <ConfirmDialog
            title="Delete Chat"
            message="Are you sure to delete all messages in this chat?"
            onConfirm={deleteChat}
            onClose={closeCfmDialog}
            animationStyle={style}
          />
        )}
      />
    </ChatItemStyled>
  );
};

export default ChatItem;
