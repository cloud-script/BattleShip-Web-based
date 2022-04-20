<script lang="ts">
  // Svelte navigator
  import { Router, Route } from "svelte-navigator";
  // Top-Bottom
  import TopHeader from "./layout_components/top_header.layout.svelte";
  import Footer from "./layout_components/footer.layout.svelte";
  // Pages
  import HomePage from "./layout_components/pages/home.page.svelte";
  import JoinPage from "./layout_components/pages/join.page.svelte";
  import QueuePage from "./layout_components/pages/game/queue.page.svelte";
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
