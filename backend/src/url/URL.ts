import { config } from "dotenv";

config();

export const URL = {
  localURL: "http://localhost:4000",
  prodURL:
    process.env.NODE_ENV === "production"
      ? "https://mealstaer.onrender.com"
      : "http://localhost:4000",
};
