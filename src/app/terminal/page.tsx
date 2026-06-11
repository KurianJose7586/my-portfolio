import Terminal from '@/components/Terminal';

export const metadata = {
  title: 'Terminal — Kurian Jose',
  description: 'Interactive terminal portfolio interface. Type `help` to explore.',
};

export default function TerminalPage() {
  return (
    <div
      className="w-full min-h-screen bg-gradient-to-br from-black via-[#0a0e27] to-black overflow-auto"
      // The global body has cursor:none for the custom cursor on the main page.
      // The terminal page doesn't use the custom cursor, so restore it here.
      style={{ cursor: 'auto' }}
    >
      <Terminal />
    </div>
  );
}
