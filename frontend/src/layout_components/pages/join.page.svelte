<script lang="ts">
  // Components import
  import Card from "../card.layout.svelte";
  import InputText from "../../user_components/InputText.svelte";
  // Local Storage Manager & Random String
  import LocalStorage from "../../utility/LocalStorage";
  import { randString } from "../../utility/utilities";
  // DTO's
  import type { Player } from "../../dto/game.dto";
  // Vars
  let username_value = "";
  let selfe: Player = { name: "", token: randString(12) };
  let code_value = "";
  // Functionality
  function validate() {
    if (username_value.length > 2 && code_value.length === 12) {
      selfe.name = username_value;
      LocalStorage.addItem("selfe", JSON.stringify({ host: false, connect_id: code_value, player: selfe }));
      document.location.href = "queue";
    } else alert("nope");
  }
</script>

<div class="content flex-col flex-all gap-2">
  <h2>Join Game</h2>
  <Card padding="15px">
    <div class="flex-col gap-2">
      <InputText label="Username" bind:value={username_value} />
      <InputText label="Code" bind:value={code_value} />
      <button on:click={validate}>Join Session</button>
    </div>
  </Card>
</div>
