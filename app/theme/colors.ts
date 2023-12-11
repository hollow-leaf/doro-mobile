const palette = {
  neutral100: "#FFFFFF",  // White
  neutral200: "#EEEEEE",
  neutral300: "#BDBDBD",
  neutral400: "#9E9E9E",
  neutral500: "#757575",  // Gray
  neutral600: "#616161",
  neutral700: "#424242",
  neutral800: "#212121",  // Dark Gray
  neutral900: "#000000",  // Black

  primary100: "#BBDEFB",  // Light Blue
  primary200: "#90CAF9",
  primary300: "#64B5F6",
  primary400: "#42A5F5",
  primary500: "#2196F3",  // Blue

  secondary100: "#CFD8DC",  // Light Blue Gray
  secondary200: "#B0BEC5",
  secondary300: "#90A4AE",
  secondary400: "#78909C",
  secondary500: "#607D8B",  // Blue Gray

  accent100: "#D1C4E9",  // Light Purple
  accent200: "#B39DDB",
  accent300: "#9575CD",
  accent400: "#7E57C2",
  accent500: "#673AB7",  // Deep Purple

  angry100: "#EF9A9A",  // Light Red
  angry500: "#D32F2F",  // Deep Red

  overlay20: "rgba(33, 150, 243, 0.2)",  // Translucent Blue
  overlay50: "rgba(33, 150, 243, 0.5)",

} as const;

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral100,  // White text for dark backgrounds
  textDim: palette.neutral500,
  background: palette.neutral800,  // Dark background
  surface: palette.neutral700,  // For card-like surfaces
  border: palette.neutral300,
  tint: palette.primary500,  // Blue for interactive elements
  separator: palette.neutral300,
  error: palette.angry500,  // For errors
  errorBackground: palette.angry100,
};
