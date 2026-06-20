"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
  is_read: boolean;
  created_at: string;
}

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        const json = await res.json();
        if (json.data) {
          setNotifications(json.data);
          setUnreadCount(json.data.filter((n: Notification) => !n.is_read).length);
        }
      } catch {
        console.error("Failed to fetch notifications");
      }
    };

    fetchNotifications();
  }, []);

  const getIcon = (type: string) => {
     switch(type) {
       case "success": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
       case "warning": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
       case "error": return <AlertTriangle className="h-5 w-5 text-red-500" />;
       default: return <Info className="h-5 w-5 text-blue-500" />;
     }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-muted-foreground hover:text-primary transition-colors focus:outline-none"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-[var(--card-border)] bg-black/80 backdrop-blur-xl shadow-2xl z-50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--card-border)]">
              <span className="font-bold">Notifications</span>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-white">
                 <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
               {notifications.length === 0 ? (
                  <div className="text-center py-6 text-sm text-muted-foreground">No new notifications</div>
               ) : (
                  notifications.slice(0, 5).map((notif) => (
                    <div key={notif.id} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${!notif.is_read ? 'bg-primary/5' : 'hover:bg-white/5'}`}>
                       <div className="mt-0.5 shrink-0">{getIcon(notif.type)}</div>
                       <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${!notif.is_read ? 'text-white' : 'text-muted-foreground'}`}>{notif.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{notif.message}</p>
                       </div>
                       {!notif.is_read && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>}
                    </div>
                  ))
               )}
            </div>

            <div className="p-3 border-t border-[var(--card-border)] text-center bg-black/40">
               <Link href="/dashboard/notifications" onClick={() => setIsOpen(false)} className="text-xs font-medium text-primary hover:underline">
                  View All Notifications
               </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
