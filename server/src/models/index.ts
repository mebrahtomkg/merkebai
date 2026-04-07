import User from './User';
import Message from './Message';
import Attachment from './Attachment';
import Chat from './Chat';

export { User, Message, Attachment, Chat };

// To get a message with its attachment
Message.belongsTo(Attachment, {
  foreignKey: 'attachmentId',
  as: 'attachment',
});

User.hasMany(Chat, { foreignKey: 'userId', as: 'chats' });
Chat.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Chat.belongsTo(Message, {
  foreignKey: 'lastMessageId',
  as: 'lastMessage',
  onDelete: 'SET NULL',
});

Message.belongsTo(Chat, {
  foreignKey: 'chatId',
  as: 'chat',
});

Message.addScope('withChat', {
  include: {
    model: Chat,
    as: 'chat',
    required: true,
  },
});

// To fetch a message with its attachment
Message.addScope('withAttachment', {
  include: {
    model: Attachment,
    as: 'attachment',
    required: false,
  },
});
