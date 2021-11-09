<template>
  <div class="hello">
    <h1>Pomodoro</h1>
    <section>
      <div class="timer">
        {{ isHour.toString().length === 1 ? "0" + isHour : isHour }}:{{
          isSec.toString().length === 1 ? "0" + isSec : isSec
        }}
      </div>
    </section>
    <section class="button-pomodoro">
      <button @click="handleStartCountdown">start</button>
      <button @click="handleStopCountdown">stop</button>
      <button @click="settingShow = !settingShow">Setting</button>
    </section>
    <section>
      <b-modal v-model="settingShow">
        <b-row>
          <b-col class="col-6">
            <label for="hourInput">Hour:</label>
         <b-form-input id="hourInput" v-model="defaultHour" type="number" :state="stateHour"  placeholder="Enter your name"></b-form-input>
        </b-col>
        <b-col class="col-6">
          <label for="secInput">Sec:</label>
          <b-form-input id="secInput" v-model="defaultSec" type="number" :state="stateSec"  placeholder="Enter your name"></b-form-input>
        </b-col>
        </b-row>
  
      </b-modal>
    </section>
    <section>
      <h2>Todolist</h2>
    </section>
    <section class="list">
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Pomodoro",
  data() {
    return {
      defaultTime: 0,
      defaultSec: 0,
      defaultHour: 0,
      settingShow: false,
      hour: 0,
      sec: 3,
      isCountdown: false,
    };
  },
  props: {
    msg: String,
  },

  computed: {
    stateSec(){
      return this.handleSettingTimer(this.defaultSec.length);
    },
    stateHour(){
      return this.handleSettingTimer(this.defaultHour.length);
    },
    isSec() {
      return this.sec;
    },
    isHour() {
      return this.hour;
    },
  },
  created() {
    this.initialPage();
  },
  methods: {
    initialPage() {},
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
    handleSettingTimer(time){
      return (time > 0 && time <= 2 ? true : false)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
section button {
  background: none;
  color: #ffa260;
  border: 2px solid;
  padding: 1em 2em;
  font-size: 1em;
  transition: color 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

section button:hover {
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
</style>
