"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/auth-provider/auth-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({ children, session }: Readonly<{ children: React.ReactNode, session?: any; }>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}   >
        <QueryClientProvider client={queryClient}>
          <AuthProvider session={session}>
            {children}
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}


