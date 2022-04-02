import { Controller, HttpCode, Post } from '@nestjs/common';
import { Queue_handlerService } from './queue_handler.service';
import type { Player } from 'src/dto/game.dto';

@Controller('queue')
export class Queue_handlerController {
  constructor(private readonly queue_handlerServiceue: Queue_handlerService) {}

  @Post('opponent')
  @HttpCode(200)
  async findOpponent(): Promise<Player> {
    return this.queue_handlerServiceue.findOpponent('');
  }
}
