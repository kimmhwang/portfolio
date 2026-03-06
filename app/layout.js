import "./globals.css";

export const metadata = {
  title: "Kim Hwang Yeo — Bioengineering · Global Health · Innovation",
  description:
    "Portfolio of Kim Hwang Yeo — bioengineering professional working at the intersection of medical technology, healthcare innovation, and systems-level thinking. Based in Singapore and the USA.",
  openGraph: {
    title: "Kim Hwang Yeo",
    description:
      "Bioengineering · Global Health · Innovation. Building technology that reaches the last mile.",
    type: "website",
    // url: "https://kimhwangyeo.com",        // ← Set your domain
    // images: ["/files/images/og-image.jpg"], // ← Set an OG image
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
