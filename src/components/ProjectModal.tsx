import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  markdownContent: string;
}

export default function ProjectModal({ isOpen, onClose, title, markdownContent }: ProjectModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsClosing(false);
    } else {
      document.body.style.overflow = "unset";
      setIsClosing(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div 
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm cursor-pointer" 
        onClick={handleClose}
      />
      
      <div 
        className={`bg-paper border-[8px] md:border-[12px] border-ink w-full max-w-5xl h-[85vh] md:h-[90vh] shadow-[16px_16px_0px_0px_black] relative flex flex-col transform transition-transform duration-300 ${isClosing ? 'scale-95 translate-y-8' : 'scale-100 translate-y-0'}`}
      >
        {/* Header */}
        <div className="bg-ink text-white p-4 flex justify-between items-center border-b-[6px] border-ink flex-shrink-0">
          <h2 className="font-sans text-xl md:text-2xl font-black uppercase tracking-tighter">
            {title} _DETAILS
          </h2>
          <button 
            onClick={handleClose}
            className="w-10 h-10 bg-punch-pink border-4 border-ink flex items-center justify-center hover:bg-cyber-yellow hover:scale-110 active:scale-95 transition-all shadow-[4px_4px_0px_0px_black]"
          >
            <span className="material-symbols-outlined font-black">close</span>
          </button>
        </div>

        {/* Markdown Content Area */}
        <div className="p-6 md:p-12 overflow-y-auto flex-1 markdown-prose custom-scrollbar bg-white">
          {markdownContent ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-ink/50 font-mono text-center space-y-4">
              <span className="material-symbols-outlined text-6xl">code_off</span>
              <p>NO ADDITIONAL DATA FOUND IN VAULT</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
