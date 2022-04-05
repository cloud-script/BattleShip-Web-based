<script lang="ts">
  // Components
  import Card from "../card.layout.svelte";
  import InputText from "../../user_components/InputText.svelte";
  // Extern module
  import Axios from "axios";
  // Reactive vars
  $: username_value = "";

  async function create_code(): Promise<String> {
    let result = "";
    await Axios({
      method: "POST",
      url: "http://localhost:13124/invite/create",
      data: { name: username_value, token: "" },
      headers: { "Content-Type": "application/json" },
    })
      .then((data: any) => {
        result = data.data;
      })
      .catch((error_msg) => {
        console.error(error_msg);
        throw new Error();
      });
    return result;
  }

  async function validate() {
    if (username_value.length > 2) {
      document.location.href = `queue/${await create_code()}`;
    }
  }
</script>

<div class="flex-col flex-all gap-2" style:width="100%">
  <h2>Host Game</h2>
  <Card className="flex gap-3 ease-2" width="100px">
    <div class="flex-col gap-2">
      <InputText label="Username" bind:value={username_value} />
      <div class="flex gap-2">
        <button on:click={validate}>Start Session</button>
        <button>Join Random Session</button>
      </div>
    </div>
  </Card>
</div>
