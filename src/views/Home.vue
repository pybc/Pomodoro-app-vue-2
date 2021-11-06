<template>
  <div class="home">
    <Pomodoro msg="Pomodoro" />
  </div>
</template>

<script>
// @ is an alias to /src
import Pomodoro from "@/components/Pomodoro.vue";

export default {
  name: "Home",
  components: {
    Pomodoro,
  },
};
</script>
<style scoped>
.home{
    background-color:#151b29;
    height: 100%;
}
</style>
