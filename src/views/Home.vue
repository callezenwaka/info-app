<template>
  <div class="home">
    <Header :isAddingEvent="isAddingEvent" @AddingEvent="AddingEvent"></Header>
    <div class="home--wrapper">
      <Create v-if="isAddingEvent"></Create>
      <Events v-else :events="events"></Events>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/partials/Header.vue";
import Create from "@/components/Create.vue";
import Events from "@/components/Events.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    Header,
    Create,
    Events,
  },
  data() {
    return {
      isAddingEvent: false,
    };
  },
  computed: {
    ...mapGetters(["events", "event"]),
  },
  created() {
    this.getEvents();
  },
  // mounted() {
  //   console.log("here");
  //   this.$forceUpdate();
  // },
  methods: {
    ...mapActions([
      "addEvent",
      "getEvents",
      "getEvent",
      "updateEvent",
      "deleteEvent",
      "setMessage",
    ]),
    AddingEvent(value) {
      this.isAddingEvent = value;
    },
  },
};
</script>

<style scoped>
/* home */
.home {
  padding: 1rem;
  width: 100%;
  transition: all 500ms linear;
}
</style>