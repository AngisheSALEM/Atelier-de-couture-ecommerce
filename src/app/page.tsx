'use client';

import Link from 'next/link';
import { BigButton } from '@/components/ui/BigButton';
import { ShoppingBag, CheckCircle, ShieldCheck, Scissors, Share2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { FloatingCart } from '@/components/FloatingCart';
import { generateSocialCaption } from '@/lib/social';
import { useState } from 'react';

const FEATURED_MODELS = [
  { id: '1', name: 'Libaya de Fête', prix: 45, image: '👗' },
  { id: '2', name: 'Robe Pagne Chic', prix: 60, image: '💃' },
  { id: '3', name: 'Ensemble Maman', prix: 55, image: '🎀' },
  { id: '4', name: 'Tenue de Mariage', prix: 120, image: '👰' },
];

export default function HomePage() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // Mode admin simulé

  const handleAddToCart = (model: typeof FEATURED_MODELS[0]) => {
    addItem({
      id: model.id,
      nom: model.name,
      prix: model.prix,
      image: model.image,
    });
    setAddedId(model.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const handleGenerateCaption = (model: typeof FEATURED_MODELS[0]) => {
    const caption = generateSocialCaption({ nom: model.name, prix: model.prix });
    navigator.clipboard.writeText(caption);
    alert('Publication copiée dans le presse-papier ! ✨');
  };

  return (
    <main className="min-h-screen bg-rose-50 pb-32">
      {/* Hero Section */}
      <section className="bg-rose-600 text-white px-6 py-20 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-rose-200 text-sm font-bold bg-rose-800/30 px-3 py-1 rounded-full"
          >
            {isAdmin ? 'Mode Admin: ON' : 'Mode Client'}
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            L&apos;élégance du pagne à portée de clic
          </h1>
          <p className="text-2xl md:text-3xl font-medium mb-12 opacity-95">
            Chez Maman LOUISE, nous sublimons votre beauté avec des tissus d&apos;exception et une couture sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="#collection" className="flex-1 max-w-sm">
              <BigButton variant="secondary" className="text-3xl h-20 shadow-2xl">
                Découvrir la collection
              </BigButton>
            </Link>
            <Link href="/rdv" className="flex-1 max-w-sm">
              <BigButton variant="outline" className="text-3xl h-20 bg-white/10 border-white text-white hover:bg-white hover:text-rose-600">
                Prendre RDV
              </BigButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Confiance */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl text-center flex flex-col items-center">
          <div className="bg-rose-100 p-4 rounded-full mb-4">
            <Scissors className="w-12 h-12 text-rose-600" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Couture de Qualité</h3>
          <p className="text-xl text-gray-600">Finition impeccable par nos experts couturiers.</p>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-xl text-center flex flex-col items-center">
          <div className="bg-amber-100 p-4 rounded-full mb-4">
            <ShieldCheck className="w-12 h-12 text-amber-600" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Paiement Sécurisé</h3>
          <p className="text-xl text-gray-600">Payez en toute confiance via Mobile Money.</p>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-xl text-center flex flex-col items-center">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Retouche Gratuite</h3>
          <p className="text-xl text-gray-600">Nous ajustons vos vêtements jusqu&apos;à satisfaction.</p>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black text-rose-900 uppercase tracking-tighter">Nos Modèles</h2>
          <span className="bg-rose-200 text-rose-800 px-4 py-2 rounded-full font-bold text-xl animate-pulse">Nouveautés ✨</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {FEATURED_MODELS.map((model) => (
            <div key={model.id} className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white hover:border-rose-300 transition-all flex flex-col h-full group">
              <div className="aspect-square bg-rose-100 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500">
                {model.image}
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2">{model.name}</h3>
                  <p className="text-4xl font-bold text-rose-600 mb-6">{model.prix} $</p>
                </div>

                <div className="space-y-4">
                  <BigButton
                    onClick={() => handleAddToCart(model)}
                    variant={addedId === model.id ? 'success' : 'primary'}
                    className="text-2xl h-20"
                  >
                    {addedId === model.id ? (
                      <>
                        <CheckCircle className="w-8 h-8" />
                        Ajouté au sac !
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-8 h-8" />
                        Ajouter au sac
                      </>
                    )}
                  </BigButton>

                  {isAdmin && (
                    <button
                      onClick={() => handleGenerateCaption(model)}
                      className="w-full py-4 text-rose-600 font-bold text-xl flex items-center justify-center gap-2 border-2 border-dashed border-rose-300 rounded-2xl hover:bg-rose-50 transition-colors"
                    >
                      <Share2 className="w-6 h-6" />
                      Générer la publication
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FloatingCart />
    </main>
  );
}
