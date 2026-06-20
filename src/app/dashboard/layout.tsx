import Link from "next/link";
import { LayoutDashboard, FileText, BarChart3, Wrench, ArrowUpCircle, UserCircle, Bell, LogOut, Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "CV Saya", href: "/dashboard/cv", icon: FileText },
    { name: "Trading", href: "/dashboard/trading", icon: BarChart3 },
    { name: "Converter", href: "/dashboard/converter", icon: Wrench },
    { name: "Upgrade", href: "/dashboard/upgrade", icon: ArrowUpCircle },
    { name: "Profil", href: "/dashboard/profile", icon: UserCircle },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar - Black and Gold theme */}
      <aside className="hidden w-64 flex-col border-r border-[var(--card-border)] bg-black/40 backdrop-blur-md md:flex">
        <div className="flex h-16 items-center px-6 border-b border-[var(--card-border)]">
          <span className="font-display text-xl font-bold text-primary glow-gold">Arwan&apos;space</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
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
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="flex h-16 items-center justify-between border-b border-[var(--card-border)] bg-black/20 px-6 backdrop-blur-md">
          <div className="flex items-center md:hidden">
             <button className="text-muted-foreground hover:text-primary">
                <Menu className="h-6 w-6" />
             </button>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-primary">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
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
