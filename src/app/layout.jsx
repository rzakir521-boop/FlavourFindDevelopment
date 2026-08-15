import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const heading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "FlavourFind — Find your perfect restaurant in seconds",
  description:
    "AI-powered food discovery. Tell us your cravings, dietary needs and cuisine, and we'll find your perfect restaurant in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
