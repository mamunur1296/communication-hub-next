import "./globals.css";

export const metadata = {
  title: "Communication Hub",
  description: "Communication Hub workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
