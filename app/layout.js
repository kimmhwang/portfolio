import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Kim Hwang Yeo — Bioengineering · Global Health · Innovation",
  description:
    "Portfolio of Kim Hwang Yeo — bioengineering professional with a track record in healthcare technology, data analytics, product development, and global health. Based in Singapore and the USA.",
  keywords: ["bioengineering", "medical device engineer", "global health", "FDA regulatory", "digital pathology", "healthcare technology", "portfolio", "Kim Hwang Yeo"],
  openGraph: {
    title: "Kim Hwang Yeo",
    description:
      "Bioengineering · Global Health · Innovation. Building technology that reaches the last mile.",
    type: "website",
    url: "https://kimhwang.me",
    images: ["/files/images/logo.png"],
  },
  icons: {
    icon: "/files/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
