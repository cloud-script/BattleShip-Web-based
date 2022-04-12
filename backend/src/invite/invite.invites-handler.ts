// Types
import type { Player } from 'src/dto/game.dto';

export default class InvitesHandler {
  private static invites_collection: { player: Player; code: String }[] = [];

  public static store_invite(player: Player, code: String) {
    this.invites_collection.push({ player: player, code: code });
  }

  public static get_player_by_code(code: String): Player {
    return this.invites_collection.find((invite) => invite.code === code)
      .player;
  }
}
