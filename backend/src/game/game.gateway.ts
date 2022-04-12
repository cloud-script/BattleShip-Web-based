// NestJS libraries
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
// Handlers
import SocketsHandler from './game.sockets-handler';
import InvitesHandler from 'src/invite/invite.invites-handler';
// Types
import type { Action, Player } from 'src/dto/game.dto';
import type { Events } from 'src/dto/game.dto';
import type { Socket } from 'socket.io';
import { BadRequestException } from '@nestjs/common';
// Current cors --> localhost:8080

@WebSocketGateway({
  namespace: 'game',
  cors: { origin: 'http://localhost:8080' },
})
export class GameGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @SubscribeMessage('events')
  handleEvent(@MessageBody() action: Action) {
    /*  SocketsHandler.emitTo(action.destination_id, Events.HIT, {
      x: action.x,
      y: action.y,
    });*/
  }

  @SubscribeMessage('connect_with')
  handle_player_connect(
    socket: Socket,
    request: { player: Player; dest_player_id: String },
  ) {
    if (request.dest_player_id) {
      SocketsHandler.emitTo(
        SocketsHandler.getSocketByPID(request.dest_player_id),
        'connect_with',
        { player: request.player, socket_id: socket.id },
      );
    } else throw new BadRequestException();
  }

  handleConnection(socket: Socket) {
    SocketsHandler.addSocket(socket);
  }

  handleDisconnect(socket: Socket) {
    SocketsHandler.removeClient(socket.id);
  }

  afterInit() {
    console.log('# Socket gateaway "game" started on http port');
  }
}
