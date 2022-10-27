import DashboardLayout from "@/layout/DashboardLayout.vue";

import { certDetail } from "@/utils/cookies";

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Dashboard/Chart.vue"),
        meta: { requiresAuth: true, hideFooter: true },
      },
      {
        path: "monitor",
        name: "Monitor",
        component: () => import("@/views/Dashboard/Monitor.vue"),
        meta: { requiresAuth: true, hideFooter: true, monitoring: true },
      },
      // {
      //   path: "filter",
      //   name: "Filter",
      //   component: () => import("@/views/Dashboard/DetailFilter.vue"),
      //   meta: { requiresAuth: true, hideFooter: true },
      // },
    ],
  },
  {
    path: "/monitoring",
    component: DashboardLayout,
    children: [
      {
        path: "data-kandang",
        name: "Data Kandang",
        component: () =>
          import("@/views/Dashboard/Monitoring/DaftarKandang.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "detail-kandang/:id",
        name: "Detail Kandang",
        component: () =>
          import("@/views/Dashboard/Monitoring/KandangDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-pakan",
        name: "Data Pakan",
        component: () =>
          import("@/views/Dashboard/Monitoring/JenisPakanPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "detail-pakan/:id",
        name: "Detail Pakan",
        component: () =>
          import("@/views/Dashboard/Monitoring/JenisPakanDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-pakan/bahan-pakan",
        name: "Bahan Pakan",
        component: () => import("@/views/Dashboard/Monitoring/PakanPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-pakan/detail-bahan-pakan/:id",
        name: "Detail Bahan Pakan",
        component: () => import("@/views/Dashboard/Monitoring/PakanDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-penyakit",
        name: "Data Penyakit",
        component: () =>
          import("@/views/Dashboard/Monitoring/PenyakitPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-penyakit/data-kesehatan",
        name: "Data Kesehatan",
        component: () =>
          import("@/views/Dashboard/Monitoring/KesehatanPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "detail-ternak-sakit/:id",
        name: "Detail Ternak Sakit",
        component: () =>
          import("@/views/Dashboard/Monitoring/KesehatanDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-ternak",
        name: "Data Ternak",
        component: () => import("@/views/Dashboard/Monitoring/TernakPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-perkawinan",
        name: "Data Perkawinan",
        component: () => import("@/views/Dashboard/Monitoring/KawinPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "riwayat-kawin/:id",
        name: "Detail Kawin",
        component: () => import("@/views/Dashboard/Monitoring/KawinDetail.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/user",
    component: DashboardLayout,
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/Dashboard/User/ProfilePage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/fase",
    component: DashboardLayout,
    children: [
      {
        path: "pemasukan",
        name: "Pemasukan",
        component: () => import("@/views/Dashboard/Fase/Pemasukan.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "pemasukan/langkah-kerja",
        name: "Langkah Kerja Pemasukan",
        component: () => import("@/views/Dashboard/Fase/LK_Pemasukan.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

export default dashboardRoutes;
