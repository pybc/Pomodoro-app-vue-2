<template>
  <div class="main">
    <h1>Pomodoro</h1>
    <section class="timer container">
      <div v-if="mode === 'POMODORO'">
        {{ isPoromodoMin }}:{{ isPoromodoSec }}
      </div>
      <div v-else-if="mode === 'SHORT_BREAK'">
        {{ isShortBreakMin }}:{{ isShortBreakSec }}
      </div>
      <div v-else-if="mode === 'LONG_BREAK'">
        {{ isLongBreakMin }}:{{ isLongBreakSec }}
      </div>
      <button id="nextMin" @click="handleNextMin">></button>
    </section>
    <section class="button-pomodoro">
      <button @click="handleStartCountdown">start</button>
      <button @click="handleStopCountdown">stop</button>
      <button @click="settingShow = !settingShow">Setting</button>
    </section>
    <section>
      <b-modal v-model="settingShow" hide-footer class="px-1">
        <b-row>
          <b-col class="col-4">
            <label for="minInput">Pomodoro</label>
            <b-form-input
              id="minInput"
              v-model="setter.pomodoroMin"
              type="number"
              @keypress="handleSettingMin($event, setter.pomodoroMin)"
            ></b-form-input>
          </b-col>
          <b-col class="col-4">
            <label for="secInput">Short Break</label>
            <b-form-input
              id="secInput"
              v-model="setter.shortBreakMin"
              type="number"
              @keypress="handleSettingMin($event, setter.shortBreakMin)"
            ></b-form-input>
          </b-col>
          <b-col class="col-4">
            <label for="secInput">Long Break</label>
            <b-form-input
              id="secInput"
              v-model="setter.longBreakMin"
              type="number"
              @keypress="handleSettingMin($event, setter.longBreakMin)"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-center">
            <button @click="setTime">ok</button>
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
        :index="data.index"
        @onDelete="onDelete"
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
        pomodoroMin: 0,
        shortBreakMin: 0,
        longBreakMin: 0,
      },
      settingShow: false,
      pomodoro: {
        min: 0,
        sec: 1,
      },
      shortBreak: {
        min: 0,
        sec: 2,
      },
      longBreak: {
        min: 0,
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
    isPoromodoMin() {
      return this.displayTimeFormat(this.pomodoro.min);
    },
    isPoromodoSec() {
      return this.displayTimeFormat(this.pomodoro.sec);
    },
    isShortBreakMin() {
      return this.displayTimeFormat(this.shortBreak.min);
    },
    isShortBreakSec() {
      return this.displayTimeFormat(this.shortBreak.sec);
    },
    isLongBreakMin() {
      return this.displayTimeFormat(this.longBreak.min);
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
      if (!this.isCountdown) {
        this.isCountdown = true;
        while (this.pomodoro.sec > 0 && this.isCountdown) {
          this.pomodoro.sec--;
          console.log(this.pomodoro.sec, "sec");
          console.log("this.isCountdown", this.isCountdown);
          await this.sleep(1000);
        }
        if (this.pomodoro.min > 0 && this.pomodoro.sec === 0) {
          this.pomodoro.min--;
          this.pomodoro.sec = 59;
          this.handleStartCountdown();
        }
        this.handleStopCountdown();
      }
    },
    handleStopCountdown() {
      this.isCountdown = false;
    },
    sleep(ms) {
      return new Promise((result) => setTimeout(result, ms));
    },
    showModalSetting() {
      this.setter.pomodoroMin = 0;
      this.setter.shortBreakMin = 0;
      this.setter.longBreakMin = 0;

      console.log(this.settingShow, "this.settingShow");
      this.settingShow != this.settingShow;
    },
    handleSettingMin(event, time) {
      if (!REGEX_NUMBER.test(time)) {
        console.log("time:", time);
        this.mode === "POMODORO"
          ? (this.pomodoro.min = time)
          : this.mode === "SHORT_BREAK"
          ? (this.shortBreak.min = time)
          : (this.longBreak.min = time);
        return event.preventDefault();
      }
    },
    setTime() {
      this.pomodoro.min = this.setter.pomodoroMin || 0;
      this.shortBreak.min = this.setter.shortBreakMin || 0;
      this.longBreak.min = this.setter.longBreakMin || 0;
    },

    displayTimeFormat(time) {
      return time.toString().length === 1 ? "0" + time : time;
    },
    onCard(value) {
      this.text = value;
    },
    onDelete(index) {
      this.dataCard.splice(index, 1);
    },
    handleNextMin() {
      this.mode === "POMODORO"
        ? this.pomodoro.min++
        : this.mode === "SHORT_BREAK"
        ? this.shortBreak.min++
        : this.longBreak.min++;
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
#btnNextMin {
  height: 1em;
}
</style>
