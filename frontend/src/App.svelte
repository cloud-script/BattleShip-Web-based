<script lang="ts">
  import { Router, Route } from "svelte-navigator";

  import TopHeader from "./layout_components/top_header.layout.svelte";
  import Footer from "./layout_components/footer.layout.svelte";

  import HomePage from "./layout_components/pages/home.page.svelte";
  import JoinPage from "./layout_components/pages/join.page.svelte";
  import QueuePage from "./layout_components/pages/queue.page.svelte";
  import GamePage from "./layout_components/pages/game.page.svelte";
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
      <Route path="/join" component={JoinPage} />
      <Route path="/queue" component={QueuePage} />
      <Route path="/queue/:code" let:params>
        <QueuePage code={params.code} />
      </Route>
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
