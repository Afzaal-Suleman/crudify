"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Loginlayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    }
  }, []);
  return <div>{children}</div>;
};

export default Loginlayout;
