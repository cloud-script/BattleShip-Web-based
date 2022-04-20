<script type="ts">
  // Exports
  export let winner: Boolean, opponent: String;
  // Functionality
  function back_to_home() {
    document.location.href = "/";
  }
</script>

<div class="inner flex-all flex-col gap-3">
  {#if winner}
    <h1>You won!!</h1>
    <h2>2. {opponent}</h2>
  {:else}
    <h1>1. {opponent}</h1>
    <h2>You lost :(</h2>
  {/if}
  <button on:click={back_to_home}>Return to home</button>
</div>

<style>
  .inner h1 {
    font-size: 8rem;
    text-shadow: 2px 2.3px 5px #0000005b;
    background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: text_anim 3s infinite linear;
  }

  .inner h2 {
    font-size: 5rem;
    color: #4b4d58;
    text-shadow: 1px 1.3px 4px #0000005b;
  }

  @-webkit-keyframes text_anim {
    from {
      -webkit-filter: hue-rotate(0deg);
    }

    to {
      -webkit-filter: hue-rotate(360deg);
    }
  }
</style>
