<template>
  <div class="pomodoroApp">
    <top-navbar
      :background="[
        this.mode === 'POMODORO'
          ? '#ff4848'
          : mode === 'SHORT_BREAK'
          ? '#ffcc48'
          : '#40e080',
      ]"
      :isOpen="isSettingModal"
      @onSettingButton="showModalSetting"
    ></top-navbar>
    <div
      :class="[
        this.mode === 'POMODORO'
          ? 'main background p'
          : mode === 'SHORT_BREAK'
          ? 'main background s'
          : 'main background l',
      ]"
    >
      <section class="timer">
        <span v-if="mode === 'POMODORO'">
          {{ isPoromodoMin }}:{{ isPoromodoSec }}
        </span>
        <span v-else-if="mode === 'SHORT_BREAK'">
          {{ isShortBreakMin }}:{{ isShortBreakSec }}
        </span>
        <span v-else-if="mode === 'LONG_BREAK'">
          {{ isLongBreakMin }}:{{ isLongBreakSec }}
        </span>
      </section>

      <section>
        <button
          v-if="
            isCountdownPomodoro === true ||
            isCountdownShortBreak === true ||
            isCountdownLongBreak === true
          "
          class="button-pause"
          @click="handleStopCountdown"
        >
          stop
        </button>
        <button v-else @click="handleStartCountdown" class="button-start">
          start
        </button>
        <button @click="handleNext" class="button-stop">Done</button>
      </section>
      <section>
        <b-modal v-model="isSettingModal" hide-footer class="px-1">
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
            <b-col class="col-6">
              <label for="secInput">Long Break</label>
              <b-form-input
                id="secInput"
                v-model="delay.longBreak"
                type="number"
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
        <h4>in progress</h4>
        <card
          v-for="data in cardData"
          :key="data.uid"
          :text="data.text"
          :uid="data.uid"
          @onDelete="onDelete"
          @onClick="onCard"
          @onAddEst="onAddEst"
        ></card>
        <card-input @onAddCard="handleAddCard"> </card-input>
      </section>
    </div>
  </div>
</template>

<script>
const REGEX_NUMBER = /^[0-9]*$/;
import Card from "@/components/common/Card.vue";
import CardInput from "@/components/common/CardInput.vue";
import TopNavbar from "@/components/common/TopNavbar.vue";
import Config from '@/config'
import { uuid } from "vue-uuid";

