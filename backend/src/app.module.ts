import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { QueueModule } from './queue/queue.module';
import { InviteModule } from './invite/invite.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    GameModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    QueueModule,
    InviteModule,
    GameModule
  ],
})
export class AppModule {}
