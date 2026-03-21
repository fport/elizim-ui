"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { useSidebarStore } from "@/stores/sidebar-store";

const NAV_ITEMS = [
  {
    label: "Panel",
    href: "/tr/admin",
    icon: LayoutDashboard,
    id: "nav-dashboard",
  },
  {
    label: "Urunler",
    href: "/tr/admin/urunler",
    icon: Package,
    id: "nav-products",
  },
  {
    label: "Siparisler",
    href: "/tr/admin/siparisler",
    icon: ShoppingCart,
    id: "nav-orders",
  },
  {
    label: "Mesajlar",
    href: "/tr/admin/mesajlar",
    icon: MessageSquare,
    id: "nav-messages",
  },
  {
    label: "Galeri",
    href: "/tr/admin/galeri",
    icon: ImageIcon,
    id: "nav-gallery",
  },
  {
    label: "Ayarlar",
    href: "/tr/admin/ayarlar",
    icon: Settings,
    id: "nav-settings",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const resetTour = useOnboardingStore((s) => s.resetTour);
  const collapsed = useSidebarStore((s) => s.collapsed);
  const toggle = useSidebarStore((s) => s.toggle);

  return (
    <aside
      id="admin-sidebar"
      className={cn(
        "fixed inset-y-0 start-0 z-30 flex flex-col border-e border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <Image
          src="/logo.webp"
          alt="Elizim"
          width={36}
          height={36}
          className="size-9 shrink-0"
        />
        {!collapsed && (
          <span className="font-heading text-lg font-semibold text-sidebar-foreground">
            Elizim
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/tr/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              id={item.id}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="size-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-1 border-t border-sidebar-border px-2 py-3">
        <button
          id="tour-help-button"
          onClick={resetTour}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
            "text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
          )}
          title={collapsed ? "Yardim - Turu Baslat" : undefined}
        >
          <HelpCircle className="size-5 shrink-0" />
          {!collapsed && <span>Yardim</span>}
        </button>

        <button
          onClick={toggle}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
            "text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
          )}
        >
          {collapsed ? (
            <ChevronRight className="size-5 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="size-5 shrink-0" />
              <span>Daralt</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
