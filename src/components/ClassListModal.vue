<template>
    <div class="modal" v-if="showModal">
      <div class="modal-content class-list-modal">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ modalTitle }}</h2>
        <ul>
          <li v-for="(classItem, index) in classList" :key="index">
            <button @click="selectClass(classItem)">{{ classItem }}</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: Boolean,
      modalTitle: String,
      classList: Array
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      selectClass(selectedClass) {
        this.$emit('select', selectedClass);
        this.closeModal();
      }
    }
  }
  </script>
  
  <style scoped>
  /* CSS cho Class List Modal */
  @import '/popupstyle.css';
  </style>
  