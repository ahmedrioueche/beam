import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "./context/NextAuthProvider";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
  title: "Beam",
  description: "A live streaming app",
  icons: {
    icon: '/icons/beam.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NextAuthProvider>
          <ThemeProvider>
              {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
