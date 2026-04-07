import { Chat, User } from '@/models';

const getUserStatusObservers = async (userId: number): Promise<number[]> => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Chat,
        as: 'chats',
      },
    ],
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.lastSeenVisibility === 'nobody') {
    return [];
  }

  const {
    contacts = [],
    blockedUsers = [],
    chatsWithUser1 = [],
    chatsWithUser2 = [],
  } = user;

  const observers: Set<number> = new Set();

  contacts.forEach((contact) => {
    observers.add(contact.addedId);
  });

  if (user.lastSeenVisibility === 'everybody') {
    chatsWithUser1.forEach((chat) => {
      observers.add(chat.userId);
    });

    chatsWithUser2.forEach((chat) => {
      observers.add(chat.userId);
    });
  }

  for (const blockedUser of blockedUsers) {
    observers.delete(blockedUser.blockedId);
  }

  return Array.from(observers);
};

export default getUserStatusObservers;
