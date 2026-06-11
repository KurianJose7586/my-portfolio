export default function Marquee() {
  const items = [
    { text: "AI TOOLS FOR LAW & FINANCE", color: "text-white" },
    { text: "AGENTIC WORKFLOWS", color: "text-electric-cyan" },
    { text: "TWINLY AI", color: "text-punch-pink" },
    { text: "CURSOR OS", color: "text-cyber-yellow" },
    { text: "TRIRANK HYBRID RETRIEVAL", color: "text-white" },
    { text: "CABLITE & AI LAWYER", color: "text-electric-cyan" }
  ];

  return (
    <div className="w-screen bg-ink text-white py-6 overflow-hidden -mx-margin-mobile md:-mx-20 border-y-8 border-ink rotate-[-2deg] relative z-30">
      <div className="marquee-track flex whitespace-nowrap gap-16 font-sans text-4xl font-black">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-16">
            <span>{item.text}</span>
            <span className={item.color}>●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
