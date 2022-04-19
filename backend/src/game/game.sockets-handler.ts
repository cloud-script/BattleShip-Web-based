// Types
import type { Socket } from 'socket.io';
import type { Player } from 'src/dto/game.dto';
// Errors
import { BadRequestException } from '@nestjs/common';
import { Events } from 'src/enumerators/events.enums';

export default class SocketsHandler {
  private static sockets = new Map<
    String,
    { socket: Socket; player: Player }
  >();

  private static existsSocket(socket_id: String): Boolean {
    return this.sockets.has(socket_id);
  }

  public static addSocket(socket: Socket) {
    if (!this.existsSocket(socket.id)) {
      this.sockets.set(socket.id, { socket: socket, player: null });
    } else throw new BadRequestException();
  }

  public static removeClient(socket_id: String) {
    if (!this.sockets.delete(socket_id)) throw new BadRequestException();
  }

  public static registerPlayer(socket_id: String, player: Player) {
    if (this.existsSocket(socket_id)) {
      const client_with_player = this.sockets.get(socket_id);
      client_with_player.player = player;
      this.sockets.set(socket_id, client_with_player);
    } else throw new BadRequestException();
  }

  public static emitTo(player_id: String, event: Events, data: any) {
    const socket_id = this.getSocketIdByPID(player_id);
    if (this.existsSocket(socket_id)) {
      this.sockets.get(socket_id).socket.emit(event, data);
    } else throw new BadRequestException();
  }

  public static getSocketIdByPID(player_id: String): String {
    let result = '';
    this.sockets.forEach((client) => {
      if (client.player && client.player.token === player_id) {
        result = client.socket.id;
      }
    });
    return result;
  }
}
