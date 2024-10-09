import { createRouter, createWebHistory } from "vue-router";
import CreateJob from "@/pages/CreateJob.vue";
import JobList from "@/pages/JobList.vue";

const routes = [
  { path: "/jobs/create", component: CreateJob },
  { path: "/jobs", component: JobList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
