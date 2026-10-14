import { Playfair_Display, Plus_Jakarta_Sans, Caveat } from "next/font/google";

export const fontTitle = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-title-font",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const fontBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body-font",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontHand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand-font",
  display: "swap",
  weight: ["400", "600", "700"],
});
