import { Body, Controller, Header, Post } from '@nestjs/common';
import { InviteService } from './invite.service';

import type { Player } from 'src/dto/game.dto';

@Controller('invite')
export class InviteController {
  constructor(readonly inviteService: InviteService) {}

  @Header('Accept', 'application/json')
  @Post('create')
  create_code(@Body() host: Player) {
    this.inviteService.register_code(host);
  }

  @Header('Accept', 'application/json')
  @Post('find')
  find_by_code(@Body() invite_code: { code: String }): Player {
    return this.inviteService.find_by_code(invite_code.code);
  }
}
