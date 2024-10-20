import { createRouter, createWebHistory } from "vue-router";
import CreateJob from "@/pages/CreateJobPage.vue";
import JobList from "@/pages/JobsPage.vue";
import JobDetail from "@/pages/jobPage.vue"; 

const routes = [
  { path: "/jobs/create", component: CreateJob },
  { path: "/jobs", component: JobList },
  { path: "/jobs/:id", component: JobDetail }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
