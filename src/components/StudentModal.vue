<template>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ modalTitle }}</h2>
        <div>
          <label for="name">Họ và Tên:</label>
          <input type="text" v-model="formData.name" id="name">
        </div>
        <div>
          <label for="age">Tuổi:</label>
          <input type="number" v-model="formData.age" id="age">
        </div>
        <div>
          <label for="class">Lớp:</label>
          <input type="text" v-model="formData.class" id="class">
        </div>
        <button @click="saveData">Lưu</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: Boolean,
      modalTitle: String,
      formData: Object
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      saveData() {
        this.$emit('save', this.formData);
        this.closeModal();
      }
    }
  }
  </script>
  
  <style scoped>
  /* CSS cho Modal của sinh viên */
  @import '/popupstyle.css';
 
  </style>
  