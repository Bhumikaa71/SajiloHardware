"use client"; // ✅ yo add garnus

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetVendorProfileQuery } from "@/services/vendorApi";

export const useVendorAuth = () => {
  const router = useRouter();
  const { data, error, isLoading } = useGetVendorProfileQuery();

  useEffect(() => {
    if (error && 'status' in error && (error.status === 403 || error.status === 401)) {
      localStorage.removeItem("vn-sh-token");
      document.cookie = "vn-sh-token=; path=/; max-age=0";
      router.push("/login");
    }
  }, [error]);

  return { data, isVendorLoading: isLoading };
};