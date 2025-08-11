import { ReactNode } from "react";
import { AuthGuard } from "@/guards/auth-guard";

const PrivateLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
};

export default PrivateLayout;