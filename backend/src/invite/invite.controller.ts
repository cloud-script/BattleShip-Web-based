import { Body, Controller, Header, Post } from '@nestjs/common';
import { InviteService } from './invite.service';

import type { Player } from 'src/dto/game.dto';

@Controller('invite')
export class InviteController {
  constructor(readonly inviteService: InviteService) {}

  @Post('create')
  create_code(@Body() host: Player): String {
    return this.inviteService.create_code(host);
  }

  @Post('find')
  find_by_code(@Body() invite_code: { code: String }): Player {
    return this.inviteService.find_by_code(invite_code.code);
  }
}
