import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer'; // Import nodemailer

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your React app's URL
  methods: ["GET", "POST"],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());

// Define a basic GET route
app.get('/', (req, res) => {
  res.send('Hello from the root endpoint!');
});

// Send email function
const sendEmail = async (options) => {
  console.log("Sending email...");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: `${options.message} \n\nEmail of User Who Sent The Message: ${options.userEmail}`,
  };
  await transporter.sendMail(mailOptions);
};

// Define the POST route for sending mail
app.post("/send/mail", async (req, res) => {
  console.log("Processing email request...");
  const { name, email: userEmail, message } = req.body;

  if (!name || !userEmail || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }

  try {
    await sendEmail({
      email: "ashishbhushan1703@gmail.com",
      subject: "Fitness Pro CONTACT",
      message,
      userEmail,
    });
    console.log("Email sent successfully.");
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.post('/hi', (req, res) => {
  // Handle your request here
  console.log("hi");
  res.send('Email sent!');
}); 

app.listen(4000, () => {
  console.log(`Server running on http://localhost:4000`);
});
