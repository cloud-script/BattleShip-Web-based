import { Injectable } from '@nestjs/common';
import { randString } from 'src/utils/utils';

import type { Player } from 'src/dto/game.dto';

@Injectable()
export class InviteService {
  private p_code_list: { player: Player; code: String }[] = [];

  create_code(host: Player): String {
    const new_code = randString(10);
    this.p_code_list.push({ player: host, code: new_code });
    return new_code;
  }

  find_by_code(code: String): Player {
    const res = this.p_code_list.find((p_code) => p_code.code === code);
    return res !== undefined ? res.player : undefined;
  }
}
