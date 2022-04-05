<script lang="ts">
  export let height: String = "100%",
    width: String = "1px";
  export let color: String = "black";
  export let borderRadius: String = "10%";
  export let hide: Boolean = false;
</script>

<div
  style:width
  style:height
  style:background-color={color}
  style:border-radius={borderRadius}
  style:display={hide ? "none" : "block"}
/>
