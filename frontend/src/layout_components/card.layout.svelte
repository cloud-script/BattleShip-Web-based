<script lang="ts">
  export let width: String = "auto",
    height: String = "auto";
  export let padding: String = "1% 2%";
  export let background: String = "#e7e7e7";
  export let border: String = "1px solid #bdb3b3";
  export let flexCol: Boolean = false;
  export let className: String = "";
</script>

<div
  class={className.toString()}
  class:flex-col={flexCol}
  style:min-width={width}
  style:height
  style:padding
  style:border
  style:background-color={background}
>
  <slot />
</div>
