<template>
    <RouterView />
    <header>   
      <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
        <div class="wrapper">
        <!-- <HelloWorld msg="You did it!" /> -->
          <div>EzStudy</div>
            <nav class="title">
             <router-link :to="{ name:'student-route' }">Student</router-link>
             <router-link :to="{ name:'classroom-route'}">Classroom</router-link>
            </nav>
        </div>
      
    </header>
</template>
<style scoped>
header {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: grid; /* Sử dụng flexbox */
  justify-content: flex-start; /* Căn trái header */
  align-items: center; /* Căn theo chiều dọc */
}
.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #5a4653; /* Màu nền header */
    color: white; /* Màu chữ */
    border-radius: 10px;
}

.wrapper > div {
    font-size: 24px;
    font-weight: bold;
}

nav.title {
    display: flex;
}

nav.title > router-link {
    margin-right: 10px;
    color: #248d5c; /* Màu chữ của các liên kết */
    text-decoration: none;
    font-size: 18px; /* Kích thước chữ */
    font-weight: bold; /* Độ đậm của chữ */
    font-family: Arial, sans-serif; /* Kiểu font chữ */
}

nav.title > router-link:hover {
    text-decoration: underline;
    border: #248d5c;
    border-radius: 10px;
}

</style>
  
