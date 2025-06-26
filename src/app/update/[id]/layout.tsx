"use client";
import { redirect } from "next/navigation";
export default function UpdateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token && role !== "admin") {
    redirect("/login");
  }
  return (
    <div>
      <aside>Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}
