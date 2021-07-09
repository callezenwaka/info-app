<template>
  <div id="app">
    <Message></Message>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Message from "@/components/partials/Message.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Message,
  },
  computed: {
    ...mapGetters(["events"]),
  },
  mounted() {
    let events = [
      {
        id: 1624488250662,
        title: "John Doe Birthday",
        description: "This is a birthday party",
        date: `${new Date().getFullYear()}-${(
          "0" +
          (new Date().getMonth() + 1)
        ).slice(-2)}-27`,
      },
      {
        id: 1624488277004,
        title: "Jane Doe Birthday",
        description: "This is a birthday party",
        date: `${new Date().getFullYear()}-${(
          "0" +
          (new Date().getMonth() + 1)
        ).slice(-2)}-03`,
      },
      {
        id: 1624488306903,
        title: "Jack Doe Birthday",
        description: "This is a birthday party",
        date: `${new Date().getFullYear()}-${(
          "0" +
          (new Date().getMonth() + 1)
        ).slice(-2)}-11`,
      },
      {
        id: 1624488362731,
        title: "Joe Doe Birthday",
        description: "This is a birthday party",
        date: `${new Date().getFullYear()}-${(
          "0" +
          (new Date().getMonth() + 1)
        ).slice(-2)}-16`,
      },
    ];
    for (let event of events) {
      console.log(event);
      this.$store.dispatch("addEvent", event);
    }
  },
};
</script>

<style>
*,
::after,
::before,
html,
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0rem;
  padding: 0rem;
}
</style>
