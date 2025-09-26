export const URL = {
  localURL: "http://localhost:4000",
  prodURL:
    import.meta.env.MODE === "production"
      ? "https://mealstaer.pxxl.xyz"
      : "http://localhost:4000",
};
