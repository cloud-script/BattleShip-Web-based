<script lang="ts">
  // Components import
  import Card from "../card.layout.svelte";
  import InputText from "../../user_components/InputText.svelte";
  // Types
  import type { Player } from "../../dto/game.dto";
  // Extern module
  import Axios from "axios";

  async function find_opponent(): Promise<Player> {
    let result;
    await Axios({
      method: "POST",
      url: "http://localhost:13124/invite/find",
      data: JSON.stringify({ code: code_value }),
      //     headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        result = data.data;
      })
      .catch((error_msg: Error) => {
        console.error(error_msg.message);
        throw new Error();
      });

    return result;
  }

  function validate() {
    if (username_value.length > 2 && code_value.length === 10) {
      document.location.href = `queue/${code_value}`;
    }
  }



  // Reactive vars & vars
  $: username_value = "";
  $: code_value = "";
  $: ready = false;
</script>

<div class="content flex-col flex-all gap-2">
  <h2>Join Game</h2>
  <Card padding="15px">
    {#if ready}
      {#await find_opponent()}
        <h3>Searching for your opponent...</h3>
      {:then response_player}
        <h3>Opponent : {response_player.name || "name_not_found!"}</h3>
      {:catch}
        <h3>Ups, something went wrong :(</h3>
      {/await}
    {:else}
      <div class="flex-col gap-2">
        <InputText label="Username" bind:value={username_value} />
        <InputText label="Code" bind:value={code_value} />
        <button on:click={validate}>Join Session</button>
      </div>
    {/if}
  </Card>
</div>
