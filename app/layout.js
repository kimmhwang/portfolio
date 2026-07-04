import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Kim Hwang Yeo — Healthcare Strategy · Medical Devices · Global Health",
  description:
    "Portfolio of Kim Hwang Yeo — bioengineering professional with a track record in healthcare technology, data analytics, product development, and global health. Based in Singapore and the USA.",
  keywords: ["bioengineering", "medical device engineer", "global health", "FDA regulatory", "digital pathology", "healthcare technology", "portfolio", "Kim Hwang Yeo"],
  openGraph: {
    title: "Kim Hwang Yeo",
    description:
      "Healthcare strategy · medical devices · global health. Moving medical innovation from lab to last mile.",
    type: "website",
    url: "https://kimhwang.me",
    images: ["/files/images/logo.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  // suppressHydrationWarning: the theme-boot script below stamps
  // data-pv4-theme on <html> before React hydrates.
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Blocking theme boot: stamp the saved (or OS-preferred) theme on
            <html> before the page content parses, so returning dark/contrast
            users never see a light flash. The portfolio CSS keys off this
            attribute; React state only drives the toggle icon. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('pv4-theme');if(t!=='light'&&t!=='dark'&&t!=='contrast'){t=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-pv4-theme',t)}catch(e){}",
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
