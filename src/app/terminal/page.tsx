import Terminal from '@/components/Terminal';

export const metadata = {
  title: 'Terminal - Kurian Jose',
  description: 'Interactive terminal portfolio interface',
};

export default function TerminalPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-slate-900/20 to-black overflow-auto">
      <Terminal />
    </div>
  );
}
