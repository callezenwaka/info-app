<template>
  <div id="app">
    <Message></Message>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Message from "@/components/partials/Message.vue";
export default {
  components: {
    Message,
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
