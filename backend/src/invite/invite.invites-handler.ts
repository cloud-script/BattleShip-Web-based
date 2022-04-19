// Types
import { BadRequestException } from '@nestjs/common';
import type { Player } from 'src/dto/game.dto';

export default class InvitesHandler {
  private static invites = new Map<String, Player>();

  public static store_invite(player: Player, code: String) {
    if (!this.invites.has(code)) {
      this.invites.set(code, player);
    } else throw new BadRequestException();
  }

  public static get_player_by_code(code: String): Player {
    return this.invites.get(code);
  }
}
