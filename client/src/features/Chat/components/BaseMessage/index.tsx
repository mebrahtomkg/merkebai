import { BackIcon, DeleteIcon, DownloadIcon } from '@/components/icons';
import { FC, RefObject, useMemo, useRef } from 'react';
import {
  AudioMessage,
  FileMessage,
  PhotoMessage,
  TextMessage,
  VideoMessage,
} from '..';
import {
  MessageContainer,
  MessageIntersectionObserverTarget,
  MessageStyled,
} from './styles';
import { Message } from '@/types';
import { useMessageActions, useMessageInfo } from '../../hooks';
import useMarkMessageAsRead from './useMarkMessageAsRead';
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
import useDeleteMessage from './useDeleteMessage';

interface BaseMessageProps {
  message: Message;
  isLastInGroup: boolean;
  intersectionObserverRootRef: RefObject<HTMLDivElement | null>;
}

const BaseMessage: FC<BaseMessageProps> = ({
  message,
  isLastInGroup,
  intersectionObserverRootRef,
}) => {
  const messageInfo = useMessageInfo(message);
  const { type, isOutgoing } = messageInfo;
  const { downloadFile } = useMessageActions(message);

  const {
    openDeleteConfirm,
    isDeleteConfirmVisible,
    handleMessageDelete,
    closeDeleteConfirm,
  } = useDeleteMessage(message);

  const {
    isContextMenuVisible,
    handleContextMenu,
    handleMoreButtonClick,
    contextMenuPosition,
    closeContextMenu,
  } = useContextMenu();

  const menuItems = useMemo(() => {
    const items: IMenuItem[] = [
      <MenuItem
        key={'copy'}
        icon={<BackIcon />}
        label="Copy"
        action={() => undefined}
        onClose={closeContextMenu}
      />,
    ];
    if (type !== 'text') {
      items.push(
        <MenuItem
          key={'save'}
          icon={<DownloadIcon />}
          label="Save"
          action={downloadFile}
          onClose={closeContextMenu}
        />,
      );
    }
    items.push(
      <MenuItem
        key={'delete'}
        icon={<DeleteIcon />}
        label="Delete"
        action={openDeleteConfirm}
        onClose={closeContextMenu}
      />,
    );
    return items;
  }, [type, downloadFile, openDeleteConfirm, closeContextMenu]);

  const messageComponent = useMemo(() => {
    switch (type) {
      case 'text':
        return <TextMessage messageInfo={messageInfo} message={message} />;
      case 'photo':
        return <PhotoMessage messageInfo={messageInfo} message={message} />;
      case 'video':
        return <VideoMessage messageInfo={messageInfo} message={message} />;
      case 'audio':
        return (
          <AudioMessage
            messageInfo={messageInfo}
            message={message}
            onMoreButtonClick={handleMoreButtonClick}
          />
        );
      case 'file':
        return (
          <FileMessage
            onMoreButtonClick={handleMoreButtonClick}
            message={message}
          />
        );
    }
  }, [messageInfo, message, handleMoreButtonClick, type]);

  const intersectionObserverTargetRef = useRef<HTMLDivElement>(null);

  useMarkMessageAsRead(
    intersectionObserverTargetRef,
    intersectionObserverRootRef,
    message,
  );

  const handleMessageClick =
    type === 'audio' || type === 'file' || type === 'photo'
      ? undefined
      : undefined;

  const handleMessageContextMenu =
    type === 'audio' || type === 'file' ? undefined : handleContextMenu;

  return (
    <MessageStyled $isOutgoing={isOutgoing} $isLastInGroup={isLastInGroup}>
      <MessageContainer
        $isLastInGroup={isLastInGroup}
        $isOutgoing={isOutgoing}
        $messageType={type}
        onClick={handleMessageClick}
        onContextMenu={handleMessageContextMenu}
      >
        {messageComponent}

        <WithAnimation
          isVisible={isContextMenuVisible}
          options={ANIMATION_CONTEXT_MENU_FAST}
          render={(style) => (
            <ContextMenu
              menuItems={menuItems}
              animationStyle={style}
              position={contextMenuPosition}
              onClose={closeContextMenu}
            />
          )}
        />

        <MessageIntersectionObserverTarget
          ref={intersectionObserverTargetRef}
        />
      </MessageContainer>

      <WithAnimation
        isVisible={isDeleteConfirmVisible}
        options={ANIMATION_DIALOG_FAST}
        render={(style) => (
          <ConfirmDialog
            title="Delete message"
            message="Are you sure you want to delete this message?"
            onConfirm={handleMessageDelete}
            onClose={closeDeleteConfirm}
            animationStyle={style}
          />
        )}
      />
    </MessageStyled>
  );
};

export default BaseMessage;
