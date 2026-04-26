'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSmartForm } from '@/hooks/useSmartForm';
import { useCart } from '@/hooks/useCart';
import { BigButton } from '@/components/ui/BigButton';
import { MobileMoneyPicker } from '@/components/ui/MobileMoneyPicker';
import { createOrder } from '@/app/actions';
import { ArrowLeft, CheckCircle2, Loader2, Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

function CheckoutContent() {
  const { items, getTotalPrice, removeItem, updateQuantity, toggleMesures, clearCart } = useCart();
  const { formData, updateField } = useSmartForm();

  const [operator, setOperator] = useState<'MPESA' | 'AIRTEL' | 'ORANGE'>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = mounted ? getTotalPrice() : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!operator) {
      alert('Veuillez choisir un réseau Mobile Money');
      return;
    }

    setIsSubmitting(true);

    const result = await createOrder({
      nom: formData.nom,
      telephone: formData.telephone,
      ville: formData.ville,
      typePaiement: operator,
      total: total,
    });

    if (result.success) {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        clearCart();
      }, 3000);
    } else {
      setIsSubmitting(false);
      alert(result.error);
    }
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="w-32 h-32 text-green-600 mb-6" />
        <h1 className="text-5xl font-black text-green-900 mb-4">Félicitations !</h1>
        <p className="text-2xl text-green-800 mb-10">
          Votre commande a été enregistrée.<br/>
          Maman Louise vous contactera bientôt pour les détails.
        </p>
        <Link href="/">
          <BigButton variant="success" className="h-20 text-3xl">Retour à l&apos;accueil</BigButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50 p-6 pb-24">
      <Link href="/" className="inline-flex items-center gap-2 text-rose-700 font-bold text-2xl mb-8">
        <ArrowLeft className="w-8 h-8" /> Retour
      </Link>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Panier */}
        <div className="space-y-6">
          <h1 className="text-4xl font-black text-rose-900 mb-6 uppercase">Mon Panier</h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 shadow-xl text-center">
              <p className="text-2xl text-gray-500 mb-8 font-medium">Votre sac est vide</p>
              <Link href="/">
                <BigButton variant="primary">Voir la collection</BigButton>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-6 shadow-xl border-4 border-white flex gap-6">
                  <div className="w-24 h-24 bg-rose-100 rounded-2xl flex items-center justify-center text-5xl shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-black text-gray-900 truncate">{item.nom}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-rose-400 hover:text-rose-600 p-2">
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                    <p className="text-3xl font-bold text-rose-600 mb-4">{item.prix} $</p>

                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl font-bold hover:bg-gray-200"
                      >
                        <Minus />
                      </button>
                      <span className="text-2xl font-black w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl font-bold hover:bg-gray-200"
                      >
                        <Plus />
                      </button>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={item.mesuresFournies}
                        onChange={() => toggleMesures(item.id)}
                        className="w-6 h-6 rounded-lg accent-rose-600"
                      />
                      <span className="text-lg font-bold text-gray-700">Mesures fournies</span>
                    </label>
                  </div>
                </div>
              ))}

              <div className="bg-rose-900 text-white rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-2 opacity-80">
                  <span className="text-xl font-bold uppercase">Total à payer</span>
                </div>
                <div className="text-6xl font-black">{total} $</div>
              </div>
            </div>
          )}
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl border-4 border-white h-fit sticky top-6">
          <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase">Informations de livraison</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="block text-2xl font-bold text-gray-800">Votre Nom Complet</label>
              <input
                type="text"
                required
                className="w-full p-6 text-2xl rounded-2xl border-4 border-rose-100 focus:border-rose-500 outline-none transition-all"
                placeholder="Ex: Marie Kabila"
                value={formData.nom}
                onChange={(e) => updateField('nom', e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="block text-2xl font-bold text-gray-800">Numéro de Téléphone</label>
              <input
                type="tel"
                required
                className="w-full p-6 text-2xl rounded-2xl border-4 border-rose-100 focus:border-rose-500 outline-none transition-all"
                placeholder="Ex: 0812345678"
                value={formData.telephone}
                onChange={(e) => updateField('telephone', e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="block text-2xl font-bold text-gray-800">Votre Commune/Ville</label>
              <input
                type="text"
                required
                className="w-full p-6 text-2xl rounded-2xl border-4 border-rose-100 focus:border-rose-500 outline-none transition-all"
                placeholder="Ex: Gombe, Kinshasa"
                value={formData.ville}
                onChange={(e) => updateField('ville', e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="block text-2xl font-bold text-gray-800">Payer avec :</label>
              <MobileMoneyPicker selected={operator} onSelect={setOperator} />
            </div>

            <div className="pt-6">
              {isSubmitting ? (
                <div className="bg-blue-600 text-white rounded-2xl p-8 flex flex-col items-center gap-4 animate-pulse">
                  <Loader2 className="w-12 h-12 animate-spin" />
                  <p className="text-2xl font-bold text-center">
                    Attente de confirmation sur votre téléphone...<br/>
                    (Tapez votre code secret)
                  </p>
                </div>
              ) : (
                <BigButton
                  type="submit"
                  className="text-3xl py-8 h-24"
                  disabled={items.length === 0}
                >
                  Payer {total} $
                </BigButton>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-rose-50 flex items-center justify-center text-4xl font-black text-rose-900">Chargement...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
