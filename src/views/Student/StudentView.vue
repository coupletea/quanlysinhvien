<template>
  <main>
    <div class="student-container">
      <div class="search-container">
        <input type="text" placeholder="Tìm kiếm theo tên" v-model="searchForm.name" @input="onSearch" />
        <input type="number" placeholder="Tìm kiếm theo tuổi" v-model="searchForm.age" @input="onSearch" />
        <select v-model="searchForm.classroom" @change="onSearch">
          <option value="" disabled selected>Lớp</option>
          <option v-for="(item, index) in classrooms" :key="index" :value="item.id">{{ item.name }}</option>
        </select>
      </div>
      <div class="btn-create-container">
        <button @click="onCreate">Thêm mới</button>
      </div>
      <div>
        <StudentTable :columns="columns" :data="students" @item-update="onUpdate" @item-delete="onDelete">
        </StudentTable>
        <PaginationTab :page="pagination.page" :total="pagination.total" :limit="pagination.limit"
          @onPageChange="onPageChange"></PaginationTab>
      </div>
    </div>
  </main>
</template>
<script>
import StudentTable from "../../components/StudentTable.vue";
import PaginationTab from "../../components/PaginationTab.vue";
import { deleteStudent, getListStudents } from "../../Service/StudentService";
import { getAllClassrooms } from "@/Service/ClassroomService";
import CreateStudentModal from "./CreateStudentModal.vue";


export default {
  components: { StudentTable, PaginationTab, CreateStudentModal },
  data() {
    return {
      columns: [
        { text: "Tên", value: "name" },
        { text: "Tuổi", value: "age" },
        { text: "Lớp", value: "classroomName" },
      ],
      students: [],
      classrooms: [],
      searchForm: {
        name: null,
        age: null,
        classroom: null,
      },
      pagination: {
        page: 1,
        limit: 5,
        total: 0,
      },
      searchForm: {
        classroom: '',
      },

    };
  },
  computed: {

  },
  methods: {
    getStudents() {
      let payload = {
        ...this.searchForm,
        ...this.pagination,
      };
      let res = getListStudents(payload);  
      this.students = res.data || [];

      // Kiểm tra số lượng sinh viên
      if (res.data && res.data.length < this.pagination.limit) {
        // Nếu số lượng ít hơn limit, gán total = 1
        this.pagination.total = 1;
      } else {
        // Nếu đủ sinh viên, sử dụng số trang được trả về từ API
        this.pagination.total = res.total;
      }
    },
    fetchStudent() {
      var student = getStudentById(this.id);
      if (student) {
        this.form.name.value = student.name;
        this.form.dateOfBirth.value = student.dateOfBirth;
        this.form.classroom.value = student.classroom;
      }
    },
    getClassroom() {
      this.classrooms = getAllClassrooms();
    },
    onSearch() {
      this.getStudents();
    },
    onCreate() {
      this.$router.push({ name: 'createstudent-route' });
    },
    onUpdate(id) {
      this.$router.push({ name: 'updatestudent-route', params: { id } });
    },
    onDelete(id) {
      deleteStudent(id);
      this.getStudents();
    },
    onPageChange(e) {
      this.pagination.page = e;
      this.getStudents();
    },
    handleUpdateSuccess() {
      // Tải lại danh sách sinh viên hoặc cập nhật dữ liệu từ bộ nhớ
      this.fetchStudents();
    },
    handleCreateSuccess() {
      // Tương tự như trên
      this.fetchStudents();
    },
    
  },
  created() {
    this.getStudents();
    this.getClassroom();
    
  },
  
  watch: {
    searchForm: {
      deep: true,
      handler() {
        this.getStudents();
      },
    },
  },
};
</script>
<style scoped>
@import "./StudentModal.scss";
</style>
