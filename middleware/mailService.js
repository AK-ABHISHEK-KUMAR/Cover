import nodemailer from "nodemailer";

const mailService = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "codingninjas2k16@gmail.com",
      pass: "slwvvlczduktvhdj",
    },
  });

  const mailOptions = {
    from: "codingninjas2k16@gmail.com",
    to: email,
    subject: "Job Applied!",
    text: "We have received your application.",
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`Success: Email sent to ${email}`);
  } catch (err) {
    console.log("Email send failer with error: " + err);
  }
};

export default mailService;
