import type { Socket } from 'net';
import { ActionStatus } from 'src/enumerators/events.enums';

export type Player = { name: String; token: String };
export type Client = { id: String; socket: Socket };
export type Action = { raw_pos: number; destination_id: String };
export type ActionCallBack = {
  action_status: ActionStatus;
  sink: { name: String } | false;
  destination_id: String;
};
export type FirstRequest = { host_id: String; client_id: String };
