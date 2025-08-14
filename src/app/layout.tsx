"use client";
import "./globals.css";
import AuthProvider from "@/providers/auth-provider/auth-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children, session }: Readonly<{ children: React.ReactNode, session?: any; }>) {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider session={session}>
        <html>
               <body>
                    {children}
                 </body>
              </html>
      </AuthProvider>
    </QueryClientProvider>
  );
}


