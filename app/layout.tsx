import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextAuthSessionProvider from "./providers/sessionProvider";
import Providers from "./providers/provider";
import {Outfit} from 'next/font/google'


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


const outfit = Outfit({ subsets:['latin']})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={outfit.className}
      >
        <NextAuthSessionProvider>
          <Providers>{children}</Providers>
          <Toaster />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
