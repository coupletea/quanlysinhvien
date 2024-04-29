<template>
  <div class="modal fade show">
    <div class="modal-dialog">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="modal-header">
          <div>
            <label for="class-name">Tên lớp:</label>
            <input id="class-name" type="text" placeholder="Nhập tên lớp" v-model="form.name.value" />
          </div>
          <div>
            <label for="class-group">Nhóm lớp:</label>
            <select id="class-group" v-model="form.group.value">
              <option v-for="(item, index) in classrooms" :key="index" :value="item.id">{{ item.name }}</option>
            </select>
          </div>
          <div>
            <button @click="onFinish">{{ isUpdate ? "Cập nhật" : "Thêm mới" }}</button>
          </div>
          <div class="error-container">
            <p v-if="form.showError" class="error active">{{ form.name.error }}</p>
            <p v-if="form.showError" class="error active">{{ form.group.error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createClassroom, updateClassroom, getAllClassrooms, getClassroomById } from "../../Service/ClassroomService"
import { validCheck, validMaxlength, validMinlength, validRequired, validUnique } from "@/Helper/ValidCheckHelper";
import { useRoute } from "vue-router";
import router from "@/router";
export default {
  data() {
    return {
      classrooms: [],
      form: {
        name: {
          value: null,
          rules: [validRequired, [validMaxlength, 150], [validMinlength, 4], validUnique],
        },
        group: {
          value: null,
          rules: [],
        },
        showError: false,
      },
      isUpdate: false,
      id: null,
    };
  },
  computed: {
    route() {
      return useRoute();
    }
  },
  methods: {
    async fetchClassrooms() {
      try {
        this.classrooms = await getAllClassrooms();
        if (this.isUpdate) {
          const classroom = await getClassroomById(this.id);
          if (classroom) {
            this.form.name.value = classroom.name;
            this.form.group.value = classroom.group;
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors appropriately
      }
    },
    // kiểm tra nếu là route update thì fetch dữ liệu
    watch: {
      'route.params.id': {
        handler(newValue, oldValue) {
          if (newValue !== oldValue) {
            this.checkRoute();
          }
        },
        immediate: true
      }
    },
    checkRoute() {
      let route = useRoute();
      this.id = route.params.id;
      if (route.name === 'updateclassroom-route') {
        this.isUpdate = true;
        this.fetchClassrooms();
      }
    },

    onFinish() {
      let isValid = validCheck(this.form);
      if (isValid) {
        this.form.showError = true;
        return;
      }
      const existingNames = this.classrooms.map(c => c.name);
      if (this.isUpdate) {
        const currentClassroom = getClassroomById(this.id);
        existingNames.splice(existingNames.indexOf(currentClassroom.name), 1);
      } let isInvalid = validCheck(this.form, existingNames);

      if (isInvalid) {
        this.form.showError = true;
        return;
      }
      let payload = {
        name: this.form.name.value,
        group: this.form.group.value,
      };

      if (!this.isUpdate) {
        createClassroom(payload).then(() => {
          //this.$parent.createClassroom();
        });;
      } else {
        payload.id = this.id;
        updateClassroom(payload).then(() => {
          //this.$parent.updateClassroom();
        });;
      }
      this.$emit('close');
      router.back();
    },
    closeModal() {
      this.$emit('close');
      router.back()
    }
  },
  created() {
    this.checkRoute();
    this.fetchClassrooms();
  },

};
</script>
<style scoped>
@import "./ClassModal.scss";
</style>