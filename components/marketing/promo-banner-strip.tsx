"use client";

import { useQuery } from "@tanstack/react-query";
import { bannersApi } from "@/lib/api";
import { PromoBanner } from "./promo-banner";

export function PromoBannerStrip() {
  const { data } = useQuery({
    queryKey: ["banners", "active"],
    queryFn: bannersApi.getActive,
    staleTime: 5 * 60 * 1000,
  });

  const banners = data?.banners;
  if (!banners?.length) return null;

  return (
    <div className="relative z-50">
      {banners.map((banner) => (
        <PromoBanner key={banner.id} banner={banner} />
      ))}
    </div>
  );
}
