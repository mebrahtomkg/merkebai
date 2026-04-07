interface UserDisconnectPayload {
  userId: number; // User id who is disconnected
  lastSeenTime?: number;
}

const handleUserDisconnect = ({
  userId,
  lastSeenTime,
}: UserDisconnectPayload) => {};

export default handleUserDisconnect;
