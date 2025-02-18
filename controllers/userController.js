import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import { coderModel } from "../models/coderModel.js";
import { appointmentModel } from "../models/appointmentModel.js";
import { v2 as cloudinary } from "cloudinary";
import stripe from "stripe";
import razorpay from "razorpay";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import {
  registerUserService,
} from "../services/userService.js";

const client = new OAuth2Client(
  "969886296841-a0fr5bnv2rrt22bptihti8o9cabsghh8.apps.googleusercontent.com"
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVICE_SMTP,
    pass: process.env.EMAIL_SERVICE_PASSWORD,
  },
});

function getBackendUrl() {
  let baseUrl = process.env.VITE_BACKEND_URL;
  if (process.env.NODE_ENV == "dev") {
    baseUrl = "localhost:" + process.env.PORT;
  }
  return baseUrl + "/my-appointments";
}

function formatDateString(dateString) {
  const [day, month, year] = dateString.split("_");

  // Define an array of month names for easy lookup
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Function to add suffix to day (e.g., 1st, 2nd, 3rd, 4th, etc.)
  function getDaySuffix(day) {
    if (day > 3 && day < 21) return `${day}th`; // Handle 11th-13th
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }

  // Get the day, month name, and year
  const formattedDay = getDaySuffix(day);
  const formattedMonth = months[parseInt(month) - 1]; // Adjust for 0-indexing
  const formattedYear = year;

  // Return the formatted string
  return `${formattedDay} ${formattedMonth}, ${formattedYear}`;
}

function generateEmailTemplate(
  userName,
  coderName,
  slotDate,
  slotTime,
  locationUrl
) {
  console.log(locationUrl);
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: linear-gradient(to bottom right, #f9f9f9, #e9ecef);">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4CAF50;">Your Appointment is Confirmed!</h1>
          <p style="font-size: 1.2em; color: #555;">Hi ${userName}, Thank you for booking with us!</p>
        </div>
        <div style="padding: 10px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); animation: fadeIn 2s;">
          <h2 style="color: #333;">Appointment Details</h2>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0; font-size: 1.1em;"><strong>Coder Name:</strong> ${coderName}</li>
            <li style="margin: 10px 0; font-size: 1.1em;"><strong>Date:</strong> ${formatDateString(slotDate)}</li>
            <li style="margin: 10px 0; font-size: 1.1em;"><strong>Time:</strong> ${slotTime}</li>
          </ul>
        </div>
        <div style="text-align: center; margin-top: 20px; animation: bounce 1.5s infinite;">
          <a href="${getBackendUrl()}"  style="text-decoration: none; color: #ffffff; background-color: #4CAF50; padding: 10px 20px; border-radius: 5px; font-size: 1em; transition: background-color 0.3s; ">View Appointment</a>
        </div>
        <footer style="margin-top: 20px; text-align: center; font-size: 0.9em; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Instant Coder Team. All rights reserved.</p>
        </footer>
        <style>
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          a:hover {
            background-color: #45a049;
          }
        </style>
      </div>
    `;
}

async function sendAppointmentEmail(
  userName,
  coderName,
  slotDate,
  slotTime,
  recipientEmail
) {
  const emailContent = generateEmailTemplate(
    userName,
    coderName,
    slotDate,
    slotTime
  );

  const mailOptions = {
    from: process.env.EMAIL_SERVICE_SMTP, // Sender email
    to: recipientEmail, // Recipient email
    subject: "Appointment Confirmation",
    html: emailContent, // Email content in HTML format
  };

  try {
    console.log("Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

let razorpayInstance;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.log("Razorpay keys are not set. Skipping Razorpay initialization.");
}

// API to register user
const registerUser = async (req, res) => {
  try {
    const newUser = await registerUserService(req.body);
    const token = jwt.sign({ newUser }, process.env.JWT_SECRET);
    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("User creation failed:", error.message);

    let statusCode = 500;
    if (error.message.includes("required") || error.message.includes("Invalid") || error.message.includes("valid email") || error.message.includes("Password must")) {
      statusCode = 400;
    } else if (error.message.includes("already registered")) {
      statusCode = 409;
    }

    res.status(statusCode).json({
      error: "User creation failed",
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};


// API to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const callback = async (req, res) => {
  const token = req.body.token; // Token sent by frontend in the POST request body

  if (!token) {
    return res.status(400).send("Token is required");
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "969886296841-a0fr5bnv2rrt22bptihti8o9cabsghh8.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const email = payload["email"]; // Email from Google
    const name = payload["name"]; // Full name from Google

    // Check if user already exists in the database
    let existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      // If the user doesn't exist, register them with a random password
      const randomPassword = crypto.randomBytes(16).toString("hex"); // Generate a random 16-byte password and convert to hex

      // Hash the random password
      const salt = await bcrypt.genSalt(10); // Generate salt for hashing
      const hashedPassword = await bcrypt.hash(randomPassword, salt); // Hash the random password

      // User data for new user
      const userData = {
        name,
        email,
        password: hashedPassword,
      };

      // Create a new user
      const newUser = new userModel(userData);
      existingUser = await newUser.save();

      // Optionally, send the random password to the user via email
      console.log(`New user created. Random password: ${randomPassword}`);
    }

    // Generate a JWT token for the user
    const jwtToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

    // Send back the user info and token
    return res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      token: jwtToken, // JWT token
      user: {
        userId: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error("Error verifying Google ID token:", error);
    return res.status(400).send("Error authenticating with Google");
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment , this needs to be changed and coder speciality needs to be added with fees.
const bookAppointment = async (req, res) => {
  try {
    const { userId, coderId, slotDate, slotTime } = req.body;
    const coderData = await coderModel.findById(coderId).select("-password");

    if (!coderData.available) {
      return res.json({ success: false, message: "Coder Not Available" });
    }

    let slots_booked = coderData.slots_booked;

    // checking for slot availablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    await sendAppointmentEmail(
      userData.name,
      coderData.name,
      slotDate,
      slotTime,
      userData.email
    );
    delete coderData.slots_booked;

    const appointmentData = {
      userId,
      coderId,
      userData,
      coderData,
      amount: coderData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in coderData
    await coderModel.findByIdAndUpdate(coderId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing coder slot
    const { coderId, slotDate, slotTime } = appointmentData;

    const coderData = await coderModel.findById(coderId);

    let slots_booked = coderData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await coderModel.findByIdAndUpdate(coderId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }

    // creating options for razorpay payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    // creation of an order
    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to make payment of appointment using Stripe
const paymentStripe = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { origin } = req.headers;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }

    const currency = process.env.CURRENCY.toLocaleLowerCase();

    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: "Appointment Fees",
          },
          unit_amount: appointmentData.amount * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&appointmentId=${appointmentData._id}`,
      cancel_url: `${origin}/verify?success=false&appointmentId=${appointmentData._id}`,
      line_items: line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  try {
    const { appointmentId, success } = req.body;

    if (success === "true") {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        payment: true,
      });
      return res.json({ success: true, message: "Payment Successful" });
    }

    res.json({ success: false, message: "Payment Failed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  callback,
  registerUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
  paymentStripe,
  verifyStripe,
};
