import type { ReactNode } from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeader({ index, label, title, subtitle, action }: SectionHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-3 border-ink pb-6 mb-12 md:mb-16">
      <div>
        <p className="eyebrow text-ink/60 mb-3">
          {index} / {label}
        </p>
        <h2 className="text-section">{title}</h2>
        {subtitle && <p className="font-mono text-sm md:text-base font-bold uppercase mt-3 text-ink/70">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
