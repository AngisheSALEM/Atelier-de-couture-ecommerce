'use client';

import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

export function Navbar() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-3xl font-black text-rose-600 tracking-tighter">
              Maman LOUISE.
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/#collection" className="text-xl font-bold text-gray-700 hover:text-rose-600 transition-colors">
              Collection
            </Link>
            <Link href="/rdv" className="text-xl font-bold text-gray-700 hover:text-rose-600 transition-colors">
              Prendre RDV
            </Link>
            <Link href="/admin" className="text-xl font-bold text-gray-700 hover:text-rose-600 transition-colors">
              Admin
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher un modèle..."
                className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-12 pr-4 text-lg focus:ring-2 focus:ring-rose-500 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-rose-600 md:hidden">
              <Search className="w-7 h-7" />
            </button>
            <Link href="/favorites" className="p-2 text-gray-600 hover:text-rose-600 relative">
              <Heart className="w-7 h-7" />
            </Link>
            <Link href="/checkout" className="p-2 text-gray-600 hover:text-rose-600 relative">
              <ShoppingBag className="w-7 h-7" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/admin" className="hidden sm:flex p-2 text-gray-600 hover:text-rose-600">
              <User className="w-7 h-7" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-rose-600"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-6 space-y-4 shadow-lg">
          <Link href="/#collection" className="block text-2xl font-bold text-gray-800 py-2">Collection</Link>
          <Link href="/rdv" className="block text-2xl font-bold text-gray-800 py-2">Prendre RDV</Link>
          <Link href="/admin" className="block text-2xl font-bold text-gray-800 py-2">Tableau de bord</Link>
          <div className="pt-4 border-t border-gray-100">
            <Link href="/profile" className="flex items-center gap-3 text-2xl font-bold text-gray-800 py-2">
              <User className="w-6 h-6" /> Mon Profil
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
