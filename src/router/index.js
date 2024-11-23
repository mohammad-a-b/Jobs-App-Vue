import { createRouter, createWebHistory } from "vue-router";
import CreateJob from "@/pages/CreateJobPage.vue";
import JobList from "@/pages/JobsPage.vue";
import JobDetail from "@/pages/jobPage.vue";
import CreateCompany from "@/pages/CreateCompanyPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/jobs/create",
  },
  { path: "/jobs/create", component: CreateJob },
  { path: "/jobs", component: JobList },
  { path: "/jobs/:id", component: JobDetail },
  { path: "/create/company", component: CreateCompany },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
