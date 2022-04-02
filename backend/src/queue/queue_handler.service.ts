import { Injectable } from '@nestjs/common';
import type { Player } from 'src/dto/game.dto';

@Injectable()
export class Queue_handlerService {
  private PlayersInQueue: Player[] = [];

  async findOpponent(token: String): Promise<Player> {
    return this.PlayersInQueue.find((player: Player) => player.token !== token);
  }
}
