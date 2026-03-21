"use client";

import { AdminSidebar } from "@/components/admin/sidebar";
import { OnboardingTour } from "@/components/admin/onboarding-tour";
import { useSidebarStore } from "@/stores/sidebar-store";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const collapsed = useSidebarStore((s) => s.collapsed);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          collapsed ? "ml-16" : "ml-60"
        )}
      >
        {children}
      </main>
      <OnboardingTour />
    </div>
  );
}
