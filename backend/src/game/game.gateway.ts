// NestJS libraries
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
// Handlers
import SocketsHandler from './game.sockets-handler';
// Types
import type { Action, Player } from 'src/dto/game.dto';
import type { Socket } from 'socket.io';
// Enumerators
import { Events } from 'src/Enumerators/events.enums';
// Current cors --> localhost:8080

@WebSocketGateway({
  namespace: 'game',
  cors: { origin: 'http://localhost:8080' },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @SubscribeMessage('events')
  handleEvent(@MessageBody() action: Action) {
    /*  SocketsHandler.emitTo(action.destination_id, Events.HIT, {
      x: action.x,
      y: action.y,
    });*/
  }

  @SubscribeMessage('connect_with')
  handle_player_connect(
    @MessageBody() request: { player: Player; dest_player_id: String },
  ) {
    SocketsHandler.emitTo(request.dest_player_id, Events.Connect, {
      player: request.player,
      socket_id: 'socket.id',
    });
  }

  @SubscribeMessage('register_player')
  register_player(
    @MessageBody() request: { player: Player; socket_id: String },
  ) {
    SocketsHandler.registerPlayer(request.socket_id, request.player);
  }

  handleConnection(socket: Socket) {
    SocketsHandler.addSocket(socket);
  }

  handleDisconnect(socket: Socket) {
    SocketsHandler.removeClient(socket.id);
  }
}
