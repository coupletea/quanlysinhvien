import { createRouter, createWebHistory } from 'vue-router';
import StudentView from "../views/Student/StudentView.vue";
import CreateStudentModal from '../views/Student/CreateStudentModal.vue';
import ClassListModal from "../views/Class/ClassListModal.vue";
import CreateClassModal from '@/views/Class/CreateClassModal.vue';

export const staticPath = {
  student: "/student",
  createStudent: "/student/create",
  updateStudent: "/student/update",
  classroom: "/classroom",
  createClassroom: "/classroom/create",
  updateClassroom: "/classroom/update"

};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path: staticPath.student,
      component: StudentView,
    },
    {
      path: staticPath.createStudent,
      component: CreateStudentModal,
    },
    {
      path: staticPath.updateStudent + "/:id",
      component: CreateStudentModal,
    },
    {
      path: staticPath.classroom,
      component: ClassListModal,
    },
    {
      path: staticPath.createClassroom,
      component: CreateClassModal,
    },
    {
      path: staticPath.updateClassroom + "/:id",
      component: CreateClassModal,
    }

  ]
})

export default router
