import "./globals.css";

export const metadata = {
  title: "Kim Hwang Yeo — Bioengineering · Global Health · Innovation",
  description:
    "Portfolio of Kim Hwang Yeo — bioengineering professional with a track record in healthcare technology, data analytics, product development, and global health. Based in Singapore and the USA.",
  openGraph: {
    title: "Kim Hwang Yeo",
    description:
      "Bioengineering · Global Health · Innovation. Building technology that reaches the last mile.",
    type: "website",
    url: "https://kimhwang.me",        // ← Set your domain
    // images: ["/files/images/og-image.jpg"], // ← Set an OG image
  },
  icons: {
    icon: "/files/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
