import { motion, AnimatePresence } from "framer-motion";
import { researchData } from "@/lib/data";

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResearchModal({ isOpen, onClose }: ResearchModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-paper border-[6px] border-ink shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 bg-white border-4 border-ink flex items-center justify-center hover:bg-punch-pink hover:text-white transition-colors z-50 group"
            >
              <span className="material-symbols-outlined font-black">close</span>
            </button>

            <div className="p-8 md:p-16">
              <div className="bg-ink text-white px-6 py-2 border-4 border-ink shadow-[8px_8px_0px_0px_#EB5E93] inline-block rotate-2 mb-10">
                <span className="font-mono text-sm font-bold uppercase tracking-widest text-white">
                  {researchData.subtitle}
                </span>
              </div>

              <h2 className="font-sans text-5xl md:text-7xl font-black leading-none tracking-tighter mb-8">
                {researchData.title}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {researchData.authors.map((author, i) => (
                  <span key={i} className={`font-mono text-xs font-bold uppercase px-3 py-1 border-2 border-ink ${author === "Kurian Jose" ? 'bg-cyber-yellow' : 'bg-white'}`}>
                    {author}
                  </span>
                ))}
              </div>

              <p className="font-sans text-2xl font-medium leading-relaxed text-ink/90 mb-12">
                A training-free 3-stage hybrid retrieval framework combining{" "}
                <span className="font-bold underline decoration-cyber-yellow decoration-8 underline-offset-[-4px]">
                  BM25, BGE-large-en-v1.5, and ColBERTv2
                </span>
                . Outperforms standalone dense pipelines on MS MARCO benchmark.
              </p>

              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-3/5">
                  <div className="grid grid-cols-2 gap-4">
                    {researchData.tags.map((tag, i) => (
                      <div 
                        key={i} 
                        className={`bg-white border-4 border-ink p-4 text-center rotate-[${(i % 2 === 0 ? -1 : 2)}deg] hover:bg-cyber-yellow hover:scale-105 transition-all`}
                      >
                        <div className="font-mono text-xs font-bold uppercase opacity-60 mb-1">{tag.label}</div>
                        <div className="font-bold text-lg">{tag.value}</div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={researchData.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mechanical-button bg-ink text-white px-12 py-5 text-xl w-full text-center no-underline inline-block mt-8"
                  >
                    {researchData.cta}
                  </a>
                </div>

                <div className="lg:w-2/5 flex justify-center">
                  <div className="bg-white border-4 border-ink p-10 rotate-[3deg] shadow-[12px_12px_0px_0px_#EB5E93] text-center relative w-full">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-cyber-yellow border-4 border-ink px-4 py-1.5 font-mono text-xs font-bold uppercase shadow-[4px_4px_0px_0px_black]">
                      BENCHMARK
                    </div>
                    <div className="text-5xl md:text-6xl font-sans font-black mb-4 leading-none text-punch-pink tracking-tighter w-full overflow-hidden">
                      {researchData.benchmark.score}
                    </div>
                    <div className="font-mono text-lg font-bold uppercase border-t-8 border-ink pt-4">
                      {researchData.benchmark.metric}
                    </div>
                    <div className="mt-3 text-xs font-mono font-bold uppercase opacity-60 tracking-widest">
                      {researchData.benchmark.dataset}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
