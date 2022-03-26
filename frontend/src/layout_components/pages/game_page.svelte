<script lang="ts">
  import Field from "../../user_components/Field.svelte";

  import { randomInt } from "../../utility/Utility";
  import { Ship, DIRECTION_CONSTANTS } from "../../Types";
  import type { Direction, Positions } from "../../Types";

  export let fieldSizeX: number, fieldSizeY: number;

  const randomAllies = (): Array<Ship> => {
    let result: Array<Ship> = [];

    function createRandomShipPosition(): { positions: Positions; direction: Direction } {
      let positions: Positions = [];

      function randomDirection(): Direction {
        return randomInt(1) === 1 ? DIRECTION_CONSTANTS.hr : DIRECTION_CONSTANTS.vr;
      }

      function isColliding(start_x: number, start_y: number, direction: Direction, length: number): Boolean {
        if (direction === DIRECTION_CONSTANTS.vr && (start_x < 0 || start_x + length > fieldSizeX)) {
          return true;
        } else if (start_y < 0 || start_y + length > fieldSizeY) {
          return true;
        } else if (result.length > 0) {
          return result.every((ship: Ship) => {
            createPositions(start_x, start_y, direction);
            if (!ship.hasSpace(positions)) return true;
          });
        }
        return false;
      }

      function createPositions(start_x: number, start_y: number, direction: Direction): void {
        positions.push({ x: start_x, y: start_y });
        for (let i = 1; i < ship_length; i++) {
          if (direction === DIRECTION_CONSTANTS.vr) {
            positions.push({ x: start_x + i, y: start_y });
          } else positions.push({ x: start_x, y: start_y + i });
        }
      }

      const ship_length: number = randomInt(3, 1);
      let randDirection: Direction = randomDirection();
      let randX: number = randomInt(fieldSizeX),
        randY: number = randomInt(fieldSizeY);

      while (isColliding(randX, randY, randDirection, ship_length - 1)) {
        randX = randomInt(fieldSizeX);
        randY = randomInt(fieldSizeY);
        randDirection = randomDirection();
      }

      createPositions(randX, randY, randDirection);
      return { positions, direction: randDirection };
    }

    for (let i = 0; i < 6; i++) {
      const newPosition = createRandomShipPosition();
      result.push(new Ship(newPosition.direction, "cruiser", newPosition.positions));
    }

    return result;
  };
</script>

<div class="content">
  <div class="selfe">
    <div class="flex-col flex-all gap-5">
      <h2 class="flex flex-all">You</h2>
      <Field allies={randomAllies()} sizeX={fieldSizeX + 1} sizeY={fieldSizeY + 1} blocksColor="#ebebeb" />
    </div>
    <div class="collection-ships flex flex-all" style:gap="60px" />
  </div>
  <div class="opponent">
    <div class="flex-col flex-all gap-5">
      <h2 class="flex flex-all">Opponent</h2>
      <Field sizeX={fieldSizeX + 1} sizeY={fieldSizeY + 1} blocksColor="#ebebeb" />
    </div>
    <div class="collection-ships flex flex-all" style:gap="60px">
      <h3>Aircraft Carrier</h3>
      <h3>Cruiser</h3>
      <h3>ship_1_3</h3>
      <h3>ship_1_4</h3>
    </div>
  </div>
</div>

<style>
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .content h2 {
    user-select: none;
    text-transform: uppercase;
    font-weight: 600;
    width: 70%;
    height: 45px;
    color: #ffff;
    border-radius: 7.5px;
    letter-spacing: 1.5px;
  }

  .content h3 {
    position: relative;
    font-weight: 600;
  }

  .content h3.hit {
    color: #ff0055;
  }

  .content h3.hit::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 75%;
    min-width: 100%;
    background-color: #ff0055;
    height: 3.5px;
    border-radius: 10px;
  }

  .content .selfe h2 {
    background-color: #ff0055;
  }

  .content .opponent h2 {
    background-color: #717c96;
  }

  .content .selfe {
    border-right: 2px solid #cdcdcd;
  }

  .content .selfe,
  .content .opponent {
    display: grid;
    grid-template-rows: 1fr 130px;
    position: relative;
  }

  .content .selfe .collection-ships::before,
  .content .opponent .collection-ships::before {
    text-transform: uppercase;
    font-weight: 700;
    color: #717c96;
    transform: rotate(-90deg);
    bottom: 55.5px;
    position: absolute;
    letter-spacing: 2px;
  }

  .content .selfe .collection-ships::before {
    content: "Your Ships";
    left: -55px;
  }

  .content .opponent .collection-ships::before {
    content: "grave yard";
    left: -45px;
  }
</style>
