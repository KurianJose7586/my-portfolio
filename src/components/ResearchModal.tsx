import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { researchData } from "@/lib/data";

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResearchModal({ isOpen, onClose }: ResearchModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-3 border-ink shadow-brutal-lg"
          >
            <button
              onClick={onClose}
              aria-label="Close paper details"
              className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 bg-white border-3 border-ink flex items-center justify-center hover:bg-cyber-yellow transition-colors z-10 cursor-pointer"
            >
              <X size={22} strokeWidth={3} />
            </button>

            <div className="p-6 md:p-14">
              <p className="eyebrow text-ink/60 mb-4">{researchData.subtitle}</p>

              <h2 className="text-section mb-6 pr-12">{researchData.title}</h2>

              <div className="flex flex-wrap gap-2 mb-8">
                {researchData.authors.map((author) => (
                  <span key={author} className={`chip ${author === "Kurian Jose" ? "bg-cyber-yellow" : ""}`}>
                    {author}
                  </span>
                ))}
              </div>

              <p className="text-xl md:text-2xl font-medium leading-relaxed text-ink/90 mb-12">
                A training-free 3-stage hybrid retrieval framework combining{" "}
                <span className="font-bold underline decoration-cyber-yellow decoration-[6px] underline-offset-2">
                  BM25, BGE-large-en-v1.5, and ColBERTv2
                </span>
                . Outperforms standalone dense pipelines on the MS MARCO benchmark.
              </p>

              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-3">
                    {researchData.tags.map((tag) => (
                      <div key={tag.label} className="bg-paper border-3 border-ink p-4">
                        <div className="eyebrow text-ink/60 mb-1">{tag.label}</div>
                        <div className="font-bold text-lg">{tag.value}</div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={researchData.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mechanical-button bg-ink text-white px-8 py-4 text-base w-full"
                  >
                    {researchData.cta} <ArrowUpRight size={20} strokeWidth={3} />
                  </a>
                </div>

                <div className="lg:col-span-2 brutalist-card shadow-punch-pink p-8 text-center relative flex flex-col justify-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyber-yellow border-3 border-ink px-3 py-1 eyebrow">
                    Benchmark
                  </div>
                  <div className="text-6xl font-black tracking-tighter text-punch-pink leading-none mb-4">
                    {researchData.benchmark.score}
                  </div>
                  <div className="font-mono font-bold uppercase border-t-3 border-ink pt-4">
                    {researchData.benchmark.metric}
                  </div>
                  <div className="eyebrow text-ink/60 mt-2">{researchData.benchmark.dataset}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
