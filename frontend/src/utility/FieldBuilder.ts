// Utilities
import { lengthToShipName, randomInt } from "./utilities";
// DO
import type { Allies, Position, Positions } from "../do/game.do";

export default class FieldBuilder {
  static create(X: number, Y: number, q: number): [Array<Array<Number>>, Allies] {
    let result_array = this.create_empty(X, Y);
    let result_array_raw: Positions[] = [];
    let allies: Allies = [];

    for (let i = 0; i < q; i++) {
      const ship_length = 4 - i + 1;
      let new_location = this.makeRandomLocation(X, Y, ship_length);
      while (this.isColliding(result_array_raw, new_location)) {
        new_location = this.makeRandomLocation(X, Y, ship_length);
      }

      allies.push({ positions: new_location, name: lengthToShipName(ship_length) });
      result_array_raw.push(new_location);
      new_location.forEach((position) => {
        result_array[position.x][position.y] = 1;
      });
    }
    return [result_array, allies];
  }

  static create_empty(X: number, Y: number): Array<Array<Number>> {
    return new Array(X).fill(0).map(() => new Array(Y).fill(0));
  }

  private static makeRandomLocation(sizeX: number, sizeY: number, length: number): Positions {
    const direction = randomInt(1) === 1;
    let result_positions: Positions = [];
    const safe_start_boundary = (): Position => {
      if (direction) {
        return { x: randomInt(sizeX - 1), y: randomInt(sizeY - length) };
      } else return { x: randomInt(sizeX - length), y: randomInt(sizeY - 1) };
    };

    result_positions.push(safe_start_boundary());
    for (let i = 1; i < length; i++) {
      if (direction) {
        result_positions.push({ x: result_positions[0].x, y: i + result_positions[0].y });
      } else {
        result_positions.push({ x: i + result_positions[0].x, y: result_positions[0].y });
      }
    }

    return result_positions;
  }

  private static isColliding(positions_confront: Positions[], positions: Positions): Boolean {
    return (
      positions.find((position) => {
        return positions_confront.find((positions_confront) => {
          return positions_confront.find((position_confront) => {
            const c_x = position_confront.x,
              c_y = position_confront.y,
              x = position.x,
              y = position.y;

            if (!(c_x === x) || !(y === c_y)) {
              if (c_x === x) {
                return c_y - 1 === y || c_y + 1 === y;
              } else if (c_y === y) {
                return c_x - 1 === x || c_x + 1 === x;
              }
            } else return true;
          });
        });
      }) !== undefined
    );
  }

  static display(array: Array<Array<Number>>) {
    let result = "";
    array.forEach((arr) => {
      result += "| ";
      arr.forEach((numb, i) => {
        result += numb + (i < arr.length ? " " : "");
      });
      result += " |\n";
    });
    console.info(result);
  }
}
