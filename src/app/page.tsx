'use client';

import Link from 'next/link';
import { BigButton } from '@/components/ui/BigButton';
import { ShoppingBag, Star, ChevronRight, Zap, Award, Smile } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { FloatingCart } from '@/components/FloatingCart';
import { useState } from 'react';

const CATEGORIES = [
  { name: 'Libayas', icon: '👗', count: 12 },
  { name: 'Robes', icon: '💃', count: 8 },
  { name: 'Ensembles', icon: '🎀', count: 5 },
  { name: 'Accessoires', icon: '👜', count: 14 },
  { name: 'Mariage', icon: '👰', count: 3 },
];

const FEATURED_MODELS = [
  { id: '1', name: 'Libaya de Fête', prix: 45, image: '👗', rating: 4.8, status: 'New' },
  { id: '2', name: 'Robe Pagne Chic', prix: 60, image: '💃', rating: 4.9, status: 'Trending' },
  { id: '3', name: 'Ensemble Maman', prix: 55, image: '🎀', rating: 4.7, status: null },
  { id: '4', name: 'Tenue de Mariage', prix: 120, image: '👰', rating: 5.0, status: 'Premium' },
];

const BLOG_POSTS = [
  { id: 1, title: "Comment choisir son pagne pour un mariage ?", date: "12 Mars 2024", excerpt: "Découvrez les secrets pour assortir vos tissus et briller lors des grandes occasions." },
  { id: 2, title: "Les tendances Libaya 2024", date: "05 Mars 2024", excerpt: "Les coupes, les couleurs et les styles qui feront fureur cette année." },
];

export default function HomePage() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (model: (typeof FEATURED_MODELS)[0]) => {
    addItem({
      id: model.id,
      nom: model.name,
      prix: model.prix,
      image: model.image,
    });
    setAddedId(model.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-white pb-32">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-rose-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-200/50 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-100/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-2 rounded-full font-bold text-lg mb-6">
              <Zap className="w-5 h-5 fill-current" />
              <span>Nouveautés Été 2024</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none text-gray-900 tracking-tight">
              Stylish <br />
              <span className="text-rose-600">Pagne Couture</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-xl font-medium leading-relaxed">
              Sublimez votre beauté avec l&apos;élégance de nos créations sur mesure. L&apos;art du pagne revisité par Maman Louise.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="#collection">
                <BigButton variant="primary" className="text-2xl h-16 px-10 rounded-full shadow-2xl shadow-rose-200">
                  Acheter maintenant
                </BigButton>
              </Link>
              <Link href="/rdv">
                <BigButton variant="outline" className="text-2xl h-16 px-10 rounded-full border-2">
                  Prendre RDV
                </BigButton>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full aspect-square max-w-lg bg-rose-200 rounded-[3rem] overflow-hidden flex items-center justify-center text-[15rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
              👗
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4">
                <div className="bg-rose-600 p-2 rounded-full">
                  <Star className="w-6 h-6 text-white fill-current" />
                </div>
                <div>
                  <p className="text-gray-500 font-bold">Produit Phare</p>
                  <p className="text-xl font-black text-gray-900">Libaya de Fête</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
          <div className="flex overflow-x-auto gap-6 pb-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button key={cat.name} className="flex-shrink-0 flex items-center gap-4 bg-gray-50 hover:bg-rose-50 px-8 py-5 rounded-[2rem] transition-all group border-2 border-transparent hover:border-rose-100">
                <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <div className="text-left">
                  <p className="font-black text-xl text-gray-900 whitespace-nowrap">{cat.name}</p>
                  <p className="text-gray-500 font-bold">{cat.count} modèles</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-100">
        <div className="flex items-center gap-6">
          <div className="bg-rose-100 p-5 rounded-3xl text-rose-600">
            <Award className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900">Qualité Premium</h3>
            <p className="text-lg text-gray-500 font-medium leading-tight">Tissus authentiques et coutures renforcées.</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-amber-100 p-5 rounded-3xl text-amber-600">
            <Award className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900">Paiement Mobile</h3>
            <p className="text-lg text-gray-500 font-medium leading-tight">M-Pesa, Airtel & Orange Money acceptés.</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-green-100 p-5 rounded-3xl text-green-600">
            <Smile className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900">Maman Friendly</h3>
            <p className="text-lg text-gray-500 font-medium leading-tight">Service attentionné et retouches offertes.</p>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">New Arrivals</h2>
            <p className="text-2xl text-gray-500 font-medium">Découvrez nos dernières créations uniques.</p>
          </div>
          <Link href="/collection" className="flex items-center gap-2 text-rose-600 font-black text-xl hover:gap-4 transition-all">
            Voir toute la collection <ChevronRight className="w-6 h-6" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {FEATURED_MODELS.map((model) => (
            <div key={model.id} className="group relative">
              <div className="aspect-[4/5] bg-gray-50 rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center text-8xl group-hover:scale-[1.02] transition-all duration-500 relative border border-gray-100">
                {model.image}
                {model.status && (
                  <span className="absolute top-6 left-6 bg-gray-900 text-white text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                    {model.status}
                  </span>
                )}
                <button
                  onClick={() => handleAddToCart(model)}
                  className={`absolute bottom-6 right-6 p-4 rounded-full shadow-xl transition-all ${addedId === model.id ? 'bg-green-600 text-white' : 'bg-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 text-gray-900 hover:text-rose-600'}`}
                >
                  <ShoppingBag className="w-6 h-6" />
                </button>
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-gray-900">{model.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-lg font-bold">{model.rating}</span>
                  </div>
                </div>
                <p className="text-3xl font-black text-rose-600">{model.prix} $</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase underline decoration-rose-500 underline-offset-8">Our Blog</h2>
            <p className="text-2xl text-gray-500 font-medium">Conseils mode et histoires de pagne.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/40 group hover:shadow-2xl transition-all border border-gray-100">
                <p className="text-rose-600 font-black text-lg mb-4">{post.date}</p>
                <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-rose-600 transition-colors leading-tight">{post.title}</h3>
                <p className="text-xl text-gray-500 font-medium mb-8 leading-relaxed">{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-gray-900 font-black text-xl hover:text-rose-600">
                  Lire l&apos;article <ChevronRight className="w-6 h-6" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingCart />
    </main>
  );
}
