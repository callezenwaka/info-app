<template>
  <div class="create">
    <div class="create--form">
      <form action="" @submit.prevent="onAddEvent">
        <div class="create--header">
          <h2 class="create--title">Add Event</h2>
        </div>
        <div v-if="!!validations.length" class="validations">
          <ul style="text-align: left;"><li style="list-style-type: disc;" v-for="(validation, index) in validations" :key="index">{{validation}}</li></ul>
        </div>
        <div class="create--item">
          <label class="create--label" for="title"></label>
          <input class="create--input" type="text" name="title" id="title" v-model="event.title" @blur="onBlur($event)" placeholder="Enter event title" required >
        </div>
        <div class="create--item">
          <label class="create--label" for="decription"></label>
          <input class="create--input" type="text" name="decription" id="decription" v-model="event.description" @blur="onBlur($event)" placeholder="Enter event description" required >
        </div>
        <div class="create--item">
          <label class="create--label" for="date"></label>
          <input class="create--input" type="date" name="date" id="date" v-model="event.date" @blur="onBlur($event)" required>
        </div>
        <div class="create--item">
          <button class="create--button" :class="{isValid: isValid}" :disabled="!isValid"  type="submit">Add Event</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
export default {
  name: "Create",
  data() {
    return {
      validations: [],
      event: {
        title: "",
        description: "",
        date: "",
        id: "",
      },
    };
  },
  computed: {
    isValid() {
      return this.title !== "" && this.description !== "" && this.date !== "";
    },
  },
  methods: {
    ...mapActions([
      "addEvent",
      "getEvents",
      "getEvent",
      "updateEvent",
      "deleteEvent",
      "setMessage",
    ]),
    onBlur(event) {
      event.target.style.borderColor = event.target.value
        ? "rgba(229,231,235, 1)"
        : "rgba(255, 0, 0, 1)";
    },
    validate() {
      // Empty Errors container
      this.validations = [];
      // Check If Title Is Empty
      if (!this.event.title) {
        this.validations.push("Title is required!");
      }
      // Check If Description Is Empty
      if (!this.event.description) {
        this.validations.push("Description is required!");
      }
      // Check If Date Is Empty
      if (!this.event.date) {
        this.validations.push("Date is required!");
      }
      // Clear error messages on the page
      setTimeout(() => (this.validations = []), 5000);
      // If No Errors Return True
      if (this.validations.length) {
        return false;
      }
      return true;
    },
    async onAddEvent() {
      if (!this.validate()) return;
      this.event.id = Date.now();
      await this.addEvent(this.event);
      this.event = {};
      this.isAddingEvent = false;
    },
  },
};
</script>

<style scoped>
/* create */
.create--form {
  width: 100%;
  margin: 50px auto;
}
.create--title {
  text-align: center;
  margin: 2rem 0;
}
.validations {
  display: flex;
  justify-content: center;
  color: #ff0000;
  padding: 0.5rem;
  border-radius: 5px;
}
.create--item {
  display: flex;
  flex-direction: column;
  border: none;
  margin: 0px 0px 20px;
  padding: 0px;
}
.create--label {
  font-size: 14px;
  color: rgb(61, 79, 88);
  position: relative;
  height: 16px;
  /*width: 36px;*/
  text-align: left;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0.02em;
}
.create--input {
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 4px;
  height: 52px;
  font-size: 16px;
  line-height: 24px;
  /* margin-top: 5px; */
  padding-left: 12px;
  padding-right: 12px;
  transition: border-color 150ms ease-in-out 0s;
}
.create--button {
  position: relative;
  background-color: transparent;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  -webkit-box-align: stretch;
  height: 45px;
  width: 100%;
  font-size: 18px;
  margin-top: 48px;
  margin-bottom: 5px;
  border-radius: 4px;
  text-decoration: none;
  cursor: not-allowed;
  z-index: 0;
  /* appearance: none; */
  transition: all 150ms ease-in-out 0s;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
}
.create--button.isValid {
  cursor: pointer;
  color: rgb(255, 255, 255, 1);
  background-color: rgb(23, 35, 51, 1);
}
.create--button.isValid:hover {
  opacity: 0.5;
}
/* mini */
@media only screen and (min-width: 481px) {
  .create--form {
    width: 410px;
    margin: 0 auto;
  }
}
/* max */
@media only screen and (min-width: 981px) {
}
</style>