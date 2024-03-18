export type Room = {
  message: string;
  sessionId: string;
  auth: string;
};

export type CreateRoomResponse = {
  status: number;
  data: Room;
};
