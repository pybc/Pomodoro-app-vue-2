<template>
  <section id="text" class="d-flex flex-row">
    <span>
      <input @keyup.enter="handleAddButton" v-model="textCard" type="text" />
    </span>
    <span><button @click="handleAddButton">Add</button></span>
  </section>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      textCard: "",
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.textCard = this.text;
    },
    handleAddButton() {
      this.$emit("onAddCard", this.textCard);
      this.textCard = "";
    },
  },
};
</script>

<style scoped>
#text {
  font-size: 22px;
}
section #text {
  background: whi;
  min-width: 100%;
  min-height: 5em;
  align-items: center;
  text-align: center;
  border-radius: 20px;
}
</style>
