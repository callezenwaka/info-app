<template>
  <div class="schedules">
    <div class="page--header">
      <h2 class="page--title">Event Schedule</h2>
      <hr>
    </div>
    <div class="schedule--content">
      <div class="schedule--card">
        <h3 class="schedule--card--header" id="monthAndYear" ref="monthAndYear"></h3>
        <table class="schedule--table schedule--table--bordered" id="calendar">
          <thead>
            <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            </tr>
          </thead>
          <tbody id="calendar-body" ref="calendarBody" @click="fetchDate($event)">
          </tbody>
        </table>
        <div class="schedule--navigation--buttons">
          <button class="schedule--navigation--btn schedule--outline--primary" id="previous" @click="previous()">Previous</button>
          <button class="schedule--navigation--btn schedule--outline--primary" id="next" @click="next()">Next</button>
        </div>
        <br/>
        <form class="schedule--form--jump">
          <div class="schedule--lead">
            Jump To: 
          </div>
          <div>
            <label class="schedule--form--jump--item" for="month">
              <select v-model="month" name="month" id="month" ref="month" @change="jump()">
                <option :value="index" v-for="(month, index) in months" :key="index">{{month}}</option>
              </select>
            </label>
          </div>
          <div>
            <label class="schedule--form--jump--item" for="year">
              <select v-model="year" name="year" id="year" ref="year" @change="jump()">
                <option :value="year" v-for="year in years" :key="year">{{year}}</option>
              </select>
            </label>
          </div>
        </form>
      </div>
      <div class="schedule--color schedule--legends">
        <div class="schedule--color schedule--legend">
          <p class="schedule--color schedule--prev"></p>
          <p class="schedule--color schedule--label">Previous</p>
        </div>
        <div class="schedule--color schedule--legend">
          <p class="schedule--color schedule--current"></p>
          <p class="schedule--color schedule--label">Current</p>
        </div>
        <div class="schedule--color schedule--legend">
          <p class="schedule--color schedule--next"></p>
          <p class="schedule--color schedule--label">Next</p>
        </div>
      </div>
    </div>
    <div class="schedule--date">
      <div class="schedule--wrapper">
        <div class="schedule--block">
          <!-- <a class="schedule--arrow--btn schedule--left" href="#200" @click="previousDay"><span class="schedule--icon">&#10094;</span></a> -->
          <h2 class="schedule--day">{{scheduleDay}}</h2>
          <!-- <a class="schedule--arrow--btn schedule--right" href="#201" @click="nextDay"><span class="schedule--icon">&#10095;</span></a> -->
        </div>
        <p class="current--date">{{currentDate}}</p>
        <!-- <button type="button" class="schedule--event schedule--button" @click="viewEvent();">VIEW EVENT</button> -->
        <div class="event--wrapper">
          <div class="event--item" v-for="(task, i) in tasks" :key="i">{{ task.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { mapGetters } from "vuex";
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export default {
  name: "Events",
  props: ["events"],
  data() {
    return {
      d: new Date().toISOString().split("T")[0],
      today: new Date(),
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      currentDate: new Date().getDate(),
      currentDay: new Date().getDay(),
      startYear: new Date().getFullYear() - 30,
      endYear: new Date().getFullYear() + 10,
      years: [],
      year: new Date().getFullYear(),
      months: months,
      month: months[new Date().getMonth()],
      days: days,
      day: days[new Date().getDay()],
      tasks: [],
      show: false,
    };
  },
  // watch: {
  //   events() {
  //     this.forceUpdate();
  //     // if (!this.events.length) this.$forceUpdate();
  //   },
  // },
  computed: {
    // ...mapGetters(["events"]),
    scheduleDay() {
      var month =
        this.months.indexOf(this.month) !== -1
          ? this.months.indexOf(this.month)
          : this.month;
      var d = new Date(this.year, month, this.currentDate).getDay();
      return this.days[d];
    },
  },
  created() {
    // this.$store.dispatch("getEvents");
    for (var i = this.startYear; i <= this.endYear; i++) {
      this.years.push(i);
    }
  },
  mounted() {
    this.showCalendar(this.currentMonth, this.currentYear);
    this.viewEvent();
  },
  methods: {
    // forceUpdate() {
    //   this.$forceUpdate();
    // },
    fetchDate(event) {
      if (event.target.innerText === "") return;
      this.currentDate = parseInt(event.target.innerText);
      this.tasks = [];
      var d1 = new Date(this.year, this.month, this.currentDate);
      this.events.filter((event) => {
        var d2 = new Date(
          new Date(event.date).getFullYear(),
          new Date(event.date).getMonth(),
          new Date(event.date).getDate(),
          0,
          0,
          0
        );
        if (d1.getTime() == d2.getTime()) {
          this.tasks.push(event);
        }
      });
    },
    previousDay() {
      this.currentDate--;
    },
    nextDay() {
      this.currentDate++;
    },
    next() {
      this.currentYear =
        this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
      this.currentMonth = (this.currentMonth + 1) % 12;
      this.showCalendar(this.currentMonth, this.currentYear);
    },
    previous() {
      this.currentYear =
        this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
      this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
      this.showCalendar(this.currentMonth, this.currentYear);
    },
    jump() {
      this.currentYear = parseInt(this.year);
      this.currentMonth = parseInt(this.month);
      this.showCalendar(this.currentMonth, this.currentYear);
    },
    showCalendar(month, year) {
      let firstDay = new Date(year, month).getDay();
      // body of the calendar
      let tbl = this.$refs.calendarBody;
      // clearing all previous cells
      tbl.innerHTML = "";
      // filing data about month and in the page via DOM.
      let monthAndYear = this.$refs.monthAndYear;
      monthAndYear.innerHTML = this.months[month] + " " + year;
      this.year = year;
      this.month = month;
      // creating all cells
      let date = 1;
      for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");
        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            let cell = document.createElement("td");
            let cellText = document.createTextNode("");
            cell.appendChild(cellText);
            row.appendChild(cell);
          } else if (date > this.daysInMonth(month, year)) {
            break;
          } else {
            let cell = document.createElement("td");
            let cellText = document.createTextNode(date);
            this.events.forEach((event) => {
              if (
                date === new Date(event.date).getDate() &&
                year === new Date(event.date).getFullYear() &&
                month === new Date(event.date).getMonth() &&
                event.date < this.today.toISOString().split("T")[0]
              ) {
                cell.classList.add("schedule--previous--exam");
                return;
              }
              if (
                date === new Date(event.date).getDate() &&
                year === new Date(event.date).getFullYear() &&
                month === new Date(event.date).getMonth() &&
                event.date > this.today.toISOString().split("T")[0]
              ) {
                cell.classList.add("schedule--next--exam");
                return;
              }
            });
            if (
              date === this.today.getDate() &&
              year === this.today.getFullYear() &&
              month === this.today.getMonth()
            ) {
              cell.classList.add("schedule--current--exam");
            }
            // color today's date
            cell.appendChild(cellText);
            row.appendChild(cell);
            date++;
          }
        }
        // appending each row into calendar body.
        tbl.appendChild(row);
      }
    },
    // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
    daysInMonth(iMonth, iYear) {
      return 32 - new Date(iYear, iMonth, 32).getDate();
    },
    viewEvent() {
      this.tasks = [];
      var d1 = new Date(this.year, this.month, this.currentDate);
      this.events.filter((event) => {
        var d2 = new Date(
          new Date(event.date).getFullYear(),
          new Date(event.date).getMonth(),
          new Date(event.date).getDate(),
          0,
          0,
          0
        );
        if (d1.getTime() == d2.getTime()) {
          this.tasks.push(event);
        }
      });
    },
  },
};
</script>

