"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const path = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    setToken(storedToken);
    setRole(storedRole);
  }, []);

  return (
    <div className="fixed top-0 flex justify-center gap-4 w-full p-8 bg-blue-600 text-white">
      <Link
        href="/"
        className={`${path === "/" ? "font-bold" : "font-normal"}`}
      >
        All User
      </Link>
      {role === "admin" && (
        <Link
          href="/adduser"
          className={`${path === "/adduser" ? "font-bold" : "font-normal"}`}
        >
          Add User
        </Link>
      )}
      {!token && (
        <Link
          href="/login"
          className={`${path === "/login" ? "font-bold" : "font-normal"}`}
        >
          login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
