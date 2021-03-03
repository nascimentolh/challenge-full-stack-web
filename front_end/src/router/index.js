import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "login" },
    name: "loginhome",
    component: () => import(`@/views/LoginHomeView.vue`),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import(`@/components/LoginForm.vue`),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import(`@/views/DashboardView.vue`),
    meta: {
      name: "Dashboard",
      rule: "isPublic",
    },
    children: [
      {
        path: "students",
        meta: {
          name: "Estudantes",
          rule: "isAdmin",
        },
        name: "students",
        component: () => import(`@/components/DashViews/Student.vue`),
      },
      {
        path: "users",
        meta: {
          name: "Usuarios",
          rule: "isAdmin",
        },
        name: "users",
        component: () => import(`@/components/DashViews/Users.vue`),
      },
    ],
  },
  { path: "_=_", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
