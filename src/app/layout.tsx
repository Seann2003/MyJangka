import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "@/components/AppWalletProvider";
import { ThirdwebProvider } from "thirdweb/react";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "thirdweb SDK + Next starter",
  description:
    "Starter template for using thirdweb SDK with Next.js App router",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ThirdwebProvider>
            <AppWalletProvider>{children}</AppWalletProvider>
            
          </ThirdwebProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
