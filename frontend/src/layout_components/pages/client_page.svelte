<script lang="ts">
  import Card from "../card.svelte";
  import InputText from "../../user_components/InputText.svelte";
</script>

<div class="content flex-col flex-all gap-2">
  <h2>Join Game</h2>
  <Card>
    <div class="flex-col gap-2">
      <InputText label="Username" />
      <InputText label="Code" />
      <button>Join Session</button>
    </div>
  </Card>
</div>
