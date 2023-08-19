// Please don't change the pre-written code
// Import the necessary modules
import { body, validationResult } from "express-validator";

const formValidation = async (req, res, next) => {
  // Write your code here
  // 1. Setup rules for validation.
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Enter a valid email"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Profile image is required");
      }
      return true;
    }),
  ];

  // 2. run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. check if there are any errors after running the rules.
  var validationErrors = validationResult(req);
  // 4. if errros, return the error message
  if (!validationErrors.isEmpty()) {
    return res.send(validationErrors.array());
  }
  next();
};

export default formValidation;
