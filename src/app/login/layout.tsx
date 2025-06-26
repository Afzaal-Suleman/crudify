"use client";
import { redirect } from "next/navigation";

const Loginlayout = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (token) {
    redirect("/");
  }
  return <div>{children}</div>;
};

export default Loginlayout;
