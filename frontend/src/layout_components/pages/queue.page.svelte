<script lang="ts">
  // Types
  import type { Player } from "../../dto/game.dto";
  // Intern classes
  import SocketsHandler from "../../utility/sockets";
  // Exports
  export let code: String = undefined;
  // Vars
  const selfe: Player = { name: "Niggi", token: "lol" };
  let Sockets: SocketsHandler;
  //let opponent_player: Player;

  // Functionality
  Sockets = new SocketsHandler("game", selfe, code === undefined);
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
    {#await Sockets.findOpponent(code)}
      <h3>Loading...</h3>
    {:then opponent_player}
      <h3>{opponent_player.name}</h3>
    {:catch}
      <h3>Ups, something went wrong :(</h3>
    {/await}
  </div>
</div>
