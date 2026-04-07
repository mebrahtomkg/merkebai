import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';
import User from './User';
import Message from './Message';

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare title: string | null;
  declare lastMessageId: number | null;

  declare user?: User;
  declare lastMessage?: Message;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    lastMessageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'chats',
    timestamps: false,
    sequelize,
  },
);

export default Chat;
