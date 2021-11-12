<template>
  <div class="home">
    <Pomodoro msg="Pomodoro" />
  </div>
</template>

<script>
// @ is an alias to /src
import Pomodoro from "@/components/common/Pomodoro.vue";

export default {
  name: "Home",
  components: {
    Pomodoro,
  },
};
</script>
<style scoped>

</style>
