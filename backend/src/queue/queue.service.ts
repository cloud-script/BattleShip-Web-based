import { BadRequestException, Injectable } from '@nestjs/common';
import type { Player } from 'src/dto/game.dto';
import QueueHandler from './QueueHandler';

@Injectable()
export class QueueService {
  private PlayersInQueue: Player[] = [];

  private readonly isValid_Player = (player: Player): Boolean => {
    return (
      typeof player === 'object' &&
      'name' in player &&
      'token' in player &&
      player.name.length > 0 &&
      player.token.length > 0
    );
  };

  private readonly compareTo = (
    player_1: Player,
    player_2: Player,
  ): Boolean => {
    return player_1.name === player_2.name && player_1.token === player_2.token;
  };

  private readonly getIndex = (player: Player): number => {
    let index: number;
    this.PlayersInQueue.forEach((player_in_queue: Player, i) => {
      if (this.compareTo(player_in_queue, player)) {
        index = i;
      }
    });
    return index;
  };

  private readonly isInQueue = (player: Player): Boolean => {
    return (
      this.PlayersInQueue.find((player_in_queue: Player) =>
        this.compareTo(player_in_queue, player),
      ) !== undefined
    );
  };

  private readonly findOpponent = (player: Player): Player => {
    if (this.PlayersInQueue.length > 0) {
      return this.PlayersInQueue.find((opponent: Player) => {
        if (JSON.stringify(opponent) !== JSON.stringify(player)) {
          this.removeFromQueue(opponent);
          this.removeFromQueue(player);
          return opponent;
        }
      });
    } else null;
  };

  async add_to_queue(player: Player) {
 /*   if (this.isValid_Player(player) && !this.isInQueue(player)) {
      this.PlayersInQueue.push(player);
    } else throw new BadRequestException();*/
    QueueHandler.add_to_queue(player)
    console.table(QueueHandler.queue)
  }

  removeFromQueue(player: Player) {
    if (this.isValid_Player(player) && this.isInQueue(player)) {
      const index = this.getIndex(player);
      if (index >= 0) {
        this.PlayersInQueue.splice(index, 1);
        console.info(
          'player removed -> ' + JSON.stringify(this.PlayersInQueue),
        );
      } else throw new BadRequestException();
    } else throw new BadRequestException();
  }
}
