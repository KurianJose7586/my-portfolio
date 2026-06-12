'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  terminalCommands,
  projectDetails,
  getEasterEggs,
  bootSequence,
  hints,
} from '@/lib/terminalData';
import { Sparkles, Bot, MessageCircle, Brain, Zap, Terminal as TerminalIcon } from 'lucide-react';

interface OutputLine {
  type: 'boot' | 'command' | 'output' | 'error';
  content: string;
  isHtml?: boolean;
}

type WindowState = 'normal' | 'minimized' | 'maximized' | 'closed';

interface TerminalProps {
  initialState?: WindowState;
  isGlobalWidget?: boolean;
}

export default function Terminal({ initialState = 'normal', isGlobalWidget = false }: TerminalProps = {}) {
  const [output, setOutput] = useState<OutputLine[]>(
    isGlobalWidget 
      ? [
          { type: 'output', content: '─────────────────────────────────────────────' },
          { type: 'output', content: ' KurianGPT Agentic TUI v2.0 ' },
          { type: 'output', content: ' Type your message to chat directly with KurianGPT.' },
          { type: 'output', content: ' Or use terminal commands (e.g., `help`, `git log`).' },
          { type: 'output', content: '─────────────────────────────────────────────' }
        ] 
      : []
  );
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(!isGlobalWidget);
  const [isLoading, setIsLoading] = useState(false);
  const [windowState, setWindowState] = useState<WindowState>(initialState);
  const [fontSize, setFontSize] = useState(13);
  const [showTip, setShowTip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Drag state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Resize state
  const [windowSize, setWindowSize] = useState({ width: 860, height: 560 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStart = useRef({ mouseX: 0, mouseY: 0, width: 860, height: 560 });

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const easterEggs = getEasterEggs();

  // ── Boot sequence (variable-speed per line) ──────────────────────────
  useEffect(() => {
    if (!isBooting) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setOutput(prev => [...prev, ...bootSequence.map(([content]) => ({ type: 'boot' as const, content }))]);
      setIsBooting(false);
      return;
    }

    let cancelled = false;

    const printLine = (index: number) => {
      if (cancelled || index >= bootSequence.length) {
        if (!cancelled) setIsBooting(false);
        return;
      }
      const [content, delay] = bootSequence[index];
      // Schedule the *next* line after this line's delay
      const id = setTimeout(() => {
        setOutput((prev) => [...prev, { type: 'boot' as const, content }]);
        printLine(index + 1);
      }, delay);
      return id;
    };

    // Kick off immediately
    printLine(0);

    return () => { cancelled = true; };
  }, [isBooting]);

  // Focus input after boot
  useEffect(() => {
    if (!isBooting) inputRef.current?.focus();
  }, [isBooting]);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // ── Keyboard zoom ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          setFontSize((p) => Math.min(p + 1, 22));
        } else if (e.key === '-') {
          e.preventDefault();
          setFontSize((p) => Math.max(p - 1, 10));
        } else if (e.key === '0') {
          e.preventDefault();
          setFontSize(13);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ── Drag (title bar) ─────────────────────────────────────────────────
  const handleTitleBarMouseDown = useCallback((e: React.MouseEvent) => {
    if (windowState !== 'normal') return;
    // Ignore clicks on traffic-light buttons
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  }, [windowState, position]);

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const up = () => setIsDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, [isDragging]);

  // ── Resize (SE corner) ───────────────────────────────────────────────
  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    resizeStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: windowSize.width,
      height: windowSize.height,
    };
  }, [windowSize]);

  useEffect(() => {
    if (!isResizing) return;
    const move = (e: MouseEvent) => {
      const dw = e.clientX - resizeStart.current.mouseX;
      const dh = e.clientY - resizeStart.current.mouseY;
      setWindowSize({
        width: Math.max(400, resizeStart.current.width + dw),
        height: Math.max(300, resizeStart.current.height + dh),
      });
    };
    const up = () => setIsResizing(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, [isResizing]);

  // ── Global Command Palette Hook (Cmd+K) ───────────────────────────
  useEffect(() => {
    if (!isGlobalWidget) return;
    
    // Show tip after 12 seconds if not already opened
    const tipTimer = setTimeout(() => {
      if (windowState === 'closed' && !localStorage.getItem('kurian_cmd_k_seen')) {
        setShowTip(true);
      }
    }, 12000);

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setWindowState(prev => prev === 'closed' ? 'normal' : 'closed');
        setShowTip(false);
        localStorage.setItem('kurian_cmd_k_seen', 'true');
      }
      if (e.key === 'Escape' && windowState !== 'closed') {
        setWindowState('closed');
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      clearTimeout(tipTimer);
    };
  }, [isGlobalWidget, windowState]);

  // ── Command execution ────────────────────────────────────────────────
  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();

      if (!trimmed) {
        setOutput((prev) => [...prev, { type: 'command', content: '' }]);
        return;
      }

      setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
      setHistoryIndex(-1);
      const promptString = isGlobalWidget ? `you > ` : `kurian@portfolio:~$ `;
      setOutput((prev) => [...prev, { type: 'command', content: `${promptString}${trimmed}` }]);

      // clear
      if (trimmed === 'clear') {
        setOutput([]);
        setInput('');
        return;
      }

      // easter eggs
      if (easterEggs[trimmed.toLowerCase()]) {
        setOutput((prev) => [...prev, { type: 'output', content: easterEggs[trimmed.toLowerCase()] }]);
        setInput('');
        return;
      }

      const executeAskQuery = (query: string) => {
        setIsLoading(true);
        setInput('');

        // 3. Context Awareness: Get recent terminal history
        const recentHistory = output
          .slice(-10)
          .map(o => o.type === 'command' ? `User ran: ${o.content}` : `Terminal: ${o.content.replace(/<[^>]*>?/gm, '')}`)
          .join('\n');

        // 2. Proactive "Thinking" Streams: Animate the loading state
        let dotIndex = 0;
        const thinkingSteps = [
          "[system] parsing intent...",
          "[retrieval] scanning knowledge base...",
          "[agent] formatting response..."
        ];
        
        setOutput((prev) => [
          ...prev,
          { type: 'output', content: `⠋ ${thinkingSteps[0]}` },
        ]);

        const loadingInterval = setInterval(() => {
          dotIndex++;
          const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
          const frame = frames[dotIndex % frames.length];
          const step = thinkingSteps[Math.floor((dotIndex / 5)) % thinkingSteps.length];
          
          setOutput((prev) => {
            const newOutput = [...prev];
            newOutput[newOutput.length - 1] = { type: 'output', content: `${frame} ${step}` };
            return newOutput;
          });
        }, 120);

        // Inject strict TUI formatting rules silently
        const systemPrompt = `\n\n[SYSTEM RULES: You are a CLI tool outputting to a terminal. 
1. DO NOT write paragraphs. Give a 1-line direct answer, then structured data (lists/tables), then stop.
2. DO NOT ask conversational questions ("Let me know if...").
3. ALWAYS end with exactly one suggested command starting with "→ run \`" (e.g. "→ run \`open twinlyai\` to go deeper" or "→ run \`research\`").
4. Keep it extremely brief, brutalist, and scannable.]`;

        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query + systemPrompt, history: recentHistory }),
        })
          .then(async (res) => {
            const data = await res.json();
            if (!res.ok || data.error) {
              throw new Error(data.error || `HTTP ${res.status}`);
            }
            return data.reply as string;
          })
          .then((reply) => {
            clearInterval(loadingInterval);
            
            // Remove the thinking line and add the top separator
            setOutput((prev) => {
              const withoutThinking = prev.slice(0, -1);
              return [
                ...withoutThinking,
                { type: 'output', content: '─────────────────────────────────────────────' },
              ];
            });

            // Simulate line-by-line streaming
            const lines = reply.split('\n');
            let i = 0;

            const streamLine = () => {
              if (i < lines.length) {
                const lineContent = i === 0 ? `KurianGPT > ${lines[i]}` : lines[i];
                setOutput((prev) => [...prev, { type: 'output', content: lineContent }]);
                i++;
                // 30-50ms random delay per line for authentic terminal feel
                setTimeout(streamLine, 30 + Math.random() * 20);
              } else {
                // Add bottom separator when done
                setOutput((prev) => [
                  ...prev,
                  { type: 'output', content: '─────────────────────────────────────────────' },
                ]);
                setIsLoading(false);
              }
            };
            
            streamLine();
          })
          .catch((err: Error) => {
            setOutput((prev) => {
              const withoutThinking = prev.slice(0, -1);
              return [
                ...withoutThinking,
                { type: 'error', content: `KurianGPT > error: ${err.message}\nhint: the HF Space may be cold-starting — try again in ~30s` },
              ];
            });
            setIsLoading(false);
          });
      };

      // ask — wired to KurianGPT via /api/chat → HF Space
      if (trimmed.startsWith('ask ') || trimmed.startsWith('ask"')) {
        const query = trimmed.replace(/^ask\s*["']?/, '').replace(/["']$/, '').trim();
        if (!query) {
          setOutput((prev) => [...prev, { type: 'error', content: 'usage: ask "your question here"' }]);
          setInput('');
          return;
        }
        executeAskQuery(query);
        return;
      }

      // git log — fetch real public commits from GitHub
      if (trimmed === 'git log') {
        setIsLoading(true);
        setInput('');

        setOutput((prev) => [
          ...prev,
          { type: 'output', content: `⠋ fetching public commits for KurianJose7586...` },
        ]);

        fetch('https://api.github.com/users/KurianJose7586/repos?sort=pushed&direction=desc&per_page=1')
          .then((res) => {
            if (!res.ok) throw new Error('GitHub API rate limit exceeded');
            return res.json();
          })
          .then((repos) => {
            if (!repos || repos.length === 0) {
              throw new Error('No public repos found');
            }
            const repo = repos[0].name;
            return fetch(`https://api.github.com/repos/KurianJose7586/${repo}/commits?per_page=5`)
              .then(res => {
                if (!res.ok) throw new Error(`GitHub API error on repo ${repo}`);
                return res.json();
              })
              .then(commits => ({ repo, commits }));
          })
          .then(({ repo, commits }) => {
            setOutput((prev) => {
              const withoutThinking = prev.slice(0, -1);

              if (!commits || commits.length === 0) {
                return [...withoutThinking, { type: 'output', content: 'No recent public commits found.' }];
              }

              const outputLines = commits.map((c: any) => {
                const shortSha = c.sha.substring(0, 7);
                const shortMsg = c.commit.message.split('\n')[0].trim();
                return `<span class="text-yellow-400">commit ${shortSha}</span>  ${shortMsg} <span class="text-gray-500">(${repo})</span>`;
              });

              return [
                ...withoutThinking,
                { type: 'output', content: '─────────────────────────────────────────────' },
                ...outputLines.map((line: string) => ({ type: 'output' as const, content: line, isHtml: true })),
                { type: 'output', content: '─────────────────────────────────────────────' }
              ];
            });
          })
          .catch((err) => {
            setOutput((prev) => {
              const withoutThinking = prev.slice(0, -1);
              return [...withoutThinking, { type: 'error', content: `error: ${err.message}` }];
            });
          })
          .finally(() => setIsLoading(false));

        return;
      }

      // open <project>
      const openMatch = trimmed.match(/^open\s+(.+)$/i);
      if (openMatch) {
        const project = openMatch[1].toLowerCase().trim();
        if (projectDetails[project]) {
          const { title, content } = projectDetails[project];
          setOutput((prev) => [...prev, { type: 'output', content: `${title}\n${content}` }]);
        } else {
          setOutput((prev) => [
            ...prev,
            { type: 'error', content: `command not found: open ${project}\ntype \`help\` for available commands` },
          ]);
        }
        setInput('');
        return;
      }

      // standard commands
      const key = trimmed.toLowerCase() as keyof typeof terminalCommands;
      if (terminalCommands[key]) {
        const c = terminalCommands[key];
        setOutput((prev) => [...prev, { type: 'output', content: c.title ? `${c.title}\n${c.content}` : c.content }]);
      } else {
        if (isGlobalWidget) {
          executeAskQuery(trimmed);
          return;
        }
        setOutput((prev) => [
          ...prev,
          { type: 'error', content: `command not found: ${trimmed}\ntype \`help\` for available commands` },
        ]);
      }
      setInput('');
    },
    [easterEggs]
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
      processCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = historyIndex + 1;
      if (next < history.length) { setHistoryIndex(next); setInput(history[next]); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIndex - 1;
      if (next >= 0) { setHistoryIndex(next); setInput(history[next]); }
      else { setHistoryIndex(-1); setInput(''); }
    } else if (e.key === 'Tab') {
      // Simple tab completion
      e.preventDefault();
      const allCmds = [...Object.keys(terminalCommands), 'clear', 'open', 'ask'];
      const match = allCmds.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    }
  };

  // ── Window state helpers ─────────────────────────────────────────────
  const isMaximized = windowState === 'maximized';
  const isMinimized = windowState === 'minimized';
  const isClosed   = windowState === 'closed';

  if (isClosed) {
    if (isGlobalWidget) {
      return (
        <div className="fixed bottom-8 right-8 z-[90] flex flex-col items-end pointer-events-none">
          {showTip && (
            <div className="mb-4 bg-[#1e2030]/90 backdrop-blur-md text-green-400 p-4 rounded-lg shadow-2xl border border-green-500/20 max-w-sm pointer-events-auto transform transition-all translate-y-0 opacity-100">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Agentic Mode Available</p>
                  <p className="text-xs text-green-400/70">Press <kbd className="bg-black/40 px-1.5 py-0.5 rounded text-green-300 font-mono">⌘K</kbd> or <kbd className="bg-black/40 px-1.5 py-0.5 rounded text-green-300 font-mono">Ctrl+K</kbd> anywhere to ask KurianGPT or execute commands.</p>
                </div>
                <button onClick={() => setShowTip(false)} className="text-green-400/50 hover:text-green-400 ml-2">✕</button>
              </div>
            </div>
          )}
          
          <button 
            onClick={() => { setWindowState('normal'); setShowTip(false); localStorage.setItem('kurian_cmd_k_seen', 'true'); }}
            className="w-14 h-14 rounded-full relative flex items-center justify-center animate-pulse hover:animate-none transition-all hover:scale-110 active:scale-95 pointer-events-auto kurian-orb cursor-none"
            style={{
              background: 'radial-gradient(circle at center, #4ade80 0%, #166534 50%, #052e16 100%)',
              boxShadow: '0 0 20px rgba(74, 222, 128, 0.6), inset 0 0 10px rgba(255,255,255,0.5)'
            }}
            title="Open KurianGPT"
            aria-label="Open KurianGPT"
          />
        </div>
      );
    }

    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0e27] to-black">
        <button
          onClick={() => { setWindowState('normal'); setOutput([]); setIsBooting(true); }}
          className="font-mono text-green-400 border border-green-400/40 px-6 py-3 rounded-lg hover:bg-green-400/10 transition-colors duration-200 cursor-pointer"
          style={{ textShadow: '0 0 8px rgba(0,255,65,0.4)' }}
        >
          ▶ reopen terminal
        </button>
      </div>
    );
  }

  return (
    <div
      className={isGlobalWidget ? "fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-none" : "w-full min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-black via-[#0a0e27] to-black"}
      style={{ cursor: isResizing ? 'nwse-resize' : isDragging ? 'grabbing' : 'default' }}
    >
      {isGlobalWidget && <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" onClick={() => setWindowState('closed')} />}
      {/* ── Inline styles (scoped) ───────────────────────────────── */}
      <style>{`
        @keyframes terminal-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .terminal-cursor { animation: terminal-blink 1s step-end infinite; }
        }
        .terminal-cursor { display: inline-block; }

        /* Styled scrollbar */
        .terminal-scroll::-webkit-scrollbar { width: 6px; }
        .terminal-scroll::-webkit-scrollbar-track { background: transparent; }
        .terminal-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,255,65,0.2);
          border-radius: 3px;
        }
        .terminal-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0,255,65,0.4);
        }

        /* Hint chip hover via CSS (not inline JS) */
        .hint-chip {
          background: rgba(0,255,65,0.06);
          border: 1px solid rgba(0,255,65,0.25);
          color: #00ff41;
          transition: background 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
          cursor: pointer;
        }
        .hint-chip:hover:not(:disabled) {
          background: rgba(0,255,65,0.14);
          border-color: rgba(0,255,65,0.55);
          box-shadow: 0 0 10px rgba(0,255,65,0.25);
        }
        .hint-chip:active:not(:disabled) {
          transform: scale(0.96);
        }
        .hint-chip:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        /* Traffic-light button labels on hover */
        .traffic-light-group:hover .tl-label { opacity: 1; }
        .tl-label { opacity: 0; font-size: 9px; transition: opacity 150ms; user-select: none; }
      `}</style>

      {/* ── Terminal window ──────────────────────────────────────── */}
      <div
        ref={windowRef}
        className={`flex flex-col overflow-hidden select-none pointer-events-auto
          ${isMaximized ? 'fixed inset-0 z-50' : isMobile && isGlobalWidget ? 'fixed bottom-0 left-0 right-0 z-[110] rounded-t-2xl border-t border-green-400/20 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]' : 'relative rounded-xl border border-green-400/15'}`}
        style={{
          width: isMaximized || (isMobile && isGlobalWidget) ? '100%' : isMinimized ? '260px' : `${windowSize.width}px`,
          height: isMaximized ? '100%' : (isMobile && isGlobalWidget) ? '85vh' : isMinimized ? '44px' : `${windowSize.height}px`,
          minWidth: isMinimized || (isMobile && isGlobalWidget) ? undefined : '400px',
          boxShadow: isMobile && isGlobalWidget ? undefined : '0 0 60px rgba(0,255,65,0.08), 0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,255,65,0.08)',
          transform: isMaximized || (isMobile && isGlobalWidget) ? 'none' : `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging || isResizing ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: '#0a0e1a',
          userSelect: isDragging ? 'none' : 'auto',
        }}
      >
        {/* ── Title bar ─────────────────────────────────────────── */}
        <div
          onMouseDown={handleTitleBarMouseDown}
          className={`flex items-center justify-between px-3 py-2.5 flex-shrink-0 border-b border-green-400/10 ${
            isGlobalWidget ? 'bg-white/5 backdrop-blur-md' : ''
          }`}
          style={{
            background: isGlobalWidget ? undefined : 'linear-gradient(to bottom, #1e2030, #151825)',
            cursor: windowState === 'normal' && !(isMobile && isGlobalWidget) ? 'grab' : 'default',
          }}
          aria-label="Terminal title bar — drag to move"
        >
          {/* Traffic lights */}
          <div className="flex gap-2 items-center traffic-light-group">
            {/* Red — close */}
            <button
              onClick={() => setWindowState('closed')}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 active:brightness-75 transition-all cursor-pointer flex items-center justify-center shadow-sm"
              title="Close"
              aria-label="Close terminal"
            >
              <span className="tl-label text-[#7a0000] font-bold leading-none">✕</span>
            </button>
            {/* Yellow — minimize */}
            <button
              onClick={() => setWindowState(isMinimized ? 'normal' : 'minimized')}
              className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-90 active:brightness-75 transition-all cursor-pointer flex items-center justify-center shadow-sm"
              title={isMinimized ? 'Restore' : 'Minimize'}
              aria-label={isMinimized ? 'Restore terminal' : 'Minimize terminal'}
            >
              <span className="tl-label text-[#6a4900] font-bold leading-none">−</span>
            </button>
            {/* Green — maximize */}
            <button
              onClick={() => setWindowState(isMaximized ? 'normal' : 'maximized')}
              className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 active:brightness-75 transition-all cursor-pointer flex items-center justify-center shadow-sm"
              title={isMaximized ? 'Restore' : 'Maximize'}
              aria-label={isMaximized ? 'Restore terminal' : 'Maximize terminal'}
            >
              <span className="tl-label text-[#003d00] font-bold leading-none">+</span>
            </button>
          </div>

          {/* Title */}
          <span className="absolute left-1/2 -translate-x-1/2 text-[11px] text-gray-400 font-mono tracking-wide pointer-events-none">
            {isGlobalWidget ? 'KurianGPT' : 'kurian@portfolio — bash'}
          </span>

          {/* Right: font size indicator */}
          <span className="text-[10px] text-gray-600 font-mono tabular-nums">
            {fontSize}px · Ctrl±
          </span>
        </div>

        {/* ── Terminal body (hidden when minimized) ─────────────── */}
        {!isMinimized && (
          <div className="flex flex-col flex-1 overflow-hidden relative" style={{ backgroundColor: '#0a0e1a' }}>

            {/* CRT scanline overlay — pointer-events: none so it never blocks clicks */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.8) 2px,rgba(0,0,0,0.8) 4px)',
              }}
            />

            {/* Output log */}
            <div
              ref={terminalRef}
              className="terminal-scroll flex-1 overflow-y-auto p-4 md:p-5 leading-relaxed relative z-0"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.65 }}
              aria-live="polite"
              aria-label="Terminal output"
              onClick={() => inputRef.current?.focus()}
            >
              {output.map((line, idx) => {
                const isCmd  = line.type === 'command';
                const isBoot = line.type === 'boot';
                const isErr  = line.type === 'error';

                // Smart colouring for boot log lines
                const isOk       = isBoot && line.content.startsWith('[ OK  ]');
                const isWarn     = isBoot && line.content.startsWith('[ WARN ]');
                const isSys      = isBoot && line.content.startsWith('[ SYS ]');
                const isBootErr  = isBoot && line.content.startsWith('[ ERR  ]');
                const isSep      = isBoot && line.content.startsWith('━');
                const isDone     = isBoot && line.content.trimStart().startsWith('✓');

                const colorClass =
                  isOk       ? 'text-green-400' :
                  isWarn     ? 'text-amber-400' :
                  isSys      ? 'text-sky-400'   :
                  isBootErr  ? 'text-red-400'   :
                  isSep      ? 'text-green-900' :
                  isDone     ? 'text-green-300' :
                  isBoot     ? 'text-yellow-300':
                  isCmd      ? 'text-cyan-300'  :
                  isErr      ? 'text-red-400'   :
                               'text-green-400';

                const shadow =
                  isOk       ? '0 0 6px rgba(74,222,128,0.35)'  :
                  isWarn     ? '0 0 6px rgba(251,191,36,0.4)'   :
                  isSys      ? '0 0 6px rgba(56,189,248,0.3)'   :
                  isBootErr  ? '0 0 8px rgba(248,113,113,0.5)'  :
                  isDone     ? '0 0 10px rgba(134,239,172,0.5)' :
                  isBoot     ? '0 0 8px rgba(253,224,71,0.35)'  :
                  isCmd      ? '0 0 6px rgba(103,232,249,0.25)' :
                  isErr      ? '0 0 6px rgba(248,113,113,0.25)' :
                               'none';

                const parseMarkdown = (text: string) => {
                  let contentToParse = text;
                  let prefix = null;

                  // Distinctly style the KurianGPT prefix
                  if (text.startsWith('KurianGPT > ')) {
                    contentToParse = text.slice(12);
                    prefix = (
                      <span className="inline-flex items-center justify-center bg-cyan-900/40 text-cyan-300 px-1.5 py-0.5 rounded mr-2 font-bold border border-cyan-500/30 text-[10px] uppercase tracking-widest align-text-bottom">
                        KurianGPT
                      </span>
                    );
                  }

                  const parts = contentToParse.split(/(\*\*.*?\*\*)/g);
                  const renderedParts = parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <span key={i} className="font-bold text-white bg-white/10 px-1 mx-[1px] rounded">
                          {part.slice(2, -2)}
                        </span>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  });

                  return (
                    <>
                      {prefix}
                      {renderedParts}
                    </>
                  );
                };

                return (
                  <div
                    key={idx}
                    className={`whitespace-pre-wrap break-words font-mono ${colorClass} mb-1`}
                    style={{ textShadow: shadow }}
                  >
                    {line.isHtml ? (
                      <span dangerouslySetInnerHTML={{ __html: line.content }} />
                    ) : (
                      parseMarkdown(line.content)
                    )}
                  </div>
                );
              })}


              {/* Empty space so last output isn't flush against input */}
              <div className="h-2" />
            </div>

            {/* Input area */}
            <div
              className="flex-shrink-0 border-t border-green-400/10 px-4 py-3 space-y-2.5 relative z-20"
              style={{ backgroundColor: '#080b14' }}
            >
              {/* Input row */}
              <div
                className="flex items-center gap-2"
                style={{ fontSize: `${fontSize}px` }}
                onClick={() => inputRef.current?.focus()}
              >
                <span
                  className="text-cyan-300 flex-shrink-0 font-mono select-none"
                  style={{ textShadow: '0 0 6px rgba(103,232,249,0.3)' }}
                  aria-hidden="true"
                >
                  {isGlobalWidget ? 'you >' : 'kurian@portfolio:~$'}
                </span>
                <input
                  ref={inputRef}
                  id="terminal-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  disabled={isBooting || isLoading}
                  className="flex-1 bg-transparent outline-none border-0 p-0 font-mono text-green-400 caret-transparent"
                  placeholder={isBooting ? 'booting…' : isLoading ? 'thinking…' : ''}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                  style={{
                    fontSize: `${fontSize}px`,
                    textShadow: '0 0 5px rgba(0,255,65,0.3)',
                  }}
                />
                {/* Blinking block cursor */}
                <span
                  className="terminal-cursor text-green-400 flex-shrink-0 select-none"
                  aria-hidden="true"
                  style={{ fontSize: `${fontSize}px`, textShadow: '0 0 8px rgba(0,255,65,0.6)' }}
                >
                  ▌
                </span>
              </div>

              {/* Hint chips */}
              <div
                className="flex flex-wrap gap-1.5 pt-2 border-t border-green-400/10"
                role="group"
                aria-label="Quick command hints"
              >
                {hints.map((hint, idx) => (
                  <button
                    key={idx}
                    onClick={() => { if (!isBooting && !isLoading) processCommand(hint); }}
                    disabled={isBooting || isLoading}
                    className="hint-chip px-2 py-0.5 rounded font-mono whitespace-nowrap text-[11px]"
                    aria-label={`Run command: ${hint}`}
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Resize handle (SE corner) ─────────────────────────── */}
        {!isMaximized && !isMinimized && (
          <div
            onMouseDown={handleResizeMouseDown}
            className="absolute bottom-0 right-0 w-5 h-5 z-30 cursor-nwse-resize"
            aria-hidden="true"
            style={{
              background: 'linear-gradient(135deg, transparent 50%, rgba(0,255,65,0.25) 50%)',
            }}
          />
        )}
      </div>
    </div>
  );
}
