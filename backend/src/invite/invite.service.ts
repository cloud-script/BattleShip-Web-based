// Nest Injectable
import { Injectable } from '@nestjs/common';
// Utility
import { randString } from 'src/utils/utils';
// Types
import type { Player } from 'src/dto/game.dto';
// Invites Handler
import InvitesHandler from './invite.invites-handler';

@Injectable()
export class InviteService {
  private p_code_list: { player: Player; code: String }[] = [];

  create_code(host: Player): String {
    const new_code = randString(10);
    InvitesHandler.store_invite(host, new_code);
    return new_code;
  }

  find_by_code(code: String): Player {
    return InvitesHandler.get_player_by_code(code);
  }
}
