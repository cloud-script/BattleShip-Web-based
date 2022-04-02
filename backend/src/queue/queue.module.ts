import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { Queue_handlerController } from './queue_handler.controller';
import { Queue_handlerService } from './queue_handler.service';

@Module({
  imports: [],
  controllers: [QueueController, Queue_handlerController],
  providers: [QueueService, Queue_handlerService],
})
export class QueueModule {}
