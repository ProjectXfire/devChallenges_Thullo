import io from "socket.io-client";
import { Socket } from "socket.io-client";
// Models
import { TTasksListResponse } from "@models/tasksList";
// API
import { baseURL } from "@services/interceptors/apiThullo";
let socket: Socket;

// Init socket
export const initiateSocket = (boardId: string) => {
  socket = io(baseURL, { transports: ["websocket"] });
  socket.emit("board", boardId);
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb: any) => {
  if (!socket) return true;
  socket.on("listsByBoard", (response: TTasksListResponse) => {
    return cb(null, response.result);
  });
};

export const sendMessage = (boardId: string) => {
  if (socket) socket.emit("listsByBoard", boardId);
};
