import { Users, DollarSign, Activity, FileText } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard — Arwan'space",
};

export default function AdminDashboardPage() {
  const stats = [
    { name: "Total Users", value: "1,248", change: "+12%", icon: Users },
    { name: "Monthly MRR", value: "$4,250", change: "+8%", icon: DollarSign },
    { name: "Active Subscriptions", value: "312", change: "+15%", icon: Activity },
    { name: "CVs Generated", value: "8,942", change: "+24%", icon: FileText },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">System Overview</h1>
        <p className="text-sm text-white/50 mt-1">High-level metrics for Arwan&apos;space platform.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2 rounded-lg bg-white/5">
                 <stat.icon className="h-5 w-5 text-primary" />
               </div>
               <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">
                 {stat.change}
               </span>
            </div>
            <div className="text-3xl font-bold font-mono text-white mb-1">{stat.value}</div>
            <div className="text-sm text-white/50">{stat.name}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h3 className="text-lg font-medium text-white mb-4">Recent Users</h3>
          <div className="space-y-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-white/10"></div>
                     <div>
                       <div className="text-sm font-medium text-white">User_{Math.floor(Math.random()*1000)}</div>
                       <div className="text-xs text-white/40">user{i}@example.com</div>
                     </div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded bg-white/5 text-white/60">Pro Plan</div>
               </div>
             ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h3 className="text-lg font-medium text-white mb-4">System Alerts</h3>
          <div className="space-y-3">
             <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 text-sm flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                <div>
                  <div className="font-medium text-white">High API Usage Detected</div>
                  <div className="text-white/50 text-xs mt-1">Trading module API limit reached 80% capacity.</div>
                </div>
             </div>
             <div className="p-3 rounded-lg border border-white/10 bg-white/5 text-sm flex gap-3">
                <div className="w-2 h-2 rounded-full bg-white/30 mt-1.5 shrink-0"></div>
                <div>
                  <div className="font-medium text-white">Database Backup Completed</div>
                  <div className="text-white/50 text-xs mt-1">Successfully backed up to Cloudflare R2.</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
