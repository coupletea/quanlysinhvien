<template>
    <main>
      <div class="classroom-container">
        <div class="create-container">
          <button type="button" @click="onCreate()">Thêm mới</button>
        </div>
        <div>
          <StudentTable
            :columns="columns"
            :data="classrooms"
            @item-update="onUpdate"
            @item-delete="onDelete"
          ></StudentTable>
          <PaginationTab
            :page="pagination.page"
            :total="pagination.total"
            :limit="pagination.limit"
            @onPageChange="onPageChange"
          ></PaginationTab>
        </div>
      </div>
    </main>
</template>
<script>
import router, { staticPath } from '../../router';
import PaginationTab from "@/components/PaginationTab.vue";
import StudentTable from "../../components/StudentTable.vue";
import { deleteClassroom, getListClassrooms } from "../../Service/ClassroomService";
import ClassTable from "../../components/ClassTable.vue";
export default {
    components: { PaginationTab, StudentTable, ClassTable},
    data() {
        return {
            columns: [{ text: "Tên lớp", value: "name", align: "left" }],
            classrooms: [],
            pagination: {
            page: 1,
              limit: 5,
              total: 0,
            },
        };
    },
    methods: {
    getClassrooms() {
      let payload = {
        ...this.pagination,
      };
      let res = getListClassrooms(payload);
      this.classrooms = res.data || [];
      this.pagination.total = res.total;
    },
    onSearch() {
      this.getClassrooms();
    },
    onCreate() {
      router.push(staticPath.createClassroom);
    },
    onUpdate(e) {
      router.push(staticPath.updateClassroom + `/${e}`);
    },
    onDelete(e) {
      deleteClassroom(e);
      this.getClassrooms();
    },
    onPageChange(e) {
      this.pagination.page = e;
      this.getClassrooms();
    },
  },
    created() {
    this.getClassrooms();
    },
};
</script>
<style scoped>
@import "./ClassModal.scss";
</style>
