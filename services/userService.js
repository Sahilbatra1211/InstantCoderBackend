import prisma from "../config/prismaClient.js";
import validator from "validator";
import bcrypt from "bcrypt";

export const registerUserService = async (data) => {
  let { name, email, password } = data;

  // Trim spaces from input fields
  name = name?.trim();
  email = email?.trim().toLowerCase();
  password = password?.trim();

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  // Name validation: only letters and spaces, length between 2-50
  if (!/^[a-zA-Z\s]{2,50}$/.test(name)) {
    throw new Error("Invalid name format");
  }

  // Email validation
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email");
  }

  // Password strength validation
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
    throw new Error("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character");
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    throw new Error("This email is already registered");
  }

  // Hash password securely
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      is_mentor: false
    },
    select: {
      name: true,
      email: true,
      is_mentor: true,
    }
  });

  return { success: true, user: newUser };
};



