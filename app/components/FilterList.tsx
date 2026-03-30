"use client"
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterListProps {
  items: string[];
  renderItem: (item: string) => React.ReactNode;
}

export function FilterList({ items, renderItem }: FilterListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const limit = 5;
  const hasMore = items.length > limit;
  const displayedItems = isExpanded ? items : items.slice(0, limit);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full">
      <ul className="space-y-1">
        {displayedItems.map((item) => renderItem(item))}
      </ul>
      
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs md:text-sm bg-white text-[#1F4A36] border border-[#428159] px-3 md:px-4 py-1.5 md:py-2 rounded-none mt-2 hover:bg-white hover:border-[#24613D] transition-all font-medium group cursor-pointer"
        >
          <span>{isExpanded ? "Less" : "More"}</span>
          <ChevronDown 
            size={12} 
            className={`transition-transform duration-200 text-[#E8C042] ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}