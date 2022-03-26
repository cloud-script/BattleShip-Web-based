<script lang="ts">
  import Process from "../utility/Process.svelte";
  import { onMount } from "svelte";

  export let rows: number, columns: number;
  export let label: Boolean = false;
  let ButtonsCollection = new Array(rows).fill(0).map(() => new Array(columns).fill(0));
  let current_button_id: number = 0;

  onMount(() => {
    activateButtons_handler(rows, columns);
  });

  $: fieldSize_X = rows;
  $: fieldSize_Y = columns;
  $: current_size = fieldSize_X + "x" + fieldSize_Y;

  function addButtonToCollection(row: number, col: number) {
    ButtonsCollection[row][col] = current_button_id;
    current_button_id++;
  }

  function activateButtons_handler(row: number, col: number) {
    const clearField = () => {
      fieldSize_X = 0;
      fieldSize_Y = 0;
      for (let i = 0; i < ButtonsCollection.length; i++) {
        fieldSize_X = fieldSize_X !== 0 ? fieldSize_X - 1 : fieldSize_X;
        for (let j = 0; j < ButtonsCollection[i].length; j++) {
          fieldSize_Y = fieldSize_Y !== 0 ? fieldSize_Y - 1 : fieldSize_Y;
          document.getElementsByClassName("block")[ButtonsCollection[i][j]].style["background-color"] = "transparent";
        }
      }
    };

    if (row >= 3 && col >= 3) {
      clearField();
      for (let i = 0; i < row; i++) {
        fieldSize_X++;
        for (let j = 0; j < col; j++) {
          if (col !== row) {
            if (i === row - 1) {
              fieldSize_Y++;
            }
          } else {
            fieldSize_Y = j !== 0 ? fieldSize_Y : fieldSize_Y + 1;
          }
          document.getElementsByClassName("block")[ButtonsCollection[i][j]].style["background-color"] = "rgb(77, 95, 179)";
        }
      }
    }

    rows = fieldSize_X;
    columns = fieldSize_Y;
  }
</script>

<div class="flex-col flex-hr gap-1">
  {#if label}
    <h4>Field Size: {current_size}</h4>
  {/if}
  <div class="field-map">
    {#each ButtonsCollection as _, row}
      {#each _ as _, col}
        <Process process={addButtonToCollection(row, col)} />
        <div class="block ease" on:mousedown={(_) => activateButtons_handler(row + 1, col + 1)} />
      {/each}
    {/each}
  </div>
</div>

<style>
  .field-map {
    display: grid;
    grid-template-columns: repeat(8, 20px);
    grid-template-rows: repeat(8, 20px);
    gap: 2.5px;
  }

  .field-map .block {
    cursor: grab;
    border: 1px solid #3e56c0;
    border-radius: 3px;
  }

  .field-map .block:hover {
    background-color: #2e4197;
  }
</style>
