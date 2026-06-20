import { THEME_CONFIGS } from "@/lib/theme_configs";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function PublicCVPage({ params }: { params: { slug: string } }) {
  // Mock fetching CV data based on slug
  const cvData = {
    name: "Traveler Explorer",
    title: "Senior Fullstack Engineer",
    summary: "Passionate engineer building Liquid Glass and Claymorphism interfaces with robust backends.",
    email: "hello@example.com",
    themeId: THEME_CONFIGS[0].id,
  };

  const theme = THEME_CONFIGS.find(t => t.id === cvData.themeId) || THEME_CONFIGS[0];

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
        fontFamily: theme.typography.fontFamily
      }}
    >
      {/* Dev toolbar (mock) */}
      <div className="fixed top-4 left-4 right-4 max-w-4xl mx-auto p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex justify-between items-center z-50 shadow-2xl">
         <Link href="/dashboard/cv" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
           <ArrowLeft className="w-4 h-4" /> Edit CV
         </Link>
         <div className="text-sm font-mono text-white/50">arwan.space/r/{params.slug}</div>
         <div className="flex gap-2">
            <span className="px-2 py-1 bg-white/10 text-white rounded text-xs">Theme: {theme.name}</span>
            <span className="px-2 py-1 bg-white/10 text-white rounded text-xs">Layout: {theme.layout_id}</span>
         </div>
      </div>

      <main className="max-w-4xl mx-auto pt-24 px-6 pb-20">
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-2" style={{ color: theme.palette.primary }}>{cvData.name}</h1>
          <p className="text-2xl mb-4 opacity-80" style={{ color: theme.palette.secondary }}>{cvData.title}</p>
          <p className="max-w-2xl text-lg leading-relaxed opacity-90">{cvData.summary}</p>
        </header>

        <section className="mb-12">
           <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
             <span className="w-8 h-1 rounded-full" style={{ backgroundColor: theme.palette.accent }}></span>
             Experience
           </h2>
           <div className="space-y-6">
              <div className="p-6 rounded-2xl border" style={{ borderColor: `${theme.palette.text}20`, backgroundColor: `${theme.palette.text}05` }}>
                <h3 className="text-xl font-medium">Software Engineer @ Arwan&apos;space</h3>
                <p className="opacity-70 mb-3">2023 - Present</p>
                <p>Developed the core ecosystem including AI integrations, trading dashboards, and dynamic CV builders.</p>
              </div>
           </div>
        </section>

        <section className="mb-12">
           <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
             <span className="w-8 h-1 rounded-full" style={{ backgroundColor: theme.palette.accent }}></span>
             Skills
           </h2>
           <div className="flex flex-wrap gap-3">
              {['React', 'Next.js', 'Supabase', 'Tailwind CSS'].map(skill => (
                <span key={skill} className="px-4 py-2 rounded-full border text-sm" style={{ borderColor: theme.palette.primary, color: theme.palette.primary }}>
                  {skill}
                </span>
              ))}
           </div>
        </section>

        <footer className="pt-8 border-t flex justify-between items-center" style={{ borderColor: `${theme.palette.text}20` }}>
           <p className="opacity-60 text-sm">© {new Date().getFullYear()} {cvData.name}</p>
           <a href={`mailto:${cvData.email}`} className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: theme.palette.accent }}>
              Contact Me <ExternalLink className="w-4 h-4" />
           </a>
        </footer>
      </main>
    </div>
  );
}
