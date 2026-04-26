import Link from 'next/link';
import { BigButton } from '@/components/ui/BigButton';
import { ShoppingBag, Calendar, ArrowRight } from 'lucide-react';

const FEATURED_MODELS = [
  { id: '1', name: 'Libaya de Fête', price: 45, image: '👗' },
  { id: '2', name: 'Robe Pagne Chic', price: 60, image: '💃' },
  { id: '3', name: 'Ensemble Maman', price: 55, image: '🎀' },
  { id: '4', name: 'Tenue de Mariage', price: 120, image: '👰' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-rose-50 pb-20">
      <section className="bg-rose-600 text-white px-6 py-16 text-center shadow-lg">
        <h1 className="text-5xl md:text-7xl font-black mb-4">Chez Maman LOUISE</h1>
        <p className="text-2xl md:text-3xl font-medium mb-10 opacity-90">
          La couture congolaise d&apos;excellence, faite avec amour.
        </p>
        <div className="flex flex-col gap-4 max-w-xl mx-auto">
          <Link href="/rdv">
            <BigButton variant="secondary" className="text-3xl py-8">
              <Calendar className="w-10 h-10" />
              Prendre Rendez-vous
            </BigButton>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black text-rose-900 uppercase tracking-tighter">Nos Modèles</h2>
          <span className="bg-rose-200 text-rose-800 px-4 py-2 rounded-full font-bold text-xl">Nouveautés ✨</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {FEATURED_MODELS.map((model) => (
            <div key={model.id} className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white hover:border-rose-300 transition-all flex flex-col h-full">
              <div className="aspect-square bg-rose-100 flex items-center justify-center text-9xl">
                {model.image}
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2">{model.name}</h3>
                  <p className="text-4xl font-bold text-rose-600 mb-6">{model.price} $</p>
                </div>
                <Link href={`/checkout?item=${model.id}&name=${encodeURIComponent(model.name)}&price=${model.price}`}>
                  <BigButton className="text-2xl">
                    <ShoppingBag className="w-8 h-8" />
                    Commander en un clic
                  </BigButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t-4 border-rose-100 flex justify-center md:hidden">
         <Link href="/rdv" className="w-full">
            <BigButton variant="secondary">
              Prendre RDV maintenant
              <ArrowRight />
            </BigButton>
         </Link>
      </div>
    </main>
  );
}
