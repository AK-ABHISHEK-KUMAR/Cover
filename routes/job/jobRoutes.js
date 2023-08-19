// Job routes
import express from "express";
import {
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
} from "../../controller/Jobs.js";
import { fileUploadMiddleware } from "../../middleware/index.js";

const router = express.Router();

// /jobs
// GET /: Retrieve all job listings
router.get("/", allJobs);
// POST /: Create a new job listing
router.post("/", createNewJob);
// GET /:id: Retrieve a specific job listing by ID
router.get("/id/:id", retrieveJobById);
// PUT /:id: Update a specific job listing by ID
// router.put("/:id", updateJobById); // same as line: 50
// DELETE /:id: Delete a specific job listing by ID
// router.delete("/:id", deleteJobById);  // same as line: 54

// /jobs/:id/applicants
// GET /: Retrieve all applicants for a specific job listing
router.get("/applicants", retrieveAllApplicants);
// POST /: Add a new applicant to a specific job listing
// router.post("/applicants/:id", addNewApplicant); //----------------
// GET /:applicantId: Retrieve a specific applicant by ID for a job listing
router.get("/applicants/:id", retrieveApplicantById);
// PUT /:applicantId: Update a specific applicant by ID for a job listing
// router.put("/:id/applicants/:applicantId", updateApplicantById); //-----------------
// DELETE /:applicantId: Delete a specific applicant by ID for a job listing
router.delete("/delete/applicants/:id", deleteApplicantById);

// /jobs/:id/update
// GET /: Render the update form for a specific job listing
router.get("/update/:id", renderUpdateForm);
// POST /: Update a specific job listing by ID
router.post("/updateJob/:id", updateJobById);

// /jobs/:id/delete
// GET /: Delete a specific job listing by ID
router.get("/delete/:id", deleteJobById);

// /apply/:id
// POST /: Apply to a specific job listing by ID, uploading a resume
router.post("/apply/:id", fileUploadMiddleware.single("resume"), applyToJob);

export default router;
