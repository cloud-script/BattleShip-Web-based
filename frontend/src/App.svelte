<script lang="ts">
  import { Router, Route } from "svelte-navigator";

  import TopHeader from "./layout_components/top_header.svelte";
  import Footer from "./layout_components/footer.svelte";

  import HomePage from "./layout_components/pages/home_page.svelte";
  import ClientPage from "./layout_components/pages/client_page.svelte";
  import QueuePage from "./layout_components/pages/queue_page.svelte";
  import GamePage from "./layout_components/pages/game_page.svelte";
</script>

<Router>
  <main>
    <TopHeader
      Items={[
        { item_name: "Home", path: "" },
        { item_name: "Join Session", path: "join" },
      ]}
    />
    <div id="content" class="flex flex-all">
      <Route path="/" component={HomePage} />
      <Route path="/join" component={ClientPage} />
      <Route path="/queue" component={QueuePage} />
      <Route path="/game">
        <GamePage fieldSizeX={7} fieldSizeY={12} />
      </Route>
    </div>
    <Footer />
  </main>
</Router>

<style>
  main {
    display: grid;
    grid-template-rows: 110px 1fr 90px;
    height: 100%;
  }

  #content {
    height: 100%;
    padding: 1% 2%;
  }
</style>
