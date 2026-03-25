export const FEATURE_KEYS = ["router", "axios", "redux", "tailwind", "eslint", "prettier"];

export const FEATURE_LABELS = {
  router: "Router",
  axios: "Axios",
  redux: "Redux Toolkit",
  tailwind: "Tailwind CSS",
  eslint: "ESLint",
  prettier: "Prettier",
};

export const FEATURE_CHOICES = FEATURE_KEYS.map((value) => ({
  name: FEATURE_LABELS[value],
  value,
}));
