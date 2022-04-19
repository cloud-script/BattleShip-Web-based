<script lang="ts">
  // Components
  import Game from "./game.page.svelte";
  // Game framework
  import PlayerSocket from "../../../utility/PlayerSocket";
  import LocalStorage from "../../../utility/LocalStorage";
  // Types
  import type { Player } from "../../../dto/game.dto";
  // Vars
  const selfe: any = LocalStorage.getItem("selfe").player;
  const isHost = LocalStorage.getItem("selfe").host;
  const connect_id = LocalStorage.getItem("selfe").connect_id || selfe.token;
  const socket = new PlayerSocket("game", selfe, isHost);
  let audio: any;
  $: isReady = false;
  $: count_down = 3;
  // Functionality
  function awaitForOpponent(): Promise<Player> {
    return new Promise(async (resolve, reject) => {
      socket
        .findOpponent(connect_id)
        .then((player) => {
          countDown();
          resolve(player);
        })
        .catch((error) => reject(error));
    });
  }

  async function countDown() {
    while (count_down !== 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      count_down--;
      audio.play();
    }
    isReady = true;
  }

  function copy() {
    navigator.clipboard.writeText(selfe.token.toString());
  }
</script>

{#if !isReady}
  <div id="queue_div" class="rlv flex-col flex-all">
    {#if isHost}
      <h3 class="pos-top-left flex flex-all gap-2" style="font-weight: 500;">
        Game ID: {selfe.token} <button on:click={copy}>Copy</button>
      </h3>
    {/if}
    <div class="flex gap-5">
      <div>
        <h3>You</h3>
      </div>
      <div class="flex-col flex-all gap-3">
        <h1>VS</h1>
        <h2 class="count-down" style:font-weight="500">{count_down}</h2>
      </div>
      <div>
        {#await awaitForOpponent()}
          <h3>Loading...</h3>
        {:then opponent_player}
          <h3>{opponent_player.name}</h3>
        {:catch}
          <h3>Ups, something went wrong :(</h3>
        {/await}
      </div>
    </div>
  </div>
{:else}
  <Game {socket} />
{/if}
<audio type="audio/mpeg" src="./assets/sound_effect_beep.mp3" bind:this={audio} />

<style>
  #queue_div {
    width: 100%;
    height: 100%;
  }
</style>
