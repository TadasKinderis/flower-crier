import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../flower-crier.css";
import "@fortawesome/fontawesome-free-regular";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flower Crier",
  description: "Flower Girl and Town Crier calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
