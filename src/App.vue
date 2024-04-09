<template>
  <div>
    <div>
      <h1>Danh Sách Sinh Viên</h1>
    </div>
    <div>
      <button @click="showAddStudentModal">Thêm sinh viên</button>
      <button @click="showClassListModal">Chuyển lớp</button>
      <button @click="showAddClassModal">Thêm lớp</button>
      <button @click="openFilterModal">Hiển thị bộ lọc</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ và Tên</th>
          <th>Tuổi</th>
          <th>Lớp</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
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
    <student-modal 
      :show-modal="showAddModal" 
      modal-title="Thêm sinh viên" 
      :form-data="newStudent" 
      @close="closeModal" 
      @save="addStudent"
    />
    <student-modal 
      :show-modal="showEditModal" 
      modal-title="Sửa sinh viên" 
      :form-data="editStudentData" 
      @close="closeModal" 
      @save="saveEditedStudent"
    />
    <filter-modal 
      :show-modal="isFilterModalVisible" 
      modal-title="Bộ lọc" 
      :filter-data="filterData" 
      @close="closeFilterModal" 
      @apply="applyFilters"
    />
    <class-list-modal 
      :show-modal="classListModalVisible" 
      modal-title="Danh sách lớp" 
      :class-list="classList" 
      @close="closeClassListModal" 
      @select="showClassStudents"
    />
  </div>
</template>

<script>
import StudentModal from './components/StudentModal.vue';
import FilterModal from './components/FilterModal.vue';
import ClassListModal from './components/ClassListModal.vue';

export default {
  components: {
    StudentModal,
    FilterModal,
    ClassListModal
  },
  data() {
    return {
      students: [
        { name: 'Nguyễn Văn A', age: 18, class: '12A' },
        { name: 'Trần Thị B', age: 17, class: '11B' },
        { name: 'Phạm Văn C', age: 19, class: '12C' },
        { name: 'Nguyễn Văn D', age: 17, class: '12A' },
        { name: 'Trần Thị E', age: 17, class: '12A' },
        { name: 'Phạm Văn C', age: 19, class: '12C' },
        { name: '', age: '', class: '' },
      ],
      newStudent: {
        name: '',
        age: '',
        class: ''
      },
      editStudentData: {
        name: '',
        age: '',
        class: ''
      },
      filterData: {
        name: '',
        age: '',
        class: ''
      },
      showAddModal: false,
      showEditModal: false,
      isFilterModalVisible: false,
      classListModalVisible: false,
      classList: ['12A', '11B', '12C'] // Dữ liệu mẫu cho danh sách lớp
    };
  },
  computed: {
    filteredStudents() {
      // Thực hiện lọc dữ liệu sinh viên theo các bộ lọc
      return this.students.filter(student => {
        if (this.filterData.name && student.name.toLowerCase().indexOf(this.filterData.name.toLowerCase()) === -1) {
          return false;
        }
        if (this.filterData.age && student.age.toString().indexOf(this.filterData.age) === -1) {
          return false;
        }
        if (this.filterData.class && student.class.toLowerCase().indexOf(this.filterData.class.toLowerCase()) === -1) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    showAddStudentModal() {
      this.showAddModal = true;
    },
    addStudent(formData) {
      this.students.push({ ...formData });
      this.showAddModal = false;
      this.resetFormData(this.newStudent);
    },
    editStudent(index) {
      const student = this.filteredStudents[index];
      this.editStudentData = { ...student };
      this.showEditModal = true;
    },
    saveEditedStudent(formData) {
      const index = this.students.indexOf(this.filteredStudents.find(student => student.name === formData.name));
      if (index !== -1) {
        this.students.splice(index, 1, { ...formData });
      }
      this.showEditModal = false;
    },
    deleteStudent(index) {
      const student = this.filteredStudents[index];
      const deleteIndex = this.students.indexOf(student);
      this.students.splice(deleteIndex, 1);
    },
    closeModal() {
      this.showAddModal = false;
      this.showEditModal = false;
    },
    resetFormData(formData) {
      formData.name = '';
      formData.age = '';
      formData.class = '';
    },
    openFilterModal() {
      this.isFilterModalVisible = true;
    },
    closeFilterModal() {
      this.isFilterModalVisible = false;
    },
    applyFilters(filterData) {
      this.filterData = { ...filterData };
      this.isFilterModalVisible = false;
    },
    closeClassListModal() {
      this.classListModalVisible = false;
    },
    showClassListModal() {
      this.classListModalVisible = true;
    },
    showClassStudents(selectedClass) {
      this.filterData.class = selectedClass;
      this.classListModalVisible = false;
    }
  }
}
</script>

<style >
/* Style cho popup */
@import '/popupstyle.css';
</style>

