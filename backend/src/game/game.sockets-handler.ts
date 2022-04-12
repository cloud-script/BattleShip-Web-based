import { BadRequestException } from '@nestjs/common';
import type { Socket } from 'socket.io';

export default class SocketsHandler {
  private static sockets_collection: Socket[] = [];

  private static existsSocket(player_id: String): Boolean {
    return (
      this.sockets_collection.find(
        (client) => client.player_id === player_id,
      ) !== undefined
    );
  }

  public static addSocket(socket: Socket) {
    if (!this.existsSocket(socket.id)) {
      this.sockets_collection.push(socket);
    } else throw new BadRequestException();
  }

  public static removeClient(socket_id: String) {
    this.sockets_collection.some((client, index) => {
      if (client.id === socket_id) {
        this.sockets_collection.splice(index, 1);
        return;
      }
    });
  }

  public static emitTo(socket: Socket, event: String, data: any) {
    if (this.sockets_collection.find((client) => client.id === player_id)) {
      socket.emit(event.toString(), data);
    } else throw new BadRequestException();
  }

  public static getSocketByCode = (code: String): Socket =>
    this.sockets_collection.find((client) => client.player_id === code).socket;

  public static getSocketByPID = (player_id: String): Socket =>
    this.sockets_collection.find((client) => client.player_id === player_id)
      .socket;
}
