import type { Player } from 'src/dto/game.dto';

export default class QueueHandler {
  public static queue: Player[] = [];

  public static add_to_queue(player: Player) {
    this.queue.push(player);
  }

  public static async find_opponent(token : String)/* Promise<Player>*/{

  }
}
