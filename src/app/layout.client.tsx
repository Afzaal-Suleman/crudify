"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const protectedRoutes = ["/update", "/adduser"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (protectedRoutes.includes(pathname) && !token && role == "user") {
      router.push("/");
    }
  }, [pathname]);

  return <>{children}</>;
}
