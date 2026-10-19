import Link from "next/link";
import { Gamepad2, Terminal } from "lucide-react";
import { siteConfig } from "@/lib/data";

const LINKS = [
  { href: "#top", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#irl", label: "IRL" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-5 md:px-8 mt-28 md:mt-40 pb-10">
      <div className="border-t-3 border-ink pt-10 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="text-xl font-black uppercase tracking-tight">{siteConfig.name}</p>
          <p className="text-sm text-ink/60 font-medium">AI &amp; Systems Engineer</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="font-mono text-sm font-bold uppercase hover:underline decoration-cyber-yellow decoration-4 underline-offset-4">
              {label}
            </a>
          ))}
          <a href={siteConfig.resume} target="_blank" rel="noreferrer" className="font-mono text-sm font-bold uppercase hover:underline decoration-cyber-yellow decoration-4 underline-offset-4">
            Resume
          </a>
        </nav>
      </div>

      <div className="mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <p className="font-mono text-sm text-ink/50">© {new Date().getFullYear()} {siteConfig.name}</p>
        <div className="flex gap-3">
          <Link href="/terminal" className="mechanical-button bg-electric-cyan px-4 py-2.5 text-sm">
            <Terminal size={18} strokeWidth={2.5} /> Terminal
          </Link>
          <Link href="/arcade" className="mechanical-button bg-white px-4 py-2.5 text-sm">
            <Gamepad2 size={18} strokeWidth={2.5} /> Arcade
          </Link>
        </div>
      </div>
    </footer>
  );
}
