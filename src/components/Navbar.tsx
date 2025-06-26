"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const path = usePathname();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

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
