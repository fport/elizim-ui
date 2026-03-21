"use client";

import {
  Package,
  ShoppingCart,
  MessageSquare,
  TrendingUp,
  Eye,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  {
    label: "Toplam Urun",
    value: "24",
    icon: Package,
    color: "text-blue-500 bg-blue-500/10",
    id: "stat-products",
  },
  {
    label: "Bekleyen Siparis",
    value: "3",
    icon: ShoppingCart,
    color: "text-amber-500 bg-amber-500/10",
    id: "stat-orders",
  },
  {
    label: "Yeni Mesaj",
    value: "5",
    icon: MessageSquare,
    color: "text-green-500 bg-green-500/10",
    id: "stat-messages",
  },
  {
    label: "Bu Ay Ziyaretci",
    value: "1.2K",
    icon: Eye,
    color: "text-purple-500 bg-purple-500/10",
    id: "stat-visitors",
  },
];

const RECENT_ORDERS = [
  {
    id: 1,
    customer: "Ayse Hanim",
    product: "Islemeli Bohca",
    status: "Hazirlaniyor",
    date: "Bugun",
  },
  {
    id: 2,
    customer: "Fatma Hanim",
    product: "Dantel Yolluk",
    status: "Kargoya Verildi",
    date: "Dun",
  },
  {
    id: 3,
    customer: "Zeynep Hanim",
    product: "Nakisli Masa Ortusu",
    status: "Teslim Edildi",
    date: "2 gun once",
  },
];

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Hazirlaniyor"
      ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
      : status === "Kargoya Verildi"
        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
        : "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";

  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", color)}>
      {status}
    </span>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div id="dashboard-header" className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Hos geldin, Anne!
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Elizim yonetim paneline hosgeldin. Burada her seyi kolayca yonetebilirsin.
        </p>
      </div>

      {/* Stats */}
      <div id="dashboard-stats" className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.id}
            id={stat.id}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <div
                className={cn(
                  "flex size-11 items-center justify-center rounded-xl",
                  stat.color
                )}
              >
                <stat.icon className="size-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div id="dashboard-orders" className="rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Clock className="size-5 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Son Siparisler</h2>
          </div>
          <div className="flex items-center gap-1 text-xs text-green-500">
            <TrendingUp className="size-3.5" />
            <span>Aktif</span>
          </div>
        </div>
        <div className="divide-y divide-border">
          {RECENT_ORDERS.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between px-5 py-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {order.customer}
                </p>
                <p className="text-xs text-muted-foreground">{order.product}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={order.status} />
                <span className="text-xs text-muted-foreground">
                  {order.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