<style >
header,
p,
ul,
li,
a,
h2,
h3 {
  -webkit-margin-before: 0;
  margin-block-start: 0;
  -webkit-margin-after: 0;
  margin-block-end: 0;
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.schedules {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 1rem 0;
  /* margin-top: 60px; */
}
.page--title {
  text-align: center;
  margin-bottom: 1rem;
}
.schedule--content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  width: 100%;
  min-height: 1px;
  margin-top: 3rem !important;
}
.schedule--card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.schedule--card--header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.schedule--card--header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}
.schedule--table {
  border-collapse: collapse;
}
.schedule--table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}
.schedule--table--bordered {
  border: 1px solid #dee2e6;
}
.schedule--table td,
.schedule--table th {
  padding: 0.5rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
.schedule--table--bordered td,
.schedule--table--bordered th {
  border: 1px solid #dee2e6;
}
.schedule--table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}
.schedule--table--bordered thead td,
.schedule--table--bordered thead th {
  border-bottom-width: 2px;
}
.schedule--calendar-body {
  text-align: center;
  min-height: 258px;
}
.schedule--navigation--buttons {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem 0;
}
.schedule--navigation--btn {
  width: 45%;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.schedule--navigation--btn:hover {
  background-color: rgb(23, 35, 51, 1);
  color: #fff;
}
.schedule--outline--primary {
  color: rgb(23, 35, 51, 1);
  background-color: transparent;
  background-image: none;
  border-color: rgb(23, 35, 51, 1);
}
.schedule--navigation--btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.schedule--form--jump {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}
.schedule--lead {
  font-size: 1.25rem;
  font-weight: 300;
}
.schedule--form--jump--item {
  margin-right: 0.5rem !important;
  margin-left: 0.5rem !important;
}
.schedule--current--exam {
  /* border: 5px solid #f7db04!important; */
  /* background-color:#f7db04!important; */
  outline: 5px solid #f7db04;
  outline-offset: -5px;
}
.schedule--next--exam {
  color: #fff;
  background-color: rgb(23, 35, 51, 1) !important;
}
.schedule--previous--exam {
  color: #000;
  background-color: rgb(23, 35, 51, 0.5) !important;
}
.schedule--color {
  width: 2.5rem;
  height: 0.7rem;
}
.schedule--color.schedule--legends {
  display: flex;
}
.schedule--color.schedule--legend {
  margin: 0.5rem;
  margin-right: 2rem;
}
.schedule--color.schedule--legend:first-child {
  margin-left: 0;
}
.schedule--color.schedule--prev {
  background-color: rgb(23, 35, 51, 0.5);
  margin: 0 auto;
}
.schedule--color.schedule--current {
  /* background-color: #f7db04; */
  border: 2px solid #f7db04;
  margin: 0 auto;
}
.schedule--color.schedule--next {
  background-color: rgb(23, 35, 51, 1);
  margin: 0 auto;
}
.schedule--color.schedule--label {
  color: #000000;
}
select {
  /* outline: 1; */
  border: 2px solid #e2e2e2;
}
/** schedule **/
.schedule--date {
  width: 100%;
  padding: 0.5rem;
  margin-top: 2rem;
}
.schedule--day {
  display: block;
  line-height: 60px;
  margin: 0;
  text-align: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.schedule--wrapper {
  min-height: 350px;
  background: rgb(23, 35, 51, 0.7);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.schedule--wrapper:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.schedule--wrapper .schedule--day {
  background: rgb(23, 35, 51, 1);
}
.schedule--wrapper .current--date {
  margin: 0;
  text-align: center;
  font-size: 146px;
}
.schedule--wrapper .event--wrapper {
  margin: 0;
  padding: 0.5rem;
  text-align: center;
}
.event--wrapper .event--item {
  color: #fff;
  margin: 0;
  padding: 0.5rem;
  text-align: left;
  text-decoration: underline;
}
.current--date,
.schedule--day {
  color: #fff;
}
.schedule--block {
  position: relative;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}
.schedule--arrow--btn {
  position: absolute;
  display: block;
  width: 60px;
  height: 60px;
  -webkit-transition: background 0.3s;
  transition: background 0.3s;
}
.schedule--arrow--btn:hover {
  text-decoration: none;
}
.schedule--arrow--btn.schedule--left {
  border-top-left-radius: 5px;
}
.schedule--arrow--btn.schedule--right {
  border-top-right-radius: 5px;
  right: 0;
  top: 0;
}
.schedule--event.schedule--button {
  background: rgb(23, 35, 51, 1);
  color: #fff;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}
.schedule--event.schedule--button:hover {
  background: rgb(23, 35, 51, 0.7);
  color: #fff;
  cursor: pointer;
}
.schedule--button {
  display: block;
  width: 175px;
  line-height: 50px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  margin: 0 auto;
  border-radius: 5px;
  -webkit-transition: background 0.3s;
  transition: background 0.3s;
}
.schedule--button:hover {
  text-decoration: none;
}

@media (min-width: 576px) {
  .schedule--date {
    max-width: 50%;
    margin: 2rem auto;
  }
  .schedule--content {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }
  .schedule--table td,
  .schedule--table th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  .schedule--form--jump label {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
  }
}
</style>