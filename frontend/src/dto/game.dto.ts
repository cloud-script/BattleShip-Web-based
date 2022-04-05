export type Player = { name: String; token: String };

export type Action = { x: number; y: number; destination_id: String };

export const Events = {
  HIT: 'hit',
};
