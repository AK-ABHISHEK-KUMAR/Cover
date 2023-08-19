const jobsList = [
  {
    id: 1,
    category: "Tech",
    designation: "Full Stack Developer",
    description: "SDE oppertunity in GURGAON HR IND REMOTE at Coding Ninjas",
    location: "Pune",
    companyName: "Google",
    salary: "100k",
    openings: 10,
    skills: [
      "MongoDB",
      "Reactjs",
      "Reduxjs",
      "Nodejs",
      "Expressjs",
      "Socket.io",
    ],
    lastDate: new Date().toISOString(),
  },
];

export const newJob = (job) => {
  jobsList.unshift({
    ...job,
    id: jobsList.length + 1,
    skills: job.skills.split(","),
  });
  return jobsList;
};

export const updateJob = (jobId, updatedJob) => {
  const index = jobsList.findIndex((job) => job.id === Number(jobId));
  jobsList[index] = {
    id: jobId,
    ...updatedJob,
    skills: updatedJob.skills.split(","),
  };
  return [jobsList[index]];
};

export const getAllJob = () => {
  return jobsList;
};

export const deleteJob = (jobId) => {
  const index = jobsList.findIndex((job) => job.id === Number(jobId));
  jobsList.splice(index, 1);
  return jobsList;
};

export const getJobExceptId = (jobId) => {
  return jobsList.filter((job) => job.id !== Number(jobId));
};

export const getJob = (jobId) => {
  return jobsList.filter((job) => job.id === Number(jobId));
};

export const getJobs = (jobId) => {
  return jobsList.filter((job) => jobId.includes(job.id, 0));
};

export const getJobsExceptIds = (jobId) => {
  return jobsList.filter((job) => !jobId.includes(job.id, 0));
};
