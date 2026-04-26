import React from 'react';
import { cn } from '@/lib/utils';
import { Phone, Smartphone, CheckCircle2 } from 'lucide-react';

type Operator = 'MPESA' | 'AIRTEL' | 'ORANGE';

interface MobileMoneyPickerProps {
  selected?: Operator;
  onSelect: (operator: Operator) => void;
}

const operators: { id: Operator; name: string; color: string; bgColor: string; icon: React.ElementType }[] = [
  {
    id: 'MPESA',
    name: 'M-Pesa',
    color: 'text-white',
    bgColor: 'bg-red-600',
    icon: Phone,
  },
  {
    id: 'AIRTEL',
    name: 'Airtel Money',
    color: 'text-white',
    bgColor: 'bg-rose-700',
    icon: Smartphone,
  },
  {
    id: 'ORANGE',
    name: 'Orange Money',
    color: 'text-white',
    bgColor: 'bg-orange-500',
    icon: Phone,
  },
];

export function MobileMoneyPicker({ selected, onSelect }: MobileMoneyPickerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {operators.map((op) => (
        <button
          key={op.id}
          type="button"
          onClick={() => onSelect(op.id)}
          className={cn(
            'relative flex flex-col items-center justify-center p-6 rounded-2xl border-4 transition-all h-40',
            selected === op.id
              ? 'border-blue-500 scale-105 shadow-2xl z-10'
              : 'border-transparent opacity-80 hover:opacity-100',
            op.bgColor
          )}
        >
          {selected === op.id && (
            <div className="absolute top-2 right-2 bg-white rounded-full">
              <CheckCircle2 className="w-8 h-8 text-blue-500" />
            </div>
          )}
          <op.icon className={cn('w-12 h-12 mb-2', op.color)} />
          <span className={cn('text-xl font-black uppercase tracking-wider', op.color)}>
            {op.name}
          </span>
        </button>
      ))}
    </div>
  );
}
