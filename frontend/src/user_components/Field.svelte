<script lang="ts">
  import { onMount } from "svelte";

  import { MARINE_CONSTANTS, DIRECTION_CONSTANTS } from "../Types";
  import type { MapBlock, Ship } from "../Types";

  export let sizeX: number, sizeY: number;
  export let blocksColor: String;
  export let allies: Ship[] = [];

  let FieldArray: Array<MapBlock[]> = Array(sizeX)
    .fill(null)
    .map(() => Array(sizeY));
  const ABC: Array<String> = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];

  $: isReady = false;

  function fillMap() {
    function placeAllies() {
      allies.forEach((ship: Ship) => {
        ship.positions.forEach((position, index: number) => {
          if (index > 0) FieldArray[position.x][position.y] = ship;
          else FieldArray[position.x][position.y] = ship;
        });
      });
    }

    function initMap() {
      for (let x = 0; x < sizeX; x++) {
        for (let y = 0; y < sizeY; y++) {
          FieldArray[x][y] = MARINE_CONSTANTS.see;
        }
      }
      placeAllies();
    }

    initMap();
    isReady = true;
  }

  onMount(() => fillMap());
</script>

<div class="field flex-col gap-2">
  <div class="x flex-col gap-1">
    <div class="flex m-l-auto" style="gap: 3px">
      {#each FieldArray[0] as _, index}
        <h2 class="flex flex-all">{ABC[index]}</h2>
      {/each}
    </div>
    <div class="y flex gap-1">
      <div class="flex-col m-l-auto" style="gap: 3px">
        {#each FieldArray as _, index}
          <h2 class="flex flex-all">{index + 1}</h2>
        {/each}
      </div>
      <div
        class="blocks-map"
        style="width: 100%"
        style:grid-template-rows={`repeat(${sizeX}, 55px)`}
        style:grid-template-columns={`repeat(${sizeY}, 55px)`}
      >
        {#if isReady}
          {#each FieldArray as rows, rowIndex}
            {#each rows as _, columnIndex}
              {@const Block = FieldArray[rowIndex][columnIndex]}
              <div class="block flex flex-all" class:allie={Block !== "see"} style:background-color={blocksColor} />
            {/each}
          {/each}
        {/if}
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

  .field .blocks-map {
    display: grid;
    gap: 3px;
  }

  .field .blocks-map .block {
    border-radius: 5px;
  }

  .field .blocks-map .allie {
    background-color: #524ff938 !important;
    border: 1px solid #524ff9;
  }
</style>
