const applicants = [
  {
    id: 1,
    jobId: 1,
    name: "Demo",
    email: "demo@example.com",
    phone: 1234567890,
    resume: `https://cover-oxni.onrender.com/uploads/1692093867417-ProblemStatement.md`,
  },
  {
    id: 2,
    jobId: 1,
    name: "Demo1",
    email: "demo1@example.com",
    phone: 4567891230,
    resume: `https://cover-oxni.onrender.com/uploads/1692093897378-ProblemStatement.md`,
  },
  {
    id: 3,
    jobId: 1,
    name: "XYZ",
    email: "xyz@example.com",
    phone: 7894561230,
    resume: `https://cover-oxni.onrender.com/uploads/1692093923968-ProblemStatement.md`,
  },
  {
    id: 4,
    jobId: 1,
    name: "Demo2",
    email: "demo2@example.com",
    phone: 7418529630,
    resume: `https://cover-oxni.onrender.com/uploads/1692093953245-ProblemStatement.md`,
  },
];

const getAllApplicants = () => {
  return applicants;
};

const getApplicant = (jobId) => {
  return applicants.filter((applicant) => applicant.jobId === Number(jobId));
};

const getApplications = (email) => {
  return applicants.map(
    (applicant) => applicant.email === email && applicant.jobId
  );
};

const newApplicant = (data) => {
  const newId = applicants.length + 1;
  const newApplicant = { id: newId, ...data };
  applicants.push(newApplicant);
  return newApplicant;
};

const updateApplicant = (id, data) => {
  const index = applicants.findIndex((applicant) => applicant.id === id);
  if (index !== -1) {
    applicants[index] = { ...applicants[index], ...data };
    return applicants[index];
  }
  return null;
};

const deleteApplicant = (id) => {
  const index = applicants.findIndex(
    (applicant) => applicant.id === Number(id)
  );
  applicants.splice(index, 1);
  return applicants;
};

export {
  getAllApplicants,
  getApplicant,
  getApplications,
  newApplicant,
  updateApplicant,
  deleteApplicant,
};
