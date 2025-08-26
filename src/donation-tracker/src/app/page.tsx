import Navbar from "./components/Navbar";
import { DM_Sans } from "next/font/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${DM_Sans} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}