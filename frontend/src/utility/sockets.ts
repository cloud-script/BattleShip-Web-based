// Socket.io-client classes
import { io, Socket } from "socket.io-client";
// Types
import type { Player } from "../dto/game.dto";

export default class SocketsHandler {
  private socket: Socket;
  private is_ready: Boolean;
  private is_host: Boolean;
  private selfe: Player;
  private connected_player: Player;

  constructor(namespace: String, selfe: Player, is_host = false) {
    this.selfe = selfe;
    this.is_host = is_host;
    this.setupSocket(namespace);
  }

  public async findOpponent(code: String = ""): Promise<Player> {
    if (this.is_ready) {
      if (!this.is_host) {
        this.connecToOpponent(code);
      }
      return new Promise((resolve) => {
        if (this.connected_player) {
          resolve(this.connected_player);
        }
      });
    } else throw new Error();
  }

  public connecToOpponent(code: String): Player {
    if (this.is_ready) {
      this.socket.emit("connect_with", { player: this.selfe, code: code });
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
    this.socket.on("connect_with", (player: Player) => {
      if (player.name !== null && player.token !== null) {
        this.connected_player = player;
      } else throw new Error("Opponent is not able to connect");
    });
    this.is_ready = true;
  }
}
