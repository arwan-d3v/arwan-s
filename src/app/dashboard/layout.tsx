"use client";

import Link from "next/link";
import { useState } from "react";
import { LayoutDashboard, FileText, BarChart3, Wrench, ArrowUpCircle, UserCircle, LogOut, Menu, X } from "lucide-react";
import { NotificationsDropdown } from "@/components/notifications-dropdown";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "CV Saya", href: "/dashboard/cv", icon: FileText },
    { name: "Trading", href: "/dashboard/trading", icon: BarChart3 },
    { name: "Converter", href: "/dashboard/converter", icon: Wrench },
    { name: "Upgrade", href: "/dashboard/upgrade", icon: ArrowUpCircle },
    { name: "Profil", href: "/dashboard/profile", icon: UserCircle },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Black and Gold theme */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-[var(--card-border)] bg-[#050505] transition-transform duration-300 ease-in-out md:static md:flex md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-[var(--card-border)]">
          <span className="font-display text-xl font-bold text-primary glow-gold">Arwan&apos;space</span>
          <button className="md:hidden text-muted-foreground hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[var(--card-border)]">
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative max-w-full overflow-hidden">
        <header className="relative z-50 flex h-16 shrink-0 items-center justify-between border-b border-[var(--card-border)] bg-black/20 px-6 backdrop-blur-md">
          <div className="flex items-center md:hidden">
             <button aria-label="Open Menu" onClick={() => setIsSidebarOpen(true)} className="text-muted-foreground hover:text-primary">
                <Menu className="h-6 w-6" />
             </button>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <NotificationsDropdown />
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 shrink-0">
              <UserCircle className="h-5 w-5 text-primary" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
