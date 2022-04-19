<script lang="ts">
  // Components
  import Field from "../../../user_components/Field.svelte";
  import VrLine from "../../vr_line.layout.svelte";
  // Field Builder
  import FieldBuilder from "../../../utility/FieldBuilder";
  // Types
  import type PlayerSocket from "../../../utility/PlayerSocket";
  // Constants
  import { ShipsList } from "../../../enumerators/game.constant";
  import type { Allies } from "../../../do/game.do";
  // Exports
  export let socket: PlayerSocket;
  export let fieldSizeX = 8,
    fieldSizeY = 13;
  // Vars
  let allies: Allies, allies_field_array: Array<Array<Number>>;
  $: [allies_field_array, allies] = FieldBuilder.create(fieldSizeX, fieldSizeY, 4);
  $: opponent_ships = ShipsList;
</script>

<div class="content">
  <div class="selfe">
    <div class="flex-col flex-all gap-5">
      <h2 class="flex flex-all">You</h2>
      <Field bind:allies {allies_field_array} sizeX={fieldSizeX} sizeY={fieldSizeY} />
    </div>
    <div class="collection-ships flex flex-all" style:gap="60px">
      {#each allies as ship}
        <h3>{ship.name}</h3>
      {/each}
    </div>
  </div>
  <VrLine space="20px" color="gray" width="2px" />
  <div class="opponent">
    <div class="flex-col flex-all gap-5">
      <h2 class="flex flex-all">{socket.opponentName()}</h2>
      <Field bind:allies bind:opponent_ships {socket} allies_field_array={FieldBuilder.create_empty(fieldSizeX, fieldSizeY)} sizeX={fieldSizeX} sizeY={fieldSizeY} />
    </div>
    <div class="collection-ships flex-wrap flex-all" style:gap="60px">
      {#each opponent_ships as ship_name}
        <h3>{ship_name}</h3>
      {/each}
    </div>
  </div>
</div>

<style>
  .content {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
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
