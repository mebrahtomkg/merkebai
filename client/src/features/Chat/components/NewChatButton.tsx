import styled from 'styled-components';
import { AddIcon, MenuIcon } from '@/components/icons';
import { useNavigate } from 'react-router';

const NewChatButtonStyled = styled.button`
  display: flex;
  padding: 0.55rem;
  background-color: var(--bg-hover);
  border: 1px solid;
  border-radius: 8px;
  border-color: var(--bg-hover-hover);
`;

const IconContainer = styled.div`
  width: 1.2rem;
  height: 1.2rem;
`;

const MenuItemLabel = styled.p`
  flex-grow: 1;
  margin-left: 0.7rem;
  overflow: hidden;
  text-align: left;
  font-size: 1rem;
  color: inherit;
`;

const NewChatButton = () => {
  const navigate = useNavigate();

  const openNewChat = () => {
    navigate(`/`);
  };

  return (
    <NewChatButtonStyled
      type="button"
      aria-label="open-sidebar"
      onClick={openNewChat}
    >
      <IconContainer>
        <AddIcon />
      </IconContainer>

      <MenuItemLabel>New Chat</MenuItemLabel>
    </NewChatButtonStyled>
  );
};

export default NewChatButton;
