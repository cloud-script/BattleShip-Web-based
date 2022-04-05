import * as WebSocket from 'ws';
import { WebSocketAdapter } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { IoAdapter } from '@nestjs/platform-socket.io/adapters/io-adapter';
import { Observable } from 'rxjs/internal/Observable';
import 'rxjs/add/observable/fromEvent';

export class WsAdapter extends IoAdapter {
  public bindMessageHandlers(
    client,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {
    handlers.forEach(({ message, callback }) => {
        client.on('event', function (data, ack) {
            console.log('DATA', data)
            ack('woot')
        })
        Observable.fromEvent(client, message)
            .switchMap(data => process(callback(data)))
            .filter(result => !!result && result.event)
            .subscribe(({ event, data }) => client.emit(event, data))
        });
  }
}