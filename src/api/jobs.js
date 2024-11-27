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
  }
};

export const createCompany = async (companyData) => {
  try {
    const data = new FormData();
    data.append("title", companyData.title);
    data.append("email", companyData.email);
    data.append("population", companyData.population);
    data.append("website", companyData.website || "");
    data.append("logo", companyData.logo);
    data.append("description", companyData.description);

    const response = await fetch(`${BASE_URL}/companies`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "خطا در ارسال فرم");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
export const deleteLastJob = async (jobs) => {
  if (jobs.length > 0) {
    const lastJobId = jobs[jobs.length - 1]._id;

    try {
      const response = await fetch(`${BASE_URL}/jobs/${lastJobId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        jobs.pop();
      } else {
        throw new Error("خطا در حذف شغل");
      }
    } catch (err) {
      console.error("خطا در حذف شغل:", err);
    }
  }
};