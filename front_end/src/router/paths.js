export default [
  {
    path: "/dashboard",
    meta: {
      name: "Dashboard View",
      requiresAuth: false,
    },
    component: () => import(`@/views/DashboardView.vue`),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import(`@/components/DashViews/Dashboard.vue`),
      },
    ],
  },
];
