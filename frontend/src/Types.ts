type ShipTypes = "aircraft_carrier" | "cruiser" | "" | "";

type OtherMarine = "see";

type Position = { x: number; y: number };
export type Positions = Array<Position>;

export type Direction = "horizontal" | "vertical";

export class Ship {
  private status: "alive" | "dead";
  private border: Positions;
  positions: Positions;
  direction: Direction;
  type: ShipTypes;

  constructor(direction: Direction, type: ShipTypes, positions: Positions) {
    this.positions = positions;
    this.direction = direction;
    this.type = type;
    this.status = "alive";
    this.border = this.createBorders();
  }

  private positionEquals(x: number, y: number): Boolean {
    return (
      this.positions.find((position: Position) => {
        return position.x === x && position.y === y;
      }) !== undefined
    );
  }

  private createBorders(): Positions {
    let border_created: Positions = [];
    if (this.direction === DIRECTION_CONSTANTS.vr) {
      this.positions.forEach((position, index) => {
        if (index === 0) {
          border_created.push({ x: position.x - 1, y: position.y });
        } else if (index === this.positions.length - 1) {
          border_created.push({ x: position.x + 1, y: position.y });
        }
        border_created.push({ x: position.x, y: position.y - 1 });
        border_created.push({ x: position.x, y: position.y + 1 });
      });
    } else {
      this.positions.forEach((position, index) => {
        if (index === 0) {
          border_created.push({ x: position.x, y: position.y - 1 });
        } else if (index === this.positions.length - 1) {
          border_created.push({ x: position.x, y: position.y + 1 });
        }
        border_created.push({ x: position.x - 1, y: position.y });
        border_created.push({ x: position.x + 1, y: position.y });
      });
    }
    return border_created;
  }

  public hasSpace(ship_positions: Positions): Boolean {
    if (!this.positionEquals(ship_positions[0].x, ship_positions[0].y)) {
      return (
        ship_positions.find((position) => {
          console.info("B " + this.border.length);
          this.border.forEach((position_placed) => {
            if (position.x === position_placed.x && position.y === position_placed.y) {
              return true;
            }
          });

          return false;
        }) === undefined
      );
    }
    return false;
  }

  public isAlive(): Boolean {
    return this.status === "alive";
  }

  public kill(): void {
    this.status = "dead";
  }
}

export type MapBlock = Ship | OtherMarine;

export interface HeaderItems_obj {
  item_name: String;
  path: String;
}

/* CONSTANTS */
export const MARINE_CONSTANTS: { see: OtherMarine } = { see: "see" };
export const DIRECTION_CONSTANTS: { hr: Direction; vr: Direction } = { hr: "horizontal", vr: "vertical" };
/* CONSTANTS_END */
