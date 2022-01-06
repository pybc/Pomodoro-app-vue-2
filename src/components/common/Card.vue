<template>
  <section id="text" class="d-flex flex-row">
    <span>{{ est }}</span>
    <span v-if="isEdit === true">
      <input v-model="textCard" type="text" />
    </span>
    <span v-else>
      {{ textCard }}
    </span>
    <section class="buttonCard">
      <span v-if="isEdit === false">
        <span
          ><button id="addButton" @click="handleAddEstButton">
            <ph-plus :size="20" class="iconCard" /></button
        ></span>
        <span
          ><button id="editButton" @click="handleEditButton">
            <ph-note-pencil :size="20" class="iconCard" /></button
        ></span>
        <span
          ><button id="deleteButton" @click="handleDeleteButton">
            <ph-trash :size="20" class="iconCard" /></button
        ></span>
      </span>
      <span v-else>
        <span
          ><button id="confirmButton" @click="handleEditButton">
            <ph-check :size="20" class="iconCard" /></button
        ></span>
      </span>
    </section>
  </section>
</template>
<script>
import { PhTrash, PhNotePencil, PhPlus, PhCheck } from "phosphor-vue";
export default {
  name: "Card",
  data() {
    return {
      isEdit: false,
      textCard: "",
      est: "",
    };
  },
  components: {
    PhTrash,
    PhNotePencil,
    PhPlus,
    PhCheck,
  },
  props: ["text", "uid"],
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.textCard = this.text;
    },
    handleAddEstButton() {
      this.$emit("onAddEst", this.uid);
    },
    handleDeleteButton() {
      this.$emit("onDelete", this.uid);
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
  /* background: white; */
  min-width: 100%;
  min-height: 4em;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  background-color: whitesmoke;
  box-shadow: 0px 0.5px;
  margin: 5px 0px 5px 0px;

}

.buttonCard button {
  border: none;
  border-radius: 4px 4px 4px 4px;
  margin-left: 2px;
  margin-right: 2px;
}
#addButton {
  background-color: #42ff00;
}
#editButton {
  background-color: #ff9900;
}
#confirmButton {
  background-color: #42ff00;
}
#deleteButton {
  background-color: #ff0000;
}
.iconCard {
  color: white;
}
</style>
