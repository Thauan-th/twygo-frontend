import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider"
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
    <html lang="en" suppressHydrationWarning>
      <body >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