export default {
  name: "Pomodoro",
  components: {
    Card,
    CardInput,
    TopNavbar,
  },
  data() {
    return {
      setter: {
        pomodoroMin: 0,
        shortBreakMin: 0,
        longBreakMin: 0,
      },
      isSettingModal: false,
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
      isCountdownPomodoro: false,
      isCountdownShortBreak: false,
      isCountdownLongBreak: false,
      mode: "POMODORO",
      text: "",
      cardData: [],
      delay: {
        longBreak: 1,
      },
      isAutoStartPomodoro: false,
      isAutoStartBreak: false,
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
  async created() {
    await this.initialPage();
  },
  methods: {
    async initialPage() {
      if(Config.devTest){
        console.log('Config.devTest', Config.devTest);
        console.log('Config.line.liff.index', Config.line.liff.index);
        console.log('process.env.LIFF_INDEX',process.env.LIFF_INDEX);
        // await lineUtil.init(Config.line.liff.index)
      }
    },
    async handleStartCountdown() {
      if (this.mode === "POMODORO") {
        if (!this.isCountdownPomodoro) {
          this.isCountdownPomodoro = true;
          while (this.pomodoro.min >= 0 && this.isCountdownPomodoro) {
            while (this.pomodoro.sec > 0 && this.isCountdownPomodoro) {
              this.pomodoro.sec--;
              console.log(this.pomodoro.sec, "sec");
              console.log("this.isCountdownPomodoro", this.isCountdownPomodoro);
              await this.sleep(1000);
            }
            if (this.pomodoro.min > 0 && this.isCountdownPomodoro) {
              this.pomodoro.min--;
              this.pomodoro.sec = 60;
            } else {
              this.handleStopCountdown();
              if (this.cardData.length > 0) {
                // handle when end 1 est
                this.cardData.splice(0, 1);
                this.pomodoro.min = this.setter.pomodoroMin;
                this.pomodoro.sec = 0;
                this.delay.longBreak--;
              }
              if (this.delay.longBreak === 0 && this.isAutoStartPomodoro) {
                this.mode = "LONG_BREAK";
              }
            }
          }
        }
      } else if (this.mode === "SHORT_BREAK") {
        if (!this.isCountdownShortBreak) {
          this.isCountdownShortBreak = true;
          while (this.shortBreak.min >= 0 && this.isCountdownShortBreak) {
            while (this.shortBreak.sec > 0 && this.isCountdownShortBreak) {
              this.shortBreak.sec--;
              console.log(this.shortBreak.sec, "sec");
              console.log(
                "this.isCountdownShortBreak",
                this.isCountdownShortBreak
              );
              await this.sleep(1000);
            }
            if (this.shortBreak.min > 0 && this.isCountdownShortBreak) {
              this.shortBreak.min--;
              this.shortBreak.sec = 60;
            } else {
              this.handleStopCountdown();
            }
          }
        }
      } else if (this.mode === "LONG_BREAK") {
        if (!this.isCountdownLongBreak) {
          this.isCountdownLongBreak = true;
          while (this.longBreak.min >= 0 && this.isCountdownLongBreak) {
            while (this.longBreak.sec > 0 && this.isCountdownLongBreak) {
              this.longBreak.sec--;
              console.log(this.longBreak.sec, "sec");
              console.log(
                "this.isCountdownLongBreak",
                this.isCountdownLongBreak
              );
              await this.sleep(1000);
            }
            if (this.longBreak.min > 0 && this.isCountdownLongBreak) {
              this.longBreak.min--;
              this.longBreak.sec = 60;
            } else {
              this.handleStopCountdown();
            }
          }
        }
      }
    },
    handleStopCountdown() {
      if (this.mode === "POMODORO") {
        this.isCountdownPomodoro = false;
      } else if (this.mode === "SHORT_BREAK") {
        this.isCountdownShortBreak = false;
      } else if (this.mode === "LONG_BREAK") {
        this.isCountdownLongBreak = false;
      }
    },
    sleep(ms) {
      return new Promise((result) => setTimeout(result, ms));
    },
    showModalSetting(isOpen) {
      this.setter.pomodoroMin = 0;
      this.setter.shortBreakMin = 0;
      this.setter.longBreakMin = 0;

      console.log(this.isSettingModal, "this.settingShow");
      this.isSettingModal = isOpen;
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
      this.pomodoro.sec = 0;
      this.isSettingModal = false;
    },

    displayTimeFormat(time) {
      return time.toString().length === 1 ? "0" + time : time;
    },
    onCard(value) {
      this.text = value;
    },
    onDelete(uid) {
      const newCardData = this.cardData.filter((data) => {
        return data.uid !== uid;
      });
      this.cardData = newCardData;
    },
    onAddEst(est) {
      console.log(est);
    },
    handleAddCard(text) {
      const newUid = uuid.v1();
      this.cardData.push({
        uid: newUid,
        text: text,
      });

      console.log("text", this.text);
    },
    handleNext() {
      this.handleStopCountdown();
      this.mode =
        this.mode === "POMODORO"
          ? "SHORT_BREAK"
          : this.mode === "SHORT_BREAK"
          ? "LONG_BREAK"
          : "POMODORO";
      console.log("this.mode", this.mode);
    },
  },
};
</script>
coped" attribute to limit CSS to this component only -->
<style scoped>
.pomodoroApp {
  margin: 0 auto;
  max-width: 50%;
}
.main {
  font-family: "Poppins", "roboto", "kanit";
}
.main.background.p {
  background: #ff4848;
}
.main.background.s {
  background: #ffcc48;
}
.main.background.l {
  background: #40e080;
}
.list h4 {
  text-align: left;
}
h1 {
  text-align: center;
  color: white;
}
.timer {
  color: white;
  font-size: 80px;
  font-weight: bold;
  background-color: #ffffff20;
  display: flex;
  margin: 0 auto;
  max-width: 30rem;
}
section {
  display: flex;
  justify-content: space-evenly;
}

.button-start {
  font-size: 1.1em;
  font-weight: bold;
  background-color: #42ee54;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5em 2em;
}
.button-pause {
  font-size: 1.1em;
  font-weight: bold;
  background-color: #ff9900;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5em 2em;
}
.button-stop {
  font-size: 1.1em;
  font-weight: bold;
  background-color: #494040;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5em 2em;
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
  background-color: transparent;
  border: none;
  color: white;
  margin-left: 0.2em;
  margin-right: 0.2em;
}

@media only screen and (max-width: 1024px) {
  .pomodoroApp {
    max-width: 100%;
  }
}
</style>
