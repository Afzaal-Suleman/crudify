"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = (allowedRoles: string[] = []) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Ensure this runs on client
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || (allowedRoles.length && !allowedRoles.includes(role!))) {
      router.replace("/");
    } else {
      setIsAuthorized(true);
    }

    setLoading(false);
  }, [router]);

  return { loading, isAuthorized };
};

export default useAuth;
