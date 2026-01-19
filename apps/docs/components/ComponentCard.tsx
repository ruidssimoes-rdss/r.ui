import Link from 'next/link';
import { ComponentPreviewThumbnail } from './ComponentPreviewThumbnail';

interface ComponentCardProps {
  name: string;
  href: string;
  description?: string;
}

/**
 * ComponentCard
 *
 * A card component for the components landing page that shows
 * a visual preview thumbnail of each component.
 */
export function ComponentCard({ name, href, description }: ComponentCardProps) {
  // Extract the component slug from the href (e.g., /docs/components/button -> button)
  const slug = href.split('/').pop() || '';

  return (
    <Link
      href={href}
      className="group block rounded-lg border border-[#E5E7EB] bg-white overflow-hidden hover:border-[#D1D5DB] hover:ring-2 hover:ring-[#2563EB]/10 transition-all duration-150"
    >
      {/* Preview Area */}
      <div className="h-24 bg-[#F9FAFB] border-b border-[#E5E7EB] group-hover:bg-[#F3F4F6] transition-colors duration-150">
        <ComponentPreviewThumbnail componentSlug={slug} componentName={name} />
      </div>

      {/* Name & Description */}
      <div className="p-3">
        <div className="text-sm font-medium text-[#111827] group-hover:text-[#2563EB] transition-colors duration-150">
          {name}
        </div>
        {description && (
          <div className="mt-0.5 text-xs text-[#6B7280] line-clamp-1">
            {description}
          </div>
        )}
      </div>
    </Link>
  );
}
