import {
  deleteJob,
  getAllJob,
  getJob,
  getJobs,
  getJobsExceptIds,
  newJob,
  updateJob,
} from "../model/jobsBase.js";
import {
  getAllApplicants,
  getApplicant,
  newApplicant,
  updateApplicant,
  deleteApplicant,
  getApplications,
} from "../model/jobApplications.js";
import { mailService } from "../middleware/index.js";

function getUser(req) {
  return {
    name: req.cookies.userName,
    email: req.cookies.userEmail,
    usertype: req.cookies.userType,
  };
}

const allJobs = (req, res) => {
  if (getUser(req).usertype === "recruiter") {
    const data = getAllJob();
    res.render("dashboard", { page: "alljobs", data, user: getUser(req) });
  } else {
    const applicantEmail = getUser(req).email;
    const jobApplicationsId = getApplications(applicantEmail);
    console.log(jobApplicationsId);
    if (jobApplicationsId.length === 0) {
      const data = getAllJob();
      console.log("All Jobs:---------", data);
      res.render("dashboard", {
        page: "alljobs",
        data,
        user: getUser(req),
      });
    } else {
      const data = getJobsExceptIds(jobApplicationsId);
      console.log("All Jobs Except:----------------", data);
      res.render("dashboard", {
        page: "alljobs",
        data,
        user: getUser(req),
      });
    }
  }
};

const createNewJob = (req, res) => {
  const data = newJob(req.body);
  res.render("dashboard", { page: "alljobs", data, user: getUser(req) });
};

const retrieveJobById = (req, res) => {
  if (getUser(req).usertype === "recruiter") {
    const data = getJob(req.params.id);
    res.render("dashboard", { page: "alljobs", data, user: getUser(req) });
  } else {
    const applicantEmail = getUser(req).email;
    const jobApplicationsId = getApplications(applicantEmail);
    console.log(jobApplicationsId);
    const data = getJob(req.params.id);
    console.log("Specific Job:--------------", data);
    if (!jobApplicationsId.includes(Number(req.params.id), 0)) {
      res.render("dashboard", {
        page: "alljobs",
        data,
        user: getUser(req),
      });
    } else {
      res.render("dashboard", {
        page: "appliedJobs",
        data,
        user: getUser(req),
      });
    }
  }
};

const retrieveAllApplicants = (req, res) => {
  if (getUser(req).usertype === "recruiter") {
    const applicants = getAllApplicants();
    res.render("dashboard", {
      page: "jobApplications",
      data: { applicants },
      user: getUser(req),
    });
  } else {
    const applicantEmail = getUser(req).email;
    const jobApplicationsId = getApplications(applicantEmail);
    const data = getJobs(jobApplicationsId);
    res.render("dashboard", {
      page: "appliedJobs",
      data,
      user: getUser(req),
    });
  }
};

const addNewApplicant = (req, res) => {
  const data = newApplicant(req.body);
  res.render("dashboard", { page: "allApplicants", data });
};

const retrieveApplicantById = (req, res) => {
  console.log("Get Specific Job Details:------------", req.params.id);
  const applicants = getApplicant(req.params.id);
  const jobDetails = getJob(req.params.id);
  res.render("dashboard", {
    page: "jobApplications",
    data: { applicants, jobDetails },
    user: getUser(req),
  });
};

const updateApplicantById = (req, res) => {
  const data = updateApplicant(req.params.id, req.body);
  res.render("dashboard", { page: "allApplicants", data });
};

const deleteApplicantById = (req, res) => {
  console.log("Deleting:---------", req.params.id);
  const applicants = deleteApplicant(req.params.id);
  res.render("dashboard", {
    page: "jobApplications",
    data: { applicants },
    user: getUser(req),
  });
};

const renderUpdateForm = (req, res) => {
  const jobData = getJob(req.params.id);
  console.log("Updating Job:----------", jobData);
  res.json({ data: jobData });
};

const updateJobById = (req, res) => {
  const jobId = Number(req.params.id);
  const jobData = req.body;
  const applicants = getApplicant(req.params.id);
  const jobDetails = updateJob(jobId, jobData);
  console.log("Job Updated:------------", jobDetails);
  res.render("dashboard", {
    page: "jobApplications",
    data: { applicants, jobDetails },
    user: getUser(req),
  });
};

const deleteJobById = (req, res) => {
  const data = deleteJob(req.params.id);
  res.render("dashboard", { page: "alljobs", data, user: getUser(req) });
};

const applyToJob = async (req, res) => {
  const { name, email, phone } = req.body;
  const filename = req.file.filename;
  const jobId = Number(req.params.id);
  console.log("Applied for JobId:------------", jobId);
  newApplicant({
    jobId,
    name,
    email,
    phone,
    resume: `https://cover-oxni.onrender.com/uploads/${filename}`,
  });
  const applicantEmail = getUser(req).email;
  const jobApplicationsId = getApplications(applicantEmail);
  const data = getJobsExceptIds(jobApplicationsId);
  await mailService(applicantEmail);
  res.render("dashboard", { page: "alljobs", data, user: getUser(req) });
};

export {
  allJobs,
  createNewJob,
  retrieveJobById,
  retrieveAllApplicants,
  addNewApplicant,
  retrieveApplicantById,
  updateApplicantById,
  deleteApplicantById,
  renderUpdateForm,
  updateJobById,
  deleteJobById,
  applyToJob,
};
