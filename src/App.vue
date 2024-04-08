<template>
  <div>
    <div><h1>Danh Sách Sinh Viên</h1></div>
    <!-- Nút Thêm sinh viên -->
    <button @click="showAddStudentModal">Thêm sinh viên</button>
    <button @click="showClassListModal">Chuyển lớp</button>
    <button @click="showAddClassModal">Thêm lớp</button>
    <button @click="openFilterModal">Hiển thị bộ lọc</button>
    
    <!-- Bảng danh sách sinh viên -->
    <table>
      <!-- Header -->
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ và Tên</th>
          <th>Tuổi</th>
          <th>Lớp</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <!-- Dữ liệu sinh viên -->
      <tbody>
        <tr v-for="(student, index) in students" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>{{ student.class }}</td>
          <td>
            <button @click="editStudent(index)">Sửa</button>
            <button @click="deleteStudent(index)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal Popup danh sách lọc -->
    <div class="modal" v-if="isFilterModalVisible">
      <div class="modal-content">
        <span class="close" @click="isFilterModalVisible = false">&times;</span>
          <h2>Bộ lọc</h2>
          <!-- Input để lọc theo tên -->
        <div>
        <label for="filterName">Tìm theo tên:</label>
         <input type="text" v-model="filterName" id="filterName">
      </div>
    <!-- Input để lọc theo tuổi -->
      <div>
       <label for="filterAge">Tìm theo tuổi:</label>
       <input type="number" v-model="filterAge" id="filterAge">
      </div>
    <!-- Input để lọc theo lớp -->
      <div>
       <label for="filterClass">Tìm theo lớp:</label>
       <input type="text" v-model="filterClass" id="filterClass">
      </div>
    <!-- Nút áp dụng để áp dụng bộ lọc -->
       <button @click="applyFilters">Áp dụng</button>
       
      </div>
    </div>
    <div class="modal" v-if="filteredStudentsModalVisible">
      <div class="modal-content">
        <span class="close" @click="closeFilteredStudentsModal">&times;</span>
        <h2>Danh sách sinh viên lọc</h2>
        <table>
          <!-- Header -->
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và Tên</th>
              <th>Tuổi</th>
              <th>Lớp</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <!-- Dữ liệu sinh viên -->
          <tbody>
            <tr v-for="(student, index) in filteredStudents" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.age }}</td>
              <td>{{ student.class }}</td>
              <td>
                <button @click="editStudent(index)">Sửa</button>
                <button @click="deleteStudent(index)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Popup Thêm Sinh Viên -->
    <div class="modal" v-if="showAddModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Thêm sinh viên</h2>
        <div>
          <label for="name">Họ và Tên:</label>
          <input type="text" v-model="newStudent.name" id="name">
        </div>
        <div>
          <label for="age">Tuổi:</label>
          <input type="number" v-model="newStudent.age" id="age">
        </div>
        <div>
          <label for="class">Lớp:</label>
          <input type="text" v-model="newStudent.class" id="class">
        </div>
        <button @click="addStudent">Lưu</button>
      </div>
    </div>

    <!-- Popup Sửa Sinh Viên -->
    <div class="modal" v-if="showEditModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Sửa sinh viên</h2>
        <div>
          <label for="editName">Họ và Tên:</label>
          <input type="text" v-model="editStudentData.name" id="editName">
        </div>
        <div>
          <label for="editAge">Tuổi:</label>
          <input type="number" v-model="editStudentData.age" id="editAge">
        </div>
        <div>
          <label for="editClass">Lớp:</label>
          <input type="text" v-model="editStudentData.class" id="editClass">
        </div>
        <button @click="saveEditedStudent">Lưu</button>
      </div>
    </div>
    <!-- Popup Danh Sách Lớp -->
   <div class="modal" v-if="showClassListModal">
     <div class="modal-content class-list-modal">
       <span class="close" @click="closeClassListModal">&times;</span>
       <h2>Danh sách lớp</h2>
       <ul>
         <li v-for="(classItem, index) in classList" :key="index">
           <button @click="showClassStudents(classItem)">{{ classItem }}</button>
         </li>
       </ul>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Dữ liệu mẫu
      students: [
        { name: 'Nguyễn Văn A', age: 18, class: '12A' },
        { name: 'Trần Thị B', age: 17, class: '11B' },
        { name: 'Phạm Văn C', age: 19, class: '12C' },
        { name: 'Nguyễn Văn D', age: 17, class: '12A' },
        { name: 'Trần Thị E', age: 17, class: '12A' },
        { name: 'Phạm Văn C', age: 19, class: '12C' },
      ],
      // Dữ liệu cho popup thêm sinh viên
      newStudent: {
        name: '',
        age: '',
        class: ''
      },
      // Dữ liệu cho popup sửa sinh viên
      editStudentData: {
        name: '',
        age: '',
        class: ''
      },
      filterName: '',
      filterAge: '',
      filterClass: '',
      // Trạng thái hiển thị của popup
      showAddModal: false,
      showEditModal: false,
      // Chỉ số của sinh viên được sửa
      isFilterModalVisible: false,
      filteredStudentsModalVisible: false,
      
    };
  },
  
  methods: {
    // Hiển thị popup thêm sinh viên
    showAddStudentModal() {
      this.showAddModal = true;
    },
    // Thêm sinh viên vào danh sách
    addStudent() {
      this.students.push({ ...this.newStudent });
      this.resetNewStudent();
      this.showAddModal = false;
    },
    // Hiển thị popup sửa sinh viên
    editStudent(index) {
      this.showEditModal = true;
      this.editIndex = index;
      this.editStudentData = { ...this.students[index] };
    },
    // Lưu thông tin sinh viên sau khi chỉnh sửa
    saveEditedStudent() {
      this.students[this.editIndex] = { ...this.editStudentData };
      this.showEditModal = false;
    },
    // Xóa sinh viên khỏi danh sách
    deleteStudent(index) {
      this.students.splice(index, 1);
    },
    // Đóng popup
    closeModal() {
      this.showAddModal = false;
      this.showEditModal = false;
    },
    // Đặt lại dữ liệu của sinh viên mới
    resetNewStudent() {
      this.newStudent.name = '';
      this.newStudent.age = '';
      this.newStudent.class = '';
    },
    openFilterModal() {
      this.isFilterModalVisible = true;
    },
    // Đóng modal popup danh sách lọc
    closeFilterModal() {
      this.isFilterModalVisible = false;
    },
    // Áp dụng bộ lọc và đóng modal popup danh sách lọc
    applyFilters() {
      this.$nextTick(() => {
        this.isFilterModalVisible = false;
        this.filteredStudentsModalVisible = true;
      });
    },
    closeFilteredStudentsModal() {
      this.filteredStudentsModalVisible = false;
    }
    
 },
  computed: {
  filteredStudents() {
    return this.students.filter(student => {
      // Lọc theo tên (nếu có)
      if (this.filterName && student.name.toLowerCase().indexOf(this.filterName.toLowerCase()) === -1) {
        return false;
      }
      // Lọc theo tuổi (nếu có)
      if (this.filterAge && student.age.toString().indexOf(this.filterAge) === -1) {
        return false;
      }
      // Lọc theo lớp (nếu có)
      if (this.filterClass && student.class.toLowerCase().indexOf(this.filterClass.toLowerCase()) === -1) {
        return false;
      }
      return true;
    });
  }
}

};
</script>

<style scoped>
/* Style cho popup */
.modal {
  display: table;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  font-family: Arial, sans-serif;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* CSS cho các input và label trong modal */
.modal-content input {
  width: calc(100% - 20px);
  padding: 8px;
  margin-bottom: 10px;
}

.modal-content label {
  display: block;
  margin-bottom: 5px;
}

/* Style cho các trường trong popup */
.form-group #name,
.form-group #age,
.form-group #class {
  width: calc(100% - 40px);
  margin-bottom: 10px;
}

.form-group #text,
.form-group #number {
  width: calc(100% - 40px);
  margin-bottom: 10px;
}

.class-list-modal {
  width: 300px; /* Chiều rộng của popup */
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Đổ bóng cho popup */
}

/* Style cho danh sách lớp */
ul {
  list-style-type: none;
  padding: 0;
}

/* Style cho mỗi mục danh sách lớp */
ul li {
  margin-bottom: 10px;
}

</style>

