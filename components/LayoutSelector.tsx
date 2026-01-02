'use client';

import { PRESET_LAYOUTS } from '@/lib/layouts';
import * as LucideIcons from 'lucide-react';

interface LayoutSelectorProps {
  selectedLayout: string;
  onLayoutChange: (layoutId: string) => void;
}

export default function LayoutSelector({ selectedLayout, onLayoutChange }: LayoutSelectorProps) {
  const getIcon = (layoutId: string) => {
    switch (layoutId) {
      case 'classic':
        return LucideIcons.LayoutGrid;
      case 'editorial':
        return LucideIcons.Columns;
      case 'magazine':
        return LucideIcons.Newspaper;
      case 'triptych':
        return LucideIcons.LayoutDashboard;
      default:
        return LucideIcons.LayoutGrid;
    }
  };
console.log('Icons check:', {
    LayoutGrid: LucideIcons.LayoutGrid,
    Columns: LucideIcons.Columns,
    Newspaper: LucideIcons.Newspaper,
    LayoutDashboard: LucideIcons.LayoutDashboard
  });
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-memoir-blue mb-4">
        Choisir la mise en page
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PRESET_LAYOUTS.map((layout) => {
          const isSelected = selectedLayout === layout.id;
          const Icon = getIcon(layout.id);
          
          return (
            <button
              key={layout.id}
              onClick={() => onLayoutChange(layout.id)}
              className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                isSelected
                  ? 'border-memoir-gold bg-memoir-gold/10'
                  : 'border-memoir-blue/20 hover:border-memoir-gold/50'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon 
                  className={`w-8 h-8 ${isSelected ? 'text-memoir-gold' : 'text-memoir-blue/50'}`}
                />
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
      
      <div className="mt-4 p-4 bg-memoir-blue/5 rounded-lg">
        <p className="text-sm text-memoir-blue/70">
          💡 Sur mobile, toutes les mises en page s'adaptent automatiquement en une colonne
        </p>
      </div>
    </div>
  );
}