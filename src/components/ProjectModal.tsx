import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeXml, X } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  markdownContent: string;
}

export default function ProjectModal({ isOpen, onClose, title, markdownContent }: ProjectModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsClosing(false);
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setIsClosing(false);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm cursor-pointer"
        onClick={handleClose}
      />

      <div
        className={`bg-white border-3 border-ink w-full max-w-4xl h-[85vh] md:h-[88vh] shadow-brutal-lg relative flex flex-col transition-transform duration-300 ease-out-quint ${isClosing ? 'scale-95 translate-y-8' : 'scale-100 translate-y-0'}`}
      >
        <div className="bg-ink text-white px-5 py-4 flex justify-between items-center gap-4 flex-shrink-0">
          <div>
            <p className="eyebrow text-white/50">Project file</p>
            <h2 className="font-sans text-xl md:text-2xl font-black uppercase tracking-tight">{title}</h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close project details"
            className="w-11 h-11 bg-white text-ink border-3 border-white flex items-center justify-center hover:bg-cyber-yellow transition-colors cursor-pointer"
          >
            <X size={22} strokeWidth={3} />
          </button>
        </div>

        <div className="p-6 md:p-12 overflow-y-auto flex-1 markdown-prose">
          {markdownContent ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-ink/50 font-mono text-center gap-4">
              <CodeXml size={56} />
              <p>Write-up coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
