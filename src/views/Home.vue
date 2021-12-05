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
   async created() {
    await this.fetchData()
  },
  methods: {
    fetchData() {
      this.initialData()
    },
     async initialData() {
       liff
  .init({
    liffId: "123456-abcedfg" // Use own liffId
  })
  .then(() => {
    // Start to use liff's api
  })
  .catch((err) => {
    // Error happens during initialization
    console.log(err.code, err.message);
  });
    },
  }
};
</script>
<style scoped>

</style>
