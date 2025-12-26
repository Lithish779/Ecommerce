// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";

// import User from "../models/user.js";
// import Otp from "../models/Otp.js";
// import { generateOTP, hashOTP } from "../utils/otp.js";

// const router = express.Router();

// /* ================= SEND OTP (SIGNUP) ================= */
// router.post("/signup/send-otp", async (req, res) => {
//   try {
//     const { contact } = req.body;

//     if (!contact) {
//       return res.status(400).json({ msg: "Email required" });
//     }

//     const exists = await User.findOne({ email: contact });
//     if (exists) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     const otp = generateOTP();
//     const otpHash = hashOTP(otp);

//     await Otp.deleteMany({ contact });

//     await Otp.create({
//       contact,
//       otpHash,
//       expiresAt: new Date(Date.now() + 2 * 60 * 1000),
//     });

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       to: contact,
//       subject: "Signup OTP",
//       text: `Your OTP is ${otp}. Valid for 2 minutes.`,
//     });

//     res.json({ msg: "OTP sent successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "OTP failed" });
//   }
// });

// /* ================= VERIFY OTP + SIGNUP ================= */
// router.post("/signup/verify-otp", async (req, res) => {
//   const { name, contact, password, otp } = req.body;

//   if (!name || !contact || !password || !otp) {
//     return res.status(400).json({ msg: "All fields required" });
//   }

//   const record = await Otp.findOne({ contact });

//   if (!record || record.expiresAt < new Date()) {
//     return res.status(400).json({ msg: "OTP expired" });
//   }

//   if (hashOTP(otp) !== record.otpHash) {
//     return res.status(400).json({ msg: "Invalid OTP" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await User.create({
//     name,
//     email: contact,
//     password: hashedPassword,
//     isVerified: true,
//   });

//   await Otp.deleteOne({ contact });

//   res.json({ msg: "Signup successful" });
// });

// /* ================= LOGIN ================= */
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ msg: "All fields required" });
//   }

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ msg: "User not found" });
//   }

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) {
//     return res.status(400).json({ msg: "Wrong password" });
//   }

//   const token = jwt.sign(
//     { id: user._id },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );

//   res.json({
//     msg: "Login successful",
//     token,
//     user: { name: user.name, email: user.email },
//   });
// });

// /* ================= FORGOT PASSWORD – SEND OTP ================= */
// router.post("/forgot-password/send-otp", async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ msg: "User not found" });
//   }

//   const otp = generateOTP();
//   const otpHash = hashOTP(otp);

//   await Otp.deleteMany({ contact: email });

//   await Otp.create({
//     contact: email,
//     otpHash,
//     expiresAt: new Date(Date.now() + 2 * 60 * 1000),
//   });

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     to: email,
//     subject: "Reset Password OTP",
//     text: `Your OTP is ${otp}. Valid for 2 minutes.`,
//   });

//   res.json({ msg: "OTP sent to email" });
// });

// /* ================= VERIFY OTP + RESET PASSWORD ================= */
// router.post("/forgot-password/verify-otp", async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   const record = await Otp.findOne({ contact: email });

//   if (!record || record.expiresAt < new Date()) {
//     return res.status(400).json({ msg: "OTP expired" });
//   }

//   if (hashOTP(otp) !== record.otpHash) {
//     return res.status(400).json({ msg: "Invalid OTP" });
//   }

//   const hashed = await bcrypt.hash(newPassword, 10);

//   await User.updateOne(
//     { email },
//     { password: hashed }
//   );

//   await Otp.deleteOne({ contact: email });

//   res.json({ msg: "Password reset successful" });
// });

// export default router;
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

import User from "../models/user.js";
import Otp from "../models/Otp.js";
import { generateOTP, hashOTP } from "../utils/otp.js";

const router = express.Router();

/* ================= GOOGLE CLIENT ================= */
const googleClient = new OAuth2Client(
  "192818920134-btagci97kjs33o5pjfpi380urt5a4c88.apps.googleusercontent.com"
);

/* ================= SEND OTP (SIGNUP) ================= */
router.post("/signup/send-otp", async (req, res) => {
  try {
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).json({ msg: "Email required" });
    }

    const exists = await User.findOne({ email: contact });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const otp = generateOTP();
    const otpHash = hashOTP(otp);

    await Otp.deleteMany({ contact });

    await Otp.create({
      contact,
      otpHash,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000),
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: contact,
      subject: "Signup OTP",
      text: `Your OTP is ${otp}. Valid for 2 minutes.`,
    });

    res.json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "OTP failed" });
  }
});

/* ================= VERIFY OTP + SIGNUP ================= */
router.post("/signup/verify-otp", async (req, res) => {
  const { name, contact, password, otp } = req.body;

  if (!name || !contact || !password || !otp) {
    return res.status(400).json({ msg: "All fields required" });
  }

  const record = await Otp.findOne({ contact });

  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ msg: "OTP expired" });
  }

  if (hashOTP(otp) !== record.otpHash) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email: contact,
    password: hashedPassword,
    isVerified: true,
    provider: "local",
  });

  await Otp.deleteOne({ contact });

  res.json({ msg: "Signup successful" });
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields required" });
  }

  const user = await User.findOne({ email });
  if (!user || !user.password) {
    return res.status(400).json({ msg: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ msg: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    msg: "Login successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

/* ================= GOOGLE LOGIN ================= */
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ msg: "Token missing" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience:
        "192818920134-btagci97kjs33o5pjfpi380urt5a4c88.apps.googleusercontent.com",
    });

    const { email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        isVerified: true,
        provider: "google",
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Google login successful",
      token: jwtToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(401).json({ msg: "Google authentication failed" });
  }
});

/* ================= FORGOT PASSWORD – SEND OTP ================= */
router.post("/forgot-password/send-otp", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const otp = generateOTP();
  const otpHash = hashOTP(otp);

  await Otp.deleteMany({ contact: email });

  await Otp.create({
    contact: email,
    otpHash,
    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Reset Password OTP",
    text: `Your OTP is ${otp}. Valid for 2 minutes.`,
  });

  res.json({ msg: "OTP sent to email" });
});

/* ================= VERIFY OTP + RESET PASSWORD ================= */
router.post("/forgot-password/verify-otp", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const record = await Otp.findOne({ contact: email });

  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ msg: "OTP expired" });
  }

  if (hashOTP(otp) !== record.otpHash) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await User.updateOne(
    { email },
    { password: hashed }
  );

  await Otp.deleteOne({ contact: email });

  res.json({ msg: "Password reset successful" });
});

export default router;
