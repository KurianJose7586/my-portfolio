import { researchData } from "@/lib/data";

export default function Research() {
  return (
    <section id="research" className="pt-20">
      <div className="relative">
        <div className="absolute -top-10 right-0 z-20">
          <div className="bg-ink text-white px-8 py-3 border-4 border-ink shadow-[10px_10px_0px_0px_#EB5E93] rotate-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
              {researchData.subtitle}
            </span>
          </div>
        </div>

        <div className="bg-white border-4 border-ink p-12 md:p-20 shadow-[40px_40px_0px_0px_black] rotate-[0.5deg]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
            <div className="lg:w-3/5 space-y-10">
              <h2 className="font-sans text-6xl md:text-8xl font-black leading-none tracking-tighter">
                {researchData.title}
              </h2>
              
              <p className="font-sans text-2xl font-medium leading-relaxed text-ink/90">
                A training-free 3-stage hybrid retrieval framework combining{" "}
                <span className="font-bold underline decoration-cyber-yellow decoration-8 underline-offset-[-4px]">
                  BM25, BGE-large-en-v1.5, and ColBERTv2
                </span>
                . Outperforms standalone dense pipelines on MS MARCO benchmark.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6">
                {researchData.tags.map((tag, i) => (
                  <div 
                    key={i} 
                    className={`bg-paper border-4 border-ink p-4 text-center rotate-[${(i % 2 === 0 ? -2 : 3)}deg]`}
                  >
                    <div className="font-mono text-xs font-bold uppercase opacity-60 mb-1">{tag.label}</div>
                    <div className="font-bold text-lg">{tag.value}</div>
                  </div>
                ))}
              </div>

              <button className="mechanical-button bg-ink text-white px-12 py-5 text-xl w-full md:w-auto">
                {researchData.cta}
              </button>
            </div>

            <div className="lg:w-2/5 w-full flex justify-center">
              <div className="bg-white border-4 border-ink p-12 rotate-[4deg] shadow-[20px_20px_0px_0px_#EB5E93] text-center relative w-full max-w-[320px]">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyber-yellow border-4 border-ink px-6 py-2 font-mono text-sm font-bold uppercase shadow-[4px_4px_0px_0px_black]">
                  BENCHMARK
                </div>
                <div className="text-6xl md:text-7xl font-sans font-black mb-4 leading-none text-punch-pink tracking-tighter w-full overflow-hidden">
                  {researchData.benchmark.score}
                </div>
                <div className="font-mono text-xl font-bold uppercase border-t-8 border-ink pt-6">
                  {researchData.benchmark.metric}
                </div>
                <div className="mt-4 text-xs font-mono font-bold uppercase opacity-60 tracking-widest">
                  {researchData.benchmark.dataset}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
