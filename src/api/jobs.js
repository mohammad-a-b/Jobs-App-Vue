// src/api/jobs.js
import { BASE_URL } from "@/config/apiConfig";

export const fetchJobs = async () => {
  const response = await fetch(`${BASE_URL}/jobs`);
  if (!response.ok) throw new Error("خطا در بارگذاری شغل‌ها");
  return await response.json();
};

export const fetchJobDetail = async (jobId) => {
  const response = await fetch(`${BASE_URL}/jobs/${jobId}`);
  if (!response.ok) throw new Error("خطا در بارگذاری جزئیات شغل");
  return await response.json();
};





export const fetchCompanies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/companies`);
    if (!response.ok) throw new Error("Error fetching companies");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // می‌توان این خط را برای مدیریت بهتر خطاها و نمایش به کاربر استفاده کرد
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) throw new Error("Failed to create job");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // می‌توان این خط را برای مدیریت بهتر خطاها و نمایش به کاربر استفاده کرد
  }
};