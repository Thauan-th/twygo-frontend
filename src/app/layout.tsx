import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twygo - Cursos",
  description: "A melhor plataforma de cursos do Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
