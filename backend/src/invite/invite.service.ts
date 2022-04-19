// Nest Injectable
import { Injectable } from '@nestjs/common';
// Random String
import { randString } from 'src/utils/utils';
// Invites Handler
import InvitesHandler from './invite.invites-handler';
// Transfer Object Types
import type { Player } from 'src/dto/game.dto';

@Injectable()
export class InviteService {
  register_code(host: Player) {
    InvitesHandler.store_invite(host, host.token);
  }

  find_by_code(code: String): Player {
    return InvitesHandler.get_player_by_code(code);
  }
}
