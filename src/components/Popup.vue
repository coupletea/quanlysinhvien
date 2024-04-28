<template>
    <div class="popup">
      <div class="popup-inner">
        <!-- Nội dung của popup -->
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Popup',
  };
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Màu nền */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-inner {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  </style>
  