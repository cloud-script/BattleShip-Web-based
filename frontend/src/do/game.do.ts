import type { Ship } from "../enumerators/game.enums";

export type Position = { x: number; y: number };
export type Positions = Array<Position>;
export type Allies = Array<{ positions: Positions; name: Ship }>;
