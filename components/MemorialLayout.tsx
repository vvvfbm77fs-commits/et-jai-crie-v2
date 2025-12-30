'use client';

import { ReactNode } from 'react';
import { BlockType } from '@/lib/layouts';

interface MemorialLayoutProps {
  layout: string;
  blockOrder: BlockType[];
  blocks: Record<BlockType, ReactNode>;
}

export default function MemorialLayout({ layout, blockOrder, blocks }: MemorialLayoutProps) {
  // Fonction pour rendre un bloc
  const renderBlock = (blockId: BlockType) => {
    return blocks[blockId] || null;
  };

  // Layout classique : 1 colonne
  if (layout === 'classic') {
    return (
      <div className="space-y-8">
        {blockOrder.map(blockId => (
          <div key={blockId}>{renderBlock(blockId)}</div>
        ))}
      </div>
    );
  }

  // Layout éditorial : 2 colonnes
  if (layout === 'editorial') {
    return (
      <div className="grid md:grid-cols-[350px_1fr] gap-8">
        {/* Colonne gauche */}
        <div className="space-y-8">
          {renderBlock('profile')}
          {renderBlock('gouts')}
          {renderBlock('candle')}
        </div>
        
        {/* Colonne droite */}
        <div className="space-y-8">
          {renderBlock('text')}
          {renderBlock('messages')}
          {renderBlock('gallery')}
          {renderBlock('links')}
        </div>
      </div>
    );
  }

  // Layout magazine : asymétrique
  if (layout === 'magazine') {
    return (
      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        {/* Colonne large gauche */}
        <div className="space-y-8">
          {renderBlock('text')}
          {renderBlock('messages')}
          {renderBlock('gallery')}
        </div>
        
        {/* Colonne étroite droite */}
        <div className="space-y-8">
          {renderBlock('profile')}
          {renderBlock('gouts')}
          {renderBlock('candle')}
          {renderBlock('links')}
        </div>
      </div>
    );
  }

  // Layout triptyque : 3 colonnes
  if (layout === 'triptych') {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {/* Colonne gauche */}
        <div className="space-y-6">
          {renderBlock('gouts')}
          {renderBlock('candle')}
        </div>
        
        {/* Colonne centrale */}
        <div className="space-y-6">
          {renderBlock('profile')}
          {renderBlock('text')}
          {renderBlock('gallery')}
        </div>
        
        {/* Colonne droite */}
        <div className="space-y-6">
          {renderBlock('messages')}
          {renderBlock('links')}
        </div>
      </div>
    );
  }

  // Fallback : classic
  return (
    <div className="space-y-8">
      {blockOrder.map(blockId => (
        <div key={blockId}>{renderBlock(blockId)}</div>
      ))}
    </div>
  );
}
