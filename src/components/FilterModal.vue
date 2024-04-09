<template>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ modalTitle }}</h2>
        <!-- Input để lọc theo tên -->
        <div>
          <label for="filterName">Tìm theo tên:</label>
          <input type="text" v-model="filterData.name" id="filterName">
        </div>
        <!-- Input để lọc theo tuổi -->
        <div>
          <label for="filterAge">Tìm theo tuổi:</label>
          <input type="number" v-model="filterData.age" id="filterAge">
        </div>
        <!-- Input để lọc theo lớp -->
        <div>
          <label for="filterClass">Tìm theo lớp:</label>
          <input type="text" v-model="filterData.class" id="filterClass">
        </div>
        <!-- Nút áp dụng để áp dụng bộ lọc -->
        <button @click="applyFilters">Áp dụng</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: Boolean,
      modalTitle: String,
      filterData: Object
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      applyFilters() {
        this.$emit('apply', this.filterData);
        this.closeModal();
      }
    }
  }
  </script>
  
  <style scoped>
  /* CSS cho Filter Modal */
  @import '/popupstyle.css';
  </style>
  