import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';
import type Attachment from './Attachment';
import type Chat from './Chat';

class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id: CreationOptional<number>;
  declare chatId: string;
  declare isAiMessage: boolean;
  declare isCompleted: boolean;
  declare content: string | null;
  declare attachmentId: number | null;
  declare isSeen: CreationOptional<boolean>;
  declare createdAt: CreationOptional<number>;

  declare chat?: Chat;
  declare attachment?: Attachment;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    chatId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    isAiMessage: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    attachmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    isSeen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
      get() {
        const value = this.getDataValue('createdAt');
        return value === null ? null : Number.parseInt(`${value}`, 10);
      },
    },
  },
  {
    tableName: 'messages',
    timestamps: false,
    sequelize,
  },
);

export default Message;
