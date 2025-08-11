import { ReactNode } from "react";
import { AuthGuard } from "@/guards/authGuard";

const PrivateLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
};

export default PrivateLayout;