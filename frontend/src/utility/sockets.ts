// Socket.io-client classes
import { io, Socket } from "socket.io-client";
// Types
import type { Player } from "../dto/game.dto";

export default class SocketsHandler {
  private socket: Socket;
  private isReady: Boolean;

  constructor(namespace: String) {
    this.setupSocket(namespace);
  }

  public connecToOpponent(code: String): Player {
    if (this.isReady) {
      this.socket.emit("connect_with", code, (player_callback: Player) => {
        return player_callback;
      });
    }
    return null;
  }

  private setupSocket(namespace: String) {
    try {
      this.socket = io(`http://localhost:13124/${namespace}`);
      this.setupListeners();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  private setupListeners() {
    this.socket.on("connected", (player: Player) => {});
    this.isReady = true;
  }
}
