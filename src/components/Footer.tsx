import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 flex flex-col relative z-50 bg-transparent px-4 md:px-10">
      {/* Top Divider */}
      <div className="border-t-[4px] border-ink w-full mb-10"></div>
      
      {/* Middle Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8">
        <div>
          <h2 className="font-sans text-xl font-bold uppercase tracking-wider text-ink mb-1">
            {siteConfig.name}
          </h2>
          <p className="font-sans text-gray-600 text-sm font-semibold">
            AI & Systems Engineer
          </p>
        </div>
        
        <div className="flex flex-wrap gap-8">
          <a href="#hero" className="font-sans font-bold text-ink hover:text-electric-cyan transition-colors">Home</a>
          <a href="#about" className="font-sans font-bold text-ink hover:text-cyber-yellow transition-colors">About</a>
          <a href="#projects" className="font-sans font-bold text-ink hover:text-punch-pink transition-colors">Experience</a>
          <a href="#research" className="font-sans font-bold text-ink hover:text-electric-cyan transition-colors">Skills</a>
        </div>
      </div>
      
      {/* Bottom Divider */}
      <div className="border-t-[4px] border-ink w-full mb-10"></div>
      
      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-mono text-gray-500 text-sm font-bold">
          © {new Date().getFullYear()} {siteConfig.name}
        </div>
        
        <button className="mechanical-button bg-electric-cyan border-[4px] border-ink px-6 py-3 shadow-[6px_6px_0px_0px_black] font-mono font-bold hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black] transition-all flex items-center gap-3">
          <span className="font-black text-xl leading-none">&gt;_</span> 
          <span className="text-lg">Terminal</span>
        </button>
      </div>
    </footer>
  );
}
