<script lang="ts">
  import type { HeaderItems_obj } from "../Types";
  import VrLine from "./Vr_line.svelte";

  export let Items: Array<HeaderItems_obj>;
</script>

<div id="top-header" class="flex flex-all">
  <div class="flex flex-all gap-3" style="">
    <span class="iconify" data-icon="fluent:vehicle-ship-20-filled" />
    <VrLine width="2.5px" height="35px" borderRadius="10px" color="#abaebf" />
    <h1 class="title">Schiffe versenken</h1>
  </div>
  <div class="header-items flex flex-all gap-5 m-l-auto">
    {#each Items as Item}
      <h3><a href={Item.path.toString()}>{Item.item_name}</a></h3>
    {/each}
  </div>
</div>

<style>
  #top-header {
    background-color: #e7e7e7;
    border-bottom: 2px solid #cdcdcd;
    padding: 0 20px;
    height: inherit;
  }

  #top-header .iconify {
    width: 45px;
    height: 45px;
    color: #4350a9;
  }

  #top-header .header-items h3 {
    color: #3c4150;
    text-transform: uppercase;
    position: relative;
  }

  #top-header .header-items h3::after {
    content: "";
    transition: width 100ms ease-in;
    position: absolute;
    width: 0;
    height: 1.5px;
    background-color: #4350a9;
    bottom: 0;
    left: 0;
  }

  #top-header .header-items h3:hover::after {
    width: 100%;
  }
</style>
