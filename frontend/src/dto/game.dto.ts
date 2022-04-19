import type { ActionStatus } from "../enumerators/events.enums";

export type Action = { raw_pow: number; destination_id: String };
export type ActionRaw = { raw_pos: number };
export type ActionCallBack = { action_status: ActionStatus; sink: { ship_name: String } | false };
export type Player = { name: String; token: String };
export type FirstRequest = { host_id: String; client_id: String };
