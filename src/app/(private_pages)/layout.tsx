import { ReactNode } from "react";
import { AuthGuard } from "@/guards/auth-guard";
import { Sidebar } from "@/components/sidebar/sidebar";
import { AuthInterceptor } from "@/providers/auth-interceptor/auth-interceptor";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const PrivateLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <Sidebar/>
      <AuthGuard>
        <AuthInterceptor />
        {children}
         <Toaster />
      </AuthGuard>
    </SidebarProvider>
  )
};

export default PrivateLayout;