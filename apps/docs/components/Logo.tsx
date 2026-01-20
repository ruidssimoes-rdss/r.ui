interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-3xl',
};

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <span className={`font-pixelify text-gray-900 ${sizeClasses[size]} ${className ?? ''}`}>
      r/ui
    </span>
  );
}
