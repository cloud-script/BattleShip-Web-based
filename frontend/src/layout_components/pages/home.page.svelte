<script lang="ts">
  // Components
  import Card from "../card.layout.svelte";
  import InputText from "../../user_components/InputText.svelte";
  // Axios for http request
  import Axios from "axios";
  // Local Storage Manager & Random String
  import LocalStorage from "../../utility/LocalStorage";
  import { randString } from "../../utility/utilities";
  // DTO's
  import type { Player } from "../../dto/game.dto";
  // Vars
  let name_value = "";
  let selfe: Player = { name: "", token: randString(12) };
  // Functionality
  function create_code(): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      Axios({
        method: "POST",
        url: "http://192.168.1.170:13124/invite/create",
        data: { name: name_value, token: selfe.token },
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          resolve(true);
        })
        .catch((error_msg) => {
          reject(error_msg);
        });
    });
  }

  function validate() {
    if (name_value.length > 2) {
      create_code()
        .then((res) => {
          if (res) {
            selfe.name = name_value;
            LocalStorage.addItem("selfe", JSON.stringify({ host: true, player: selfe }));
            document.location.href = "queue";
          }
        })
        .catch((err) => console.error(err));
    }
  }
</script>

<div class="flex-col flex-all gap-2" style:width="100%">
  <h2>Host Game</h2>
  <Card className="flex gap-3 ease-2" width="100px">
    <div class="flex-col gap-2">
      <InputText label="Username" bind:value={name_value} />
      <div class="flex gap-2">
        <button on:click={validate}>Start Session</button>
        <button>Join Random Session</button>
      </div>
    </div>
  </Card>
</div>
