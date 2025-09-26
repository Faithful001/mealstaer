import { config } from "dotenv";

config();

module.exports = {
  URL: {
    localURL: "http://localhost:5173",
    prodURL:
      process.env.NODE_ENV === "production"
        ? "https://mealstaerr.vercel.app"
        : "http://localhost:5173",
  },
};
