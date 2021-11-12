<template>
  <section id="text" class="d-flex flex-row">
    <span v-if="isEdit === true">
      <input v-model="textCard" type="text" />
    </span>
    <span v-else>
        {{textCard}}
    </span>
    <span><button @click="handleEditButton">edit</button></span>
  </section>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      isEdit: false,
      textCard: "",
      value: "",
    };
  },
  props: ["text"],
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.textCard = this.text
    },
    handleEditButton() {
      this.$emit("onClick", this.textCard);
      this.isEdit = !this.isEdit;
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
