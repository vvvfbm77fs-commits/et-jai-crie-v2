'use client';

import { PRESET_LAYOUTS } from '@/lib/layouts';
import { LayoutGrid, Columns, Newspaper, LayoutDashboard } from 'lucide-react';

interface LayoutSelectorProps {
  selectedLayout: string;
  onLayoutChange: (layoutId: string) => void;
}

export default function LayoutSelector({
  selectedLayout,
  onLayoutChange,
}: LayoutSelectorProps) {
  const getIcon = (layoutId: string) => {
    switch (layoutId) {
      case 'classic':
        return <LayoutGrid className="w-8 h-8" />;
      case 'editorial':
        return <Columns className="w-8 h-8" />;
      case 'magazine':
        return <Newspaper className="w-8 h-8" />;
      case 'triptych':
        return <LayoutDashboard className="w-8 h-8" />;
      default:
        return <LayoutGrid className="w-8 h-8" />;
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-memoir-blue mb-4">
        Choisir la mise en page
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PRESET_LAYOUTS.map((layout) => {
          const isSelected = selectedLayout === layout.id;

          return (
            <button
              key={layout.id}
              type="button"
              onClick={() => onLayoutChange(layout.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-memoir-gold bg-memoir-gold/10'
                  : 'border-memoir-blue/20 hover:border-memoir-gold/50'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={isSelected ? 'text-memoir-gold' : 'text-memoir-blue/50'}>
                  {getIcon(layout.id)}
                </div>

                <div className="text-center">
                  <p className="font-medium text-memoir-blue text-sm">
                    {layout.name}
                  </p>
                  <p className="text-xs text-memoir-blue/60 mt-1">
                    {layout.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
