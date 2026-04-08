import {
  ANIMATION_CONTEXT_MENU_FAST,
  ANIMATION_DIALOG_FAST,
  WithAnimation,
} from '@/Animation';
import { MoreButton } from '@/components/buttons';
import { DeleteIcon } from '@/components/icons';
import ContextMenu, {
  IMenuItem,
  MenuItem,
  useContextMenu,
} from '@/components/ContextMenu';
import { addChatDeleteRequest } from '@/store/useMessageRequestsStore';
import { FC, useCallback, useMemo, useState } from 'react';
import ConfirmDialog from '@/components/ConfirmDialog';
import CheckBox from '@/components/Checkbox';
import { Chat } from '@/types';

type ActiveConfirmDialog = 'delete-chat' | 'block-user' | 'none';

interface ChatContextMenuProps {
  chat: Chat;
}

const ChatContextMenu: FC<ChatContextMenuProps> = ({ chat }) => {
  const {
    isContextMenuVisible,
    handleMoreButtonClick,
    contextMenuPosition,
    closeContextMenu,
  } = useContextMenu();

  const [activeConfirmDialog, setActiveConfirmDialog] =
    useState<ActiveConfirmDialog>('none');

  const closeConfirmDialog = useCallback(
    () => setActiveConfirmDialog('none'),
    [],
  );

  const [isDeleteForReceiver, setIsDeleteForReceiver] = useState(false);

  const toggleIsDeleteForReceiver = useCallback(
    () => setIsDeleteForReceiver((prevValue) => !prevValue),
    [],
  );

  const deleteChat = useCallback(
    () =>
      addChatDeleteRequest({
        chatId: chat.id,
        deleteForReceiver: isDeleteForReceiver,
      }),
    [chat.id, isDeleteForReceiver],
  );

  const startDeleteChatFlow = useCallback(() => {
    setIsDeleteForReceiver(false);
    setActiveConfirmDialog('delete-chat');
  }, []);

  const menuItemsList = useMemo(() => {
    const menuItems: IMenuItem[] = [
      <MenuItem
        key={'delete-chat'}
        icon={<DeleteIcon />}
        label="Delete Chat"
        action={startDeleteChatFlow}
        onClose={closeContextMenu}
      />,
    ];

    return menuItems;
  }, [startDeleteChatFlow, closeContextMenu]);

  return (
    <>
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
        isVisible={activeConfirmDialog === 'delete-chat'}
        options={ANIMATION_DIALOG_FAST}
        render={(style) => (
          <ConfirmDialog
            title="Delete Chat"
            message="Are you sure to delete all messages in this chat?"
            onConfirm={deleteChat}
            onClose={closeConfirmDialog}
            animationStyle={style}
          >
            <CheckBox
              isChecked={isDeleteForReceiver}
              onToggle={toggleIsDeleteForReceiver}
              label="Also delete for receiver"
            />
          </ConfirmDialog>
        )}
      />
    </>
  );
};

export default ChatContextMenu;
