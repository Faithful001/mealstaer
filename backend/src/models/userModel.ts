import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    user_name: {
      type: String,
      unique: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      unique: false,
    },
    googleId: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // Allows multiple null values for non-Google users
    },
  },
  { timestamps: true }
);

function isStrongPassword(password) {
  if (password) {
    if (password.length < 8) {
      return false;
    }
    if (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[¬`!"£$%^&*()-_=+/|[\]{};'@\\#~?><]/.test(password)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

UserSchema.statics.signup = async function (user_name, email, password) {
  if (!user_name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    user_name,
    email,
    password: hashedPassword,
  }); // Use the hashed password
  return {
    user_name: user.user_name,
    email: user.email,
    createdAt: user.createdAt,
    updateAt: user.updatedAt,
  };
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email");
  }

  // If user has no password, they registered with Google
  if (!user.password) {
    throw new Error("Please sign in with Google");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  // Return the user object without the password
  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const model = mongoose.model("User", UserSchema, "mealUsers");

module.exports = model;
