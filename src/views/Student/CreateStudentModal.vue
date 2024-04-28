<template>
  <div class="modal fade show">
    <div class="modal-dialog">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="modal-header">
          <div class="form-group">
            <label for="name">Họ tên:</label>
            <input id="name" type="text" v-model="form.name.value" placeholder="Nhập họ tên" />
            <p v-if="form.showError" class="error">{{ form.name.error }}</p>
          </div>
          <div class="form-group">
            <label for="dateOfBirth">Ngày sinh:</label>
            <input id="dateOfBirth" type="date" v-model="form.dateOfBirth.value" />
            <p v-if="form.showError" class="error">{{ form.dateOfBirth.error }}</p>
          </div>
          <div class="form-group">
            <label for="classroom">Lớp:</label>
            <select id="classroom" v-model="form.classroom.value">
              <option v-for="(item, index) in classrooms" :key="index" :value="item.id">{{ item.name }}</option>
            </select>
            <p v-if="form.showError" class="error">{{ form.classroom.error }}</p>
          </div>
          <div class="form-group">
            <button @click="onFinish" type="submit">{{ isUpdate ? "Cập nhật" : "Thêm mới" }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router, { staticPath } from '@/router';
import { useRoute } from 'vue-router';
import { createStudent, updateStudent, getStudentById } from '@/Service/StudentService';
import { calculateAge } from '@/Helper/AgeHelper';
import { getAllClassrooms, createClassroom } from '@/Service/ClassroomService';
import { validCheck, validRequired, validMaxlength, validMinlength } from '@/Helper/ValidCheckHelper';


export default {
  data() {
    return {
      form: {
        name: {
          value: null,
          rules: [validRequired, [validMaxlength, 150], [validMinlength, 4]],
        },
        dateOfBirth: {
          value: null,
        },
        classroom: {
          value: null,
        },
        showError: false,
      },
      isUpdate: false,
      id: null,
    };
  },
  methods: {

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
    checkRoute() {
      let route = useRoute();
      this.id = route.params.id;
      if (route.path.indexOf(staticPath.updateStudent) > -1) {
        this.isUpdate = true;
        this.fetchStudent();
      }
    },
    onFinish() {
      let isValid = validCheck(this.form);
      if (isValid) {
        this.form.showError = true;
        return;
      }
      let payload = {
        name: this.form.name.value,
        dateOfBirth: this.form.dateOfBirth.value,
        classroom: this.form.classroom.value,
        age: calculateAge(this.form.dateOfBirth.value),
      };
      if (!this.isUpdate) {
        createStudent(payload).then(() => {
          //this.$parent.getStudents();
        });
      } else {
        payload.id = this.id;
        updateStudent(payload).then(() => {
          //this.$parent.updateStudent();
          // Cập nhật lại danh sách sinh viên trên giao diện cha nếu cần
        });
      };
      this.$emit('close');
      router.back()
      
    },
    closeModal() {
      router.push(staticPath.student)
      this.$emit('close');
    }
  },
  created() {
    this.checkRoute();
    this.getClassroom();
  },
};
</script>

<style scoped>
/* CSS cho modal */
@import "./StudentModal.scss";
</style>