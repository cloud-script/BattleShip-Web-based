<script lang="ts">
  // Svelte classes
  import { onMount } from "svelte";
  // Types
  import type { Player } from "../../dto/game.dto";
  // Intern classes
  import SocketsHandler from "../../utility/sockets";
  // Extern module
  import Axios from "axios";
  // Exports
  export let code: String = undefined;
  // Vars
  const selfe: Player = { name: "", token: "" };
  let Sockets: SocketsHandler;
  $: opponent_player = { name: "", token: "" };
  $: ready = false;

  // Functionality
  async function find_opponent() {
    await Axios({
      method: "POST",
      url: "http://localhost:13124/invite/find",
      data: { code: code },
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        opponent_player = data.data;
        ready = true;
      })
      .catch((error_msg: Error) => {
        console.error(error_msg.message);
        throw new Error();
      });
  }

  onMount(() => {
    if (code) {
      Sockets = new SocketsHandler("game");
      console.info(Sockets.connecToOpponent(code));
    } else Sockets = new SocketsHandler("game");
  });
</script>

<div class="flex gap-5">
  <div>
    <h3>You</h3>
  </div>
  <div class="flex-col flex-all gap-3">
    <h1>VS</h1>
    <h2 style:font-weight="500">3</h2>
  </div>
  <div>
    {#await find_opponent()}
      <h3>Loading...</h3>
    {:then}
      <h3>{opponent_player.name}</h3>
    {:catch}
      <h3>Ups, something went wrong :(</h3>
    {/await}
  </div>
</div>
