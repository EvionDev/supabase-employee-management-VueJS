import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import EmployeeList from "../components/EmployeeList.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/employee",
    name: "Employee",
    component: EmployeeList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
