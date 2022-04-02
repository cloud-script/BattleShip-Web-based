import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { QueueService } from './queue.service';

import { Player } from 'src/dto/game.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('add')
  @HttpCode(200)
  add_to_queue(@Body() player: Player) {
    this.queueService.add_to_queue(player);
  }

  @Post('remove')
  @HttpCode(200)
  removeFromQueue(@Body() player: Player) {
    this.queueService.removeFromQueue(player);
  }
}
