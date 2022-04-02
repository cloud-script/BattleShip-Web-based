import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import SocketsHandler from './sockets-handler';

// Types
import type { Action } from 'src/dto/game.dto';
import { Events } from 'src/dto/game.dto';
import { Socket } from 'net';

@WebSocketGateway({ namespace: 'game' })
export class GameGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @SubscribeMessage('events')
  handleEvent(@MessageBody() action: Action) {
    SocketsHandler.emitTo(action.destination_id, Events.HIT, {
      x: action.x,
      y: action.y,
    });
  }

  handleConnection(socket: any | Socket) {
    SocketsHandler.addClient({ id: socket.id, socket: socket });
  }

  handleDisconnect(client: any) {
    SocketsHandler.removeClient(client.id);
  }

  afterInit() {
    console.log('# Socket gateaway "game" started on http port');
  }
}
