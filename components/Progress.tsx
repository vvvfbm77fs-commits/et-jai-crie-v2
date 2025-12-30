'use client';

interface ProgressProps {
  current: number;
  total: number;
}

export default function Progress({ current, total }: ProgressProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-memoir-blue/60">
          Étape {current + 1} sur {total}
        </span>
        <span className="text-sm text-memoir-blue/60">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-memoir-blue/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-memoir-gold transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
