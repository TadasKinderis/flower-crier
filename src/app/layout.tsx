import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bulma/css/bulma.min.css";
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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
