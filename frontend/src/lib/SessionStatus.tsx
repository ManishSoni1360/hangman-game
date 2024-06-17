"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const SessionStatus = ({ children }: { children: ReactNode }) => {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (sessionStatus !== "loading") {
      if (
        (pathname === "login" || pathname === "register") &&
        sessionStatus === "authenticated"
      )
        router.push("/");
      else if (pathname !== "register" && sessionStatus !== "authenticated")
        router.push("/login");
    }
  }, [sessionStatus, router, pathname]);

  return children;
};

export default SessionStatus;
