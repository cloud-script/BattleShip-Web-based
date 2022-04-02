import { BadRequestException } from '@nestjs/common';
import type { Client } from 'src/dto/game.dto';

export default class SocketsHandler {
  private static clients_collection: Client[] = [];

  private static existsClient(id: String): Boolean {
    return (
      this.clients_collection.find((client) => client.id === id) !== undefined
    );
  }

  public static addClient(client: Client) {
    if (!this.existsClient(client.id)) {
      this.clients_collection.push(client);
    } else throw new BadRequestException();
  }

  public static removeClient(id: String) {
    this.clients_collection.some((client, index) => {
      if (client.id === id) {
        this.clients_collection.splice(index, 1);
        return;
      }
    });
  }

  public static emitTo(id: String, event: String, data: any) {
    const client = this.clients_collection.find((client) => client.id === id);
    if (client) {
      client.socket.emit(event.toString(), data);
    }
  }
}
