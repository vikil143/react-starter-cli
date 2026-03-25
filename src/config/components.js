export const COMPONENT_KEYS = ["button", "input", "card", "modal", "navbar", "loader"];

export const COMPONENT_LABELS = {
  button: "Button",
  input: "Input",
  card: "Card",
  modal: "Modal",
  navbar: "Navbar",
  loader: "Loader",
};

export const COMPONENT_CHOICES = COMPONENT_KEYS.map((value) => ({
  name: COMPONENT_LABELS[value],
  value,
}));
