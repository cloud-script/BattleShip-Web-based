// NestJS libraries
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
// Handlers
import SocketsHandler from './game.sockets-handler';
// Types
import type {
  Action,
  Player,
  ActionCallBack,
  FirstRequest,
} from 'src/dto/game.dto';
import type { Socket } from 'socket.io';
// Enums
import { Events } from 'src/enumerators/events.enums';
import { randomInt } from 'src/utils/utils';

@WebSocketGateway({
  namespace: 'game',
  cors: { origin: '*' },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @SubscribeMessage(Events.Action)
  handle_action(@MessageBody() action: Action) {
    SocketsHandler.emitTo(action.destination_id, Events.Action, action.raw_pos);
  }

  @SubscribeMessage(Events.ActionStatus)
  handle_action_status(@MessageBody() callback: ActionCallBack) {
    const destination_id = callback.destination_id;
    delete callback.destination_id;
    SocketsHandler.emitTo(destination_id, Events.ActionStatus, callback);
  }

  @SubscribeMessage(Events.Connect)
  handle_player_connect(
    @MessageBody() request: { player: Player; connect_id: String },
  ) {
    SocketsHandler.emitTo(request.connect_id, Events.Accept, request.player);
  }

  @SubscribeMessage(Events.Register)
  register_player(
    @MessageBody() player: Player,
    @ConnectedSocket() socket: Socket,
  ) {
    SocketsHandler.registerPlayer(socket.id, player);
  }

  @SubscribeMessage(Events.AmIFirst)
  random_first(@MessageBody() firstRequest: FirstRequest) {
    const random_first = randomInt(1);
    SocketsHandler.emitTo(
      firstRequest.client_id,
      Events.AmIFirst,
      random_first === 1,
    );
    SocketsHandler.emitTo(
      firstRequest.host_id,
      Events.AmIFirst,
      random_first === 0,
    );
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    SocketsHandler.addSocket(socket);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    SocketsHandler.removeClient(socket.id);
  }
}
