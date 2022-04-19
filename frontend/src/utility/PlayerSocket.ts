// Socket.io-client classes
import { io, Socket } from "socket.io-client";
// Event Emitter
import { eventEmitter } from "./EventEmitter";
// DTO's & Enums
import type { ActionCallBack, Player } from "../dto/game.dto";
import { ActionStatus, Events } from "../enumerators/events.enums";
import type { Ship } from "../enumerators/game.enums";

export default class PlayerSocket {
  public events: any;
  private socket: Socket;
  private is_ready: Boolean;
  private is_host: Boolean;
  private selfe: Player;
  private opponent: Player;
  private current_callback: ActionCallBack;
  private current_block_pos: number;
  private isFirst: Boolean;

  constructor(namespace: String, selfe: Player, is_host: Boolean) {
    this.selfe = selfe;
    this.is_host = is_host;
    this.isFirst = null;
    localStorage.clear();
    this.events = eventEmitter();
    this.setupSocket(namespace);
  }

  public findOpponent(code: String): Promise<Player> {
    if (this.is_ready) {
      return new Promise(async (resolve) => {
        if (!this.is_host) {
          this.connectWith(code);
        }
        while (!this.opponent) {
          await new Promise((r) => setTimeout(r, 1000));
        }
        resolve(this.opponent);
      });
    } else throw new Error();
  }

  public amIFirst(): Promise<Boolean> {
    if (this.is_host) {
      this.socket.emit(Events.AmIFirst, { host_id: this.selfe.token, client_id: this.opponent.token });
    }
    return new Promise(async (resolve) => {
      while (this.isFirst === null) {
        await new Promise((r) => setTimeout(r, 100));
      }
      resolve(this.isFirst);
    });
  }

  public emitAction(rawPosition: number): Promise<ActionCallBack> {
    this.socket.emit(Events.Action, { raw_pos: rawPosition, destination_id: this.opponent.token });
    return new Promise(async (resolve) => {
      while (!this.current_callback) {
        await new Promise((r) => setTimeout(r, 100));
      }
      const callback = this.current_callback;
      this.current_callback = null;
      resolve(callback);
    });
  }

  public opponentName(): String {
    return this.opponent.name || "not found";
  }

  public emitStatus(actionStatus: ActionStatus, sink: { ship_name: Ship } | false = false) {
    this.socket.emit(Events.ActionStatus, { action_status: actionStatus, destination_id: this.opponent.token, sink: sink });
  }

  private connectWith(connect_id: String) {
    if (this.is_ready) {
      this.socket.emit(Events.Connect, { player: this.selfe, connect_id: connect_id });
    }
  }

  private register() {
    this.socket.emit(Events.Register, this.selfe);
  }

  private setupSocket(namespace: String) {
    try {
      this.socket = io(`http://192.168.1.170:13124/${namespace}`);
      this.register();
      this.privateListeners();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  private privateListeners() {
    this.socket.on(Events.Accept, (player: Player) => {
      if (player.name !== null && player.token !== null) {
        this.connectWith(player.token);
        this.opponent = player;
      } else throw new Error("Opponent is not able to connect");
    });
    this.socket.on(Events.Action, (block_id: number) => this.events.emit("ping", block_id));
    this.socket.on(Events.ActionStatus, (callback: ActionCallBack) => (this.current_callback = callback));
    this.socket.on(Events.AmIFirst, (result: Boolean) => (this.isFirst = result));
    this.socket.on(Events.Disconnect, () => alert("Opponent disconnected!"));
    this.is_ready = true;
  }
}
