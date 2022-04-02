import type { Socket } from 'net';

export type Player = { name: String; token: String };

export type Client = { id: String; socket: Socket };

export type Action = { x: number; y: number; destination_id: String };

export const Events = {
  HIT: 'hit',
};
