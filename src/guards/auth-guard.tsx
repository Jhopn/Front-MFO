"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }
  }, [status, session, router]);
  

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#66A925] flex flex-col justify-center items-center gap-2">
        <h1 className="text-4xl md:text-3xl text-white font-extrabold tracking-wide">
          Carregando...
        </h1>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50 mb-6"></div>
      </div>
    );
  }

  if (status !== "authenticated") {
    return null;
  }

  return <>{children}</>;
}