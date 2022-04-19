<script lang="ts">
  // On Mount - Svelte
  import { onMount } from "svelte";
  // Image Element Builder
  import { createImageEle } from "../utility/utilities";
  // DO
  import type PlayerSocket from "../utility/PlayerSocket";
  // Enums & Types & Constants
  import { ActionStatus } from "../enumerators/events.enums";
  import type { Allies, Positions } from "../do/game.do";
  import { ABC } from "../enumerators/game.constant";
  import type { Ship } from "../enumerators/game.enums";
  // Exports
  export let socket: PlayerSocket = undefined;
  export let sizeX: number, sizeY: number;
  export let allies_field_array: Array<Array<Number>>;
  export let allies: Allies = undefined,
    opponent_ships: Array<Ship> = undefined;
  // Vars
  let ready_move: Boolean = false;
  // Functionality
  function show_block_interactions(e: any) {
    const target = !e.target.className.includes("block") ? e.target.parentNode : e.target;
    if (ready_move) {
      if (socket && !target.className.includes("hit")) {
        const flag = target.getElementsByTagName("img")[0];
        if (flag) {
          flag.style.display = "none";
          target.getElementsByClassName("mark-btn")[0].style.display = "block";
          target.getElementsByClassName("mark-btn")[0].innerText = "NONE";
          target.getElementsByClassName("hit-btn")[0].style.display = "block";
        } else {
          target.getElementsByClassName("mark-btn")[0].innerText = "MARK";
          target.getElementsByClassName("mark-btn")[0].style.display = "block";
          target.getElementsByClassName("hit-btn")[0].style.display = "block";
        }
      }
    } else {
      target.style.cursor = "not-allowed";
    }
  }

  function hide_block_interactions(e: any) {
    const target = e.target;
    if (socket) {
      target.getElementsByClassName("mark-btn")[0].style.display = "none";
      target.getElementsByClassName("hit-btn")[0].style.display = "none";
      (target.getElementsByTagName("img")[0] || { style: { display: "" } }).style.display = "block";
    }
    target.style.cursor = "default";
  }

  function hit(e: any) {
    const target: HTMLElement = e.target.parentNode;
    if (socket && ready_move) {
      const x = parseInt(target.dataset.x),
        y = parseInt(target.dataset.y);

      socket.emitAction((x > 0 ? x * sizeY : 0) + y).then((callback) => {
        target.classList.add("hit");
        hide_block_interactions({ target: target });
        if (callback.action_status === ActionStatus.MISS) {
          target.appendChild(createImageEle("miss"));
        } else {
          if (callback.sink) {
            const sank_ship_name = callback.sink.ship_name;
            console.info(sank_ship_name);
            console.table(callback);
            opponent_ships = opponent_ships.filter((ship: any) => ship !== sank_ship_name);
          }
          target.appendChild(createImageEle("hit"));
        }
        ready_move = false;
      });
    }
  }

  function mark(e: any) {
    const target = e.target.parentNode;
    if (!target.getElementsByTagName("img")[0]) {
      target.getElementsByClassName("mark-btn")[0].innerText = "NONE";
      hide_block_interactions({ target: target });
      target.appendChild(createImageEle("flag"));
    } else {
      target.getElementsByClassName("mark-btn")[0].innerText = "MARK";
      target.getElementsByTagName("img")[0].remove();
    }
  }

  const get_ship_name = (x: number, y: number): Ship | String => {
    return allies ? allies.find((allie: { positions: Positions; name: Ship }) => allie.positions.find((position) => position.x === x && position.y === y)).name : "";
  };

  const isShip = (block: any): Boolean => {
    return block === 1;
  };

  onMount(async () => {
    if (socket) {
      ready_move = await socket.amIFirst();
      socket.events.on("ping", (block_id: number) => {
        const block: any = document.getElementsByClassName("block")[block_id];
        if (block) {
          if (block.className.includes("allie")) {
            const hit_ship_name = block.dataset.name;
            let found_pos = 0;
            let sink_callback: false | { ship_name: any }  = false;
            const ship_array = allies
              .find((ship, index) => {
                if (ship.name === hit_ship_name) {
                  found_pos = index;
                  return true;
                }
              })
              .positions.slice(1);
            allies[found_pos].positions = ship_array;

            if (ship_array.length === 0) {
              allies = allies.filter((ship) => ship.name !== hit_ship_name);
              sink_callback = { ship_name: hit_ship_name };
            }
            block.style["background-color"] = "#3e3d5259";
            socket.emitStatus(ActionStatus.HIT, sink_callback);
          } else {
            socket.emitStatus(ActionStatus.MISS);
          }
          block.appendChild(createImageEle("miss"));
          ready_move = true;
        }
      });
    }
  });
</script>

<div class="field flex-col gap-2">
  <div class="flex-col gap-1">
    <div class="x-achse flex">
      {#each new Array(sizeY) as _, index}
        <h2 class="flex flex-all">{ABC[index]}</h2>
      {/each}
    </div>
    <div class="flex gap-1">
      <div class="y-achse flex-col m-l-auto">
        {#each new Array(sizeX) as _, index}
          <h2 class="flex flex-all">{index + 1}</h2>
        {/each}
      </div>
      <div class="blocks-map" style="width: 100%" style:grid-template-rows={`repeat(${sizeX}, 60px)`} style:grid-template-columns={`repeat(${sizeY}, 60px)`}>
        {#each allies_field_array as rows, rowIndex}
          {#each rows as _, colIndex}
            {@const Block = allies_field_array[rowIndex][colIndex]}
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <div class="block flex-col gap-1 flex-all" data-x={rowIndex} data-y={colIndex} data-name={isShip(Block) ? get_ship_name(rowIndex, colIndex) : ""} class:allie={isShip(Block)} on:mouseover={show_block_interactions} on:mouseleave={hide_block_interactions}>
              <button class="hit-btn" on:click={hit}>HIT</button>
              <button class="mark-btn" on:click={mark}>MARK</button>
            </div>
          {/each}
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .field h2 {
    font-weight: 700;
    color: #a5a9b3;
    width: 55px;
    height: 55px;
  }

  .field .x-achse,
  .field .y-achse {
    gap: 3px;
  }

  .field .x-achse h2,
  .field .y-achse h2 {
    height: 60px;
    width: 60px;
  }

  .field .x-achse {
    margin-left: 60px;
  }

  .field .blocks-map {
    display: grid;
    gap: 3px;
  }

  .field .blocks-map .block {
    background-color: #dfd9d9;
    border-radius: 5px;
  }

  .field .blocks-map .block .mark-btn,
  .hit-btn {
    color: #ffff;
    font-size: 0.8rem;
    font-weight: 600;
    background-color: #db0d52;
    display: none;
    width: 80%;
    padding: 2.4px;
    border: none;
    border-radius: 5px; /* #717c96*/
    transition: all ease-in-out 180ms;
  }

  .field .blocks-map .block .mark-btn {
    background-color: #5e6577;
  }

  .field .blocks-map .block .mark-btn:hover {
    box-shadow: 1.3px 1.3px 10px #717c96b0;
    background-color: #717c96;
  }

  .field .blocks-map .block .hit-btn:hover {
    box-shadow: 1.3px 1.3px 10px #ff005577;
    background-color: #ff0055;
  }

  .field .blocks-map .allie {
    background-color: #524ff938;
    border: 1px solid #524ff9;
  }
</style>
