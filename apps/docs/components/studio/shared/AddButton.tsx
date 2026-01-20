// Icons
function PlusIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}

interface AddButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function AddButton({ onClick, children }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#9CA3AF] hover:text-[#374151] transition-colors"
    >
      <PlusIcon size={12} />
      {children}
    </button>
  );
}
