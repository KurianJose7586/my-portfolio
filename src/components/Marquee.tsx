const items = [
  { text: "AI TOOLS FOR LAW & FINANCE", color: "text-white" },
  { text: "AGENTIC WORKFLOWS", color: "text-electric-cyan" },
  { text: "TWINLY AI", color: "text-punch-pink" },
  { text: "CURSOR OS", color: "text-cyber-yellow" },
  { text: "TRIRANK HYBRID RETRIEVAL", color: "text-white" },
  { text: "CABLITE & AI LAWYER", color: "text-electric-cyan" },
];

export default function Marquee() {
  return (
    <div className="overflow-hidden py-6" aria-hidden="true">
      <div className="w-[110%] -ml-[5%] bg-ink text-white py-5 -rotate-[1.5deg]">
        <div className="marquee-track flex w-max whitespace-nowrap gap-12 font-sans text-2xl md:text-4xl font-black tracking-tight">
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{item.text}</span>
              <span className={item.color}>●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
