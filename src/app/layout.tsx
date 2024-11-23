import type { Metadata } from "next";
import "./globals.css";

import ReactQueryProvider from "@/contexts/src/contexts/react-query-provider";


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
    <html lang="en" suppressHydrationWarning>
      <body >
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
