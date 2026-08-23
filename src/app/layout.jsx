import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
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

const SITE_URL = "https://flavour-find-development.vercel.app";
const TITLE = "FlavourFind — Find your perfect restaurant in seconds";
const DESCRIPTION =
  "AI-powered food discovery. Tell us your cravings, dietary needs and cuisine, and we'll find your perfect restaurant in seconds.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "restaurant finder",
    "food discovery app",
    "AI restaurant recommendations",
    "find restaurants near me",
    "dietary filters restaurants",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FlavourFind",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "FlavourFind",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport = {
  themeColor: "#FFA500",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
