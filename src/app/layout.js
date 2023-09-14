import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DS | Drum Machine",
  description:
    "A simple Next.js drum machine. You may not create your next hit on here, but if you did, it sure would make for a good backstory...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
