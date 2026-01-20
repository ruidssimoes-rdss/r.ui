interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="px-3 py-2">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
        {children}
      </span>
    </div>
  );
}
