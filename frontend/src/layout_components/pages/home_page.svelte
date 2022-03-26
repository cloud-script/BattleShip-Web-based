<script lang="ts">
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";

  import Card from "../card.svelte";
  import FieldSizeMap from "../../user_components/field-size-map.svelte";
  import InputText from "../../user_components/InputText.svelte";
  import VrLine from "../Vr_line.svelte";

  let ships_icons_container_ref: HTMLElement;
  $: total_selected_ships = 0;

  onMount(() => {
    total_selected_ships = ships_icons_container_ref.getElementsByClassName("selected").length;
  });

  $: card_width = "100px";
  $: isExpanded = card_width === "300px";

  function expandCard() {
    card_width = isExpanded ? "100px" : "300px";
  }

  $: time_disabled = true;
  $: time_limit = "10 min";

  function switchTimeLimit() {
    switch (time_limit) {
      case "10 min":
        if (time_disabled) {
          time_disabled = false;
        } else {
          time_limit = "6 min";
        }
        break;
      case "6 min":
        time_limit = "3 min";
        break;
      case "3 min":
        time_disabled = true;
        time_limit = "10 min";
        break;
      default:
        time_disabled = true;
        time_limit = "10 min";
    }
  }
</script>

<div class="flex-col flex-all gap-2" style:width="100%">
  <h2>Host Game</h2>
  <Card className="flex gap-3 ease-2" width={card_width}>
    <div class="flex-col gap-2">
      <InputText label="Username" />
      <div class="flex gap-2">
        <button><Link to="queue">Start Session</Link></button>
        <button><Link to="queue">Join Random Session</Link></button>
      </div>
    </div>
    <VrLine hide={!isExpanded} color="#a3a4a9" />
    <div style:display={isExpanded ? "flex" : "none"} class="gap-5">
      <div class="flex-col gap-2">
        <h4>Time Limit: <span class="time" class:off={time_disabled} on:click={switchTimeLimit}>{time_limit}</span></h4>
        <FieldSizeMap label columns={8} rows={8} />
      </div>
    </div>
  </Card>
</div>

<style>
  span.time {
    user-select: none;
    font-weight: 500;
    position: relative;
    cursor: pointer;
  }

  span.time.off::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 50%;
    min-width: 100%;
    background-color: var(--default);
    height: 1.5px;
  }
</style>
