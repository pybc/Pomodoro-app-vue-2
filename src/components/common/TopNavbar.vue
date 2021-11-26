<template>
  <b-container :style="{ background }" fluid>
    <b-row class="align-items-center">
      <b-col class="col-10 titleBar">Pomodoro App</b-col>
      <b-col class="col-2">
        <div class="align-items-center">
          <span class="d-none d-md-inline titleBar">Setting</span>
          <span><ph-faders-horizontal :size="32" style="color: white" /></span>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { PhFadersHorizontal } from "phosphor-vue";
export default {
  name: "TopNavbar",
  components: {
    PhFadersHorizontal,
  },
  props: ["background"],
};
</script>

<style>
.titleBar {
  color: white;
}
</style>
