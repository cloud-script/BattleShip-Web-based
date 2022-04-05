<script lang="ts">
  export let label: String;
  export let value : string = "";
</script>

<div class="flex-col gap-1">
  <h4>{label}</h4>
  <input type="text" bind:value={value}/>
</div>
