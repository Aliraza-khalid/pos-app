import React, { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import isAuthenticated from "@/utils/isAuthenticated";

export default function DashboardContainer({ children }: PropsWithChildren) {
  const router = useRouter();

  useEffect(() => {
    !isAuthenticated() && router.replace("/login");
  }, []);

  return children;
}
