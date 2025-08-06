//
// THEME: Provides theme colors and utility for Nutrition Tracker UI
//
export const COLORS = {
  primary: "#4caf50",
  secondary: "#81c784",
  accent: "#ffb300",
  lightBg: "#f9f9f9",
  lightPanel: "#fff",
  border: "#e0e0e0",
  text: "#222",
  textSoft: "#666",
};

export function themeVars() {
  return {
    "--primary": COLORS.primary,
    "--secondary": COLORS.secondary,
    "--accent": COLORS.accent,
    "--light-bg": COLORS.lightBg,
    "--light-panel": COLORS.lightPanel,
    "--border": COLORS.border,
    "--text": COLORS.text,
    "--text-soft": COLORS.textSoft,
  };
}
