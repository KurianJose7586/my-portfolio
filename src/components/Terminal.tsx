'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  terminalCommands,
  projectDetails,
  getEasterEggs,
  bootSequence,
  hints,
} from '@/lib/terminalData';

interface OutputLine {
  type: 'boot' | 'command' | 'output' | 'input';
  content: string;
  command?: string;
}

export default function Terminal() {
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [fontSize, setFontSize] = useState(13);
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const easterEggs = getEasterEggs();

  // Boot sequence
  useEffect(() => {
    if (!isBooting) return;

    let bootIndex = 0;
    const bootInterval = setInterval(() => {
      if (bootIndex < bootSequence.length) {
        setOutput((prev) => [
          ...prev,
          { type: 'boot', content: bootSequence[bootIndex] },
        ]);
        bootIndex++;
      } else {
        clearInterval(bootInterval);
        setIsBooting(false);
        inputRef.current?.focus();
      }
    }, 120);

    return () => clearInterval(bootInterval);
  }, [isBooting]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          setFontSize((prev) => Math.min(prev + 1, 24));
        } else if (e.key === '-') {
          e.preventDefault();
          setFontSize((prev) => Math.max(prev - 1, 8));
        } else if (e.key === '0') {
          e.preventDefault();
          setFontSize(13);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Resize functionality
  const handleMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !windowRef.current) return;

      const rect = windowRef.current.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      const newHeight = e.clientY - rect.top;

      if (newWidth > 400) setWindowSize((prev) => ({ ...prev, width: newWidth }));
      if (newHeight > 300)
        setWindowSize((prev) => ({ ...prev, height: newHeight }));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();

      if (!trimmed) {
        setOutput((prev) => [...prev, { type: 'command', content: trimmed }]);
        return;
      }

      // Add to history
      setHistory((prev) => [trimmed, ...prev]);
      setHistoryIndex(-1);

      // Add command to output
      setOutput((prev) => [
        ...prev,
        { type: 'command', command: trimmed, content: `kurian@portfolio:~$ ${trimmed}` },
      ]);

      // Check for clear command
      if (trimmed === 'clear') {
        setOutput([]);
        setInput('');
        return;
      }

      // Check for easter eggs
      if (easterEggs[trimmed.toLowerCase()]) {
        setOutput((prev) => [
          ...prev,
          { type: 'output', content: easterEggs[trimmed.toLowerCase()] },
        ]);
        setInput('');
        return;
      }

      // Check for ask command
      if (trimmed.startsWith('ask ') || trimmed.startsWith('ask"')) {
        const query = trimmed
          .replace(/^ask\s*["']?/, '')
          .replace(/["']$/, '')
          .trim();

        setIsLoading(true);
        setOutput((prev) => [
          ...prev,
          {
            type: 'output',
            content: `KurianGPT thinking... → (connect to your AI endpoint here)`,
          },
        ]);
        setInput('');
        // TODO: Wire up actual AI backend
        setIsLoading(false);
        return;
      }

      // Check for open command
      const openMatch = trimmed.match(/^open\s+(.+)$/i);
      if (openMatch) {
        const project = openMatch[1].toLowerCase().trim();
        if (projectDetails[project]) {
          const { title, content } = projectDetails[project];
          setOutput((prev) => [
            ...prev,
            { type: 'output', content: `${title}\n${content}` },
          ]);
        } else {
          setOutput((prev) => [
            ...prev,
            {
              type: 'output',
              content: `command not found: open ${project}\ntype \`help\` for available commands`,
            },
          ]);
        }
        setInput('');
        return;
      }

      // Check for standard commands
      const command = trimmed.toLowerCase();
      if (terminalCommands[command as keyof typeof terminalCommands]) {
        const cmd = terminalCommands[command as keyof typeof terminalCommands];
        const output_content = cmd.title
          ? `${cmd.title}\n${cmd.content}`
          : cmd.content;
        setOutput((prev) => [
          ...prev,
          { type: 'output', content: output_content },
        ]);
      } else {
        setOutput((prev) => [
          ...prev,
          {
            type: 'output',
            content: `command not found: ${trimmed}\ntype \`help\` for available commands`,
          },
        ]);
      }

      setInput('');
    },
    [easterEggs]
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex + 1;
      if (newIndex < history.length) {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else if (newIndex === -1) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleHintClick = (hint: string) => {
    processCommand(hint);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-slate-900/20 to-black flex items-center justify-center p-4 md:p-8">
      <style>{`
        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .cursor-blink {
          animation: cursor-blink 1s infinite !important;
          display: inline-block;
          will-change: opacity;
        }
      `}</style>
      {/* Terminal Window */}
      <div
        ref={windowRef}
        className={`bg-black rounded-xl shadow-2xl overflow-hidden transition-all duration-300 border border-green-400/20 flex flex-col relative ${
          isMaximized ? 'w-full h-screen rounded-none' : ''
        } ${isMinimized ? 'h-12' : ''}`}
        style={{
          boxShadow: '0 0 60px rgba(0,255,65,0.1), 0 0 20px rgba(0,255,65,0.05)',
          width: isMaximized ? '100%' : `${windowSize.width}px`,
          height: isMaximized ? '100vh' : isMinimized ? '48px' : `${windowSize.height}px`,
          cursor: isResizing ? 'nwse-resize' : 'default',
        }}
      >
        {/* Window Chrome */}
        <div
          className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 flex items-center justify-between border-b border-green-400/10 flex-shrink-0"
          style={{
            background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)',
          }}
        >
          {/* Window Controls */}
          <div className="flex gap-2 items-center">
            {/* Red - Close */}
            <button
              onClick={() => setIsMinimized(false)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer shadow-sm"
              title="Close"
            />
            {/* Yellow - Minimize */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer shadow-sm"
              title="Minimize"
            />
            {/* Green - Maximize */}
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer shadow-sm"
              title="Maximize"
            />
          </div>

          {/* Window Title */}
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-400 font-mono">kurian@portfolio — Terminal</span>
          </div>

          {/* Right spacer with zoom indicator */}
          <div className="w-12 text-xs text-gray-500 text-right">{fontSize}x</div>
        </div>

        {/* Terminal Content */}
        {!isMinimized && (
          <div className="flex flex-col h-full bg-black flex-1" style={{ backgroundColor: '#0a0e27' }}>
            {/* CRT scanline effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-5 mix-blend-multiply"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
                zIndex: 10,
              }}
            />

            {/* Terminal display */}
            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-0 leading-relaxed scroll-smooth relative z-0"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: '1.6',
              }}
            >
              {output.map((line, idx) => (
                <div
                  key={idx}
                  className={`whitespace-pre-wrap break-words font-mono tracking-tight ${
                    line.type === 'command'
                      ? 'text-cyan-300'
                      : line.type === 'boot'
                        ? 'text-yellow-300 font-semibold'
                        : 'text-green-400'
                  }`}
                  style={{
                    textShadow:
                      line.type === 'boot'
                        ? '0 0 10px rgba(253,224,71,0.5)'
                        : line.type === 'command'
                          ? '0 0 5px rgba(165,243,252,0.3)'
                          : 'none',
                  }}
                >
                  {line.content}
                </div>
              ))}
            </div>

            {/* Input area */}
            <div
              className="border-t p-3 md:p-4 space-y-3 flex-shrink-0 relative z-20"
              style={{ borderColor: 'rgba(0,255,65,0.2)' }}
            >
              <div className="flex items-center gap-2" style={{ fontSize: `${fontSize}px` }}>
                <span className="text-cyan-300 flex-shrink-0">kurian@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  disabled={isBooting || isLoading}
                  className="flex-1 bg-transparent text-green-400 outline-none border-0 p-0 placeholder-green-700"
                  placeholder={isBooting ? 'booting...' : ''}
                  autoComplete="off"
                  spellCheck={false}
                  style={{
                    textShadow: '0 0 5px rgba(0,255,65,0.3)',
                    fontSize: `${fontSize}px`,
                    fontFamily: 'monospace',
                  }}
                />
                <span
                  className="text-green-400 flex-shrink-0 cursor-blink"
                  style={{
                    fontSize: `${fontSize}px`,
                  }}
                >
                  ▌
                </span>
              </div>

              {/* Hint bar */}
              <div
                className="flex flex-wrap gap-1.5 md:gap-2 pt-2 border-t"
                style={{
                  borderColor: 'rgba(0,255,65,0.15)',
                  fontSize: `${Math.max(fontSize - 2, 10)}px`,
                }}
              >
                {hints.map((hint, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleHintClick(hint)}
                    disabled={isBooting || isLoading}
                    className="px-2 py-1 whitespace-nowrap rounded transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: 'rgba(0,255,65,0.08)',
                      border: '1px solid rgba(0,255,65,0.3)',
                      color: '#00ff41',
                      opacity: isBooting || isLoading ? 0.4 : 1,
                      cursor: isBooting || isLoading ? 'not-allowed' : 'pointer',
                      fontSize: `${Math.max(fontSize - 2, 10)}px`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isBooting && !isLoading) {
                        e.currentTarget.style.backgroundColor =
                          'rgba(0,255,65,0.15)';
                        e.currentTarget.style.borderColor =
                          'rgba(0,255,65,0.6)';
                        e.currentTarget.style.boxShadow =
                          '0 0 10px rgba(0,255,65,0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isBooting && !isLoading) {
                        e.currentTarget.style.backgroundColor =
                          'rgba(0,255,65,0.08)';
                        e.currentTarget.style.borderColor =
                          'rgba(0,255,65,0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resize handle */}
        {!isMaximized && !isMinimized && (
          <div
            onMouseDown={handleMouseDown}
            className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize"
            style={{
              background: 'linear-gradient(135deg, transparent 50%, rgba(0,255,65,0.3) 50%)',
            }}
            title="Drag to resize"
          />
        )}
      </div>
    </div>
  );
}
