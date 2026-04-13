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
import { v7 as uuidv7 } from 'uuid';

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare secretId: CreationOptional<number>;
  declare id: CreationOptional<string>;
  declare userId: number;
  declare title: string | null;
  declare lastMessageId: number | null;

  declare user?: User;
  declare lastMessage?: Message;
}

Chat.init(
  {
    secretId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      defaultValue: () => uuidv7(),
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
