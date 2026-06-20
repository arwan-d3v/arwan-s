"use client";

import Link from "next/link";
import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, LayoutTemplate, Activity, Wrench, Radio, Image as ImageIcon, MessageSquare, Settings, LogOut, Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const adminNavItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "User Mgmt", href: "/admin/users", icon: Users },
    { name: "Subscription", href: "/admin/subscriptions", icon: CreditCard },
    { name: "Content", href: "/admin/content", icon: LayoutTemplate },
    { name: "Trading Mgmt", href: "/admin/trading", icon: Activity },
    { name: "Utility Settings", href: "/admin/utility", icon: Wrench },
    { name: "Broadcast", href: "/admin/broadcast", icon: Radio },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    { name: "Contact Inbox", href: "/admin/contact", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-[#eaeaea] font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Admin Sidebar - Dark Minimalist Gold Accent */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-white/5 bg-black transition-transform duration-300 ease-in-out md:static md:flex md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-white/5">
          <span className="font-display text-lg font-bold tracking-wider text-primary">COMMAND CENTER</span>
          <button className="md:hidden text-muted-foreground hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-0.5 p-3 overflow-y-auto">
          {adminNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-primary"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative max-w-full overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-black/40 px-6 backdrop-blur-md relative z-10">
          <div className="flex items-center md:hidden">
             <button aria-label="Open Menu" onClick={() => setIsSidebarOpen(true)} className="text-white/50 hover:text-primary">
                <Menu className="h-5 w-5" />
             </button>
          </div>
          <div className="ml-auto flex items-center gap-4">
             <div className="text-xs font-mono text-white/30 border border-white/10 px-2 py-1 rounded bg-black">SYS.STATUS: ONLINE</div>
             <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
               <span className="text-primary text-xs font-bold">SA</span>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
