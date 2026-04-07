interface UserConnectPayload {
  userId: number; // User id who is disconnected
}

const handleUserConnect = ({ userId }: UserConnectPayload) => {};

export default handleUserConnect;
