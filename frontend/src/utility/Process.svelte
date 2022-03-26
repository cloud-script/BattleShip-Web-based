<script lang="ts">
  export let process: void | (() => void);
</script>

<slot res={process} />
