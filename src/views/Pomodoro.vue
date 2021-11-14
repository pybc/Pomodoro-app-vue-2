<template>
  <div class="main">
    <h1>Pomodoro</h1>
    <section class="timer container">
      <div v-if="mode === 'POMODORO'">
        {{ isPoromodoHour }}:{{ isPoromodoSec }}
      </div>
      <div v-else-if="mode === 'SHORT_BREAK'">
        {{ isShortBreakHour }}:{{ isShortBreakSec }}
      </div>
      <div v-else-if="mode === 'LONG_BREAK'">
        {{ isLongBreakHour }}:{{ isLongBreakSec }}
      </div>
      <button id="nextHour" @click="handleNextHour">></button>
    </section>
    <section class="button-pomodoro">
      <button @click="handleStartCountdown">start</button>
      <button @click="handleStopCountdown">stop</button>
      <button @click="settingShow = !settingShow">Setting</button>
    </section>
    <section>
      <b-modal v-model="settingShow" @ok="setTime">
        <b-row>
          <b-col class="col-4">
            <label for="hourInput">Pomodoro</label>
            <b-form-input
              id="hourInput"
              v-model="setter.pomodoroHour"
              type="number"
              @keypress="handleSettingHour($event, setter.pomodoroHour)"
            ></b-form-input>
          </b-col>
          <b-col class="col-4">
            <label for="secInput">Short Break</label>
            <b-form-input
              id="secInput"
              v-model="setter.shortBreakHour"
              type="number"
              @keypress="handleSettingHour($event, setter.shortBreakHour)"
            ></b-form-input>
          </b-col>
          <b-col class="col-4">
            <label for="secInput">Long Break</label>
            <b-form-input
              id="secInput"
              v-model="setter.longBreakHour"
              type="number"
              @keypress="handleSettingHour($event, setter.longBreakHour)"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-modal>
    </section>
    <section>
      <h2>Todolist</h2>
    </section>
    <section class="list">
      <card
        v-for="data in dataCard"
        :key="data.index"
        :text="data.text"
        @onClick="onCard"
      ></card>
    </section>
  </div>
</template>

<script>
const REGEX_NUMBER = /^[0-9]*$/;
import Card from "@/components/common/Card.vue";
export default {
  name: "Pomodoro",
  components: {
    Card,
  },
  data() {
    return {
      setter: {
        pomodoroHour: 0,
        pomodoroSec: 0,
        shortBreakHour: 0,
        shortBreakSec: 0,
        longBreakHour: 0,
        longBreakSec: 0,
      },
      settingShow: false,
      pomodoro: {
        hour: 0,
        sec: 1,
      },
      shortBreak: {
        hour: 0,
        sec: 2,
      },
      longBreak: {
        hour: 0,
        sec: 3,
      },
      isCountdown: false,
      mode: "POMODORO",
      text: "asdasd",
      dataCard: [],
    };
  },
  props: {
    msg: String,
  },

  computed: {
    isPoromodoHour() {
      return this.displayTimeFormat(this.pomodoro.hour);
    },
    isPoromodoSec() {
      return this.displayTimeFormat(this.pomodoro.sec);
    },
    isShortBreakHour() {
      return this.displayTimeFormat(this.shortBreak.hour);
    },
    isShortBreakSec() {
      return this.displayTimeFormat(this.shortBreak.sec);
    },
    isLongBreakHour() {
      return this.displayTimeFormat(this.longBreak.hour);
    },
    isLongBreakSec() {
      return this.displayTimeFormat(this.longBreak.sec);
    },
  },
  created() {
    this.initialPage();
  },
  methods: {
    initialPage() {
      for (let index = 0; index < 6; index++) {
        this.dataCard.push({
          index: index,
          text: "awdawdss",
        });
        console.log(this.dataCard[index], "this.dataCard[index]");
      }
    },
    async handleStartCountdown() {
      this.isCountdown = true;
      while (this.sec > 0 && this.isCountdown) {
        this.sec--;
        console.log(this.sec, "sec");
        console.log("this.isCountdown", this.isCountdown);
        await this.sleep(1000);
      }
      if (this.hour > 0 && this.sec === 0) {
        this.hour--;
        this.sec = 60;
        this.handleStartCountdown();
      }
      this.handleStopCountdown();
    },
    handleStopCountdown() {
      this.isCountdown = false;
    },
    sleep(ms) {
      return new Promise((result) => setTimeout(result, ms));
    },
    showModalSetting() {
      console.log(this.settingShow, "this.settingShow");
      this.settingShow != this.settingShow;
    },
    handleSettingHour(event, time) {
      if (!REGEX_NUMBER.test(time)) {
        return event.preventDefault();
      }
    },
    setTime() {
      this.poromodo.hour = this.setter.pomodoroHour;
      this.poromodo.sec = this.setter.pomodoroSec;
      this.shortBreak.hour = this.setter.shortBreakHour;
      this.shortBreak.sec = this.setter.shortBreakSec;
      this.longBreak.hour = this.setter.longBreakHour;
      this.longBreak.sec = this.setter.longBreakSec;
    },

    displayTimeFormat(time) {
      return time.toString().length === 1 ? "0" + time : time;
    },
    onCard(value) {
      this.text = value;
    },
    handleNextHour() {
      this.mode === "POMODORO"
        ? this.pomodoro.hour++
        : this.mode === "SHORT_BREAK"
        ? this.shortBreak.hour++
        : this.longBreak.hour++;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  background: black;
}

h1 {
  text-align: center;
  color: white;
}
.timer {
  color: white;
  font-size: 6em;
}

section {
  display: flex;
  justify-content: space-evenly;
}
.button-pomodoro button {
  background: none;
  color: #ffa260;
  border: 2px solid;
  padding: 1em 2em;
  font-size: 1em;
  transition: color 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.button-pomodoro button:hover {
  border-color: #f1ff5c;
  color: white;
  box-shadow: 0 0.5em 0.5em -0.4em #f1ff5c;
  transform: translateY(-0.25em);
  cursor: pointer;
}
.list {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.list div {
  border: 2px solid orange;
  padding: 3em 20em;
  margin: 0 auto;
}
.list input {
  width: 20em;
}
#btnNextHour {
  height: 1em;
}
</style>
