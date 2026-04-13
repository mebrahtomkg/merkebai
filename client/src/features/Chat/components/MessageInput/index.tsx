import { FC, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import useFilesSelector from '../../hooks/useFilesSelector';
import FileSelector from '../FileSelector';
import SendButton from '../SendButton';
import {
  ActionButtonsContainer,
  GrowingTextArea,
  MessageInputContainer,
  MessageInputStyled,
} from './styles';
import AttachFileButton from '../AttachFileButton';
import useMessageInputStateStore, {
  resetMessageInputState,
} from '@/store/useMessageInputStateStore';
import useMessageTextArea from './useMessageTextArea';
import {
  addMessageUpdateRequest,
  addTextMessageSendRequest,
} from '@/store/useMessageRequestsStore';

interface MessageInputProps {
  chatId?: string;
}

const MessageInput: FC<MessageInputProps> = ({ chatId }) => {
  const { textAreaRef, value, setValue, handleInput, focusTextArea } =
    useMessageTextArea();

  const messageInputState = useMessageInputStateStore();

  useEffect(() => {
    if (messageInputState.mode === 'edit') {
      const { message } = messageInputState;
      if (!message.content) throw new Error('Message has not content to edit!');
      setValue(message.content);
    } else {
      setValue('');
    }
    focusTextArea();
  }, [messageInputState, setValue, focusTextArea]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <reset message input state>
  useEffect(() => {
    resetMessageInputState();
  }, [chatId]);

  const handleSend = useCallback(() => {
    const trimmedValue = value.trim();
    const savedInputState = messageInputState;
    resetMessageInputState(); // reset before sending
    if (savedInputState.mode === 'edit') {
      const { message } = savedInputState;
      addMessageUpdateRequest({
        messageId: message.id,
        newContent: trimmedValue,
      });
    } else {
      addTextMessageSendRequest({
        content: trimmedValue,
        chatId,
      });
    }
  }, [value, messageInputState, chatId]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const [isFileSelectorVisible, setIsFileSelectorVisible] = useState(false);
  const openFileSelector = () => setIsFileSelectorVisible(true);
  const closeFileSelector = () => setIsFileSelectorVisible(false);

  const {
    fileInputRef,
    handleFileChange,
    triggerFileSelection,
    selectedFiles,
  } = useFilesSelector(openFileSelector);

  const handleMessageInputClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        focusTextArea();
      }
    },
    [focusTextArea],
  );

  return (
    <MessageInputContainer>
      <MessageInputStyled onClick={handleMessageInputClick}>
        <GrowingTextArea
          rows={1}
          placeholder="Message"
          onKeyDown={handleKeyDown}
          value={value}
          onInput={handleInput}
          ref={textAreaRef}
        />

        <ActionButtonsContainer>
          <AttachFileButton onClick={triggerFileSelection} />
          <SendButton isDisabled={!value?.trim()} onClick={handleSend} />
        </ActionButtonsContainer>

        <input
          type="file"
          multiple
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {isFileSelectorVisible && (
          <FileSelector
            files={selectedFiles}
            chatId={chatId}
            onClose={closeFileSelector}
          />
        )}
      </MessageInputStyled>
    </MessageInputContainer>
  );
};

export default MessageInput;
