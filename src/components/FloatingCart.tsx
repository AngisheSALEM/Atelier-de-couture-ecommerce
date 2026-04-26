'use client';

import { useCart } from '@/hooks/useCart';
import { BigButton } from '@/components/ui/BigButton';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function FloatingCart() {
  const { items, getTotalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t-4 border-rose-100 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden md:block">
          <p className="text-xl font-bold text-rose-900">
            {items.length} {items.length > 1 ? 'articles' : 'article'} dans votre sac
          </p>
        </div>
        <Link href="/checkout" className="flex-1">
          <BigButton className="text-2xl h-16 md:h-20">
            <ShoppingBag className="w-8 h-8" />
            Mon Sac : <span className="ml-2 font-black">{getTotalPrice()} $</span> — Passer à la caisse
          </BigButton>
        </Link>
      </div>
    </div>
  );
}
