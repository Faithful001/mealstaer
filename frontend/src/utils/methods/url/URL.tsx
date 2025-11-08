export const URL = {
  localURL: "http://localhost:4000",
  prodURL:
    import.meta.env.MODE === "production"
      ? "https://mealstaer.onrender.com"
      : "http://localhost:4000",
};
