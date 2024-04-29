import { createRouter, createWebHistory } from 'vue-router';
import StudentView from "../views/Student/StudentView.vue";
import CreateStudentModal from '../views/Student/CreateStudentModal.vue';
import ClassListModal from "../views/Class/ClassListModal.vue";
import CreateClassModal from '@/views/Class/CreateClassModal.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path: "/student",
      name: "student-route",
      component: StudentView,
    },
    {
      path: "/student/create",
      name: "createstudent-route",
      component: CreateStudentModal,
    },
    {
      path: "/student/update/:id",
      name: "updatestudent-route",
      component: CreateStudentModal,
    },
    {
      path: "/classroom",
      name: "classroom-route",
      component: ClassListModal,
    },
    {
      path: "/classroom/create",
      name: "createclassroom-route",
      component: CreateClassModal,
    },
    {
      path: "/classroom/update/:id",
      name: "updateclassroom-route",
      component: CreateClassModal,
    }

  ]
})

export default router
