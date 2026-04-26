'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useSmartForm } from '@/hooks/useSmartForm';
import { BigButton } from '@/components/ui/BigButton';
import { MobileMoneyPicker } from '@/components/ui/MobileMoneyPicker';
import { createOrder } from '@/app/actions';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const { formData, updateField } = useSmartForm();

  const [operator, setOperator] = useState<'MPESA' | 'AIRTEL' | 'ORANGE'>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const itemName = searchParams.get('name') || 'Modèle Personnalisé';
  const itemPrice = parseFloat(searchParams.get('price') || '0');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      total: itemPrice,
    });

    if (result.success) {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 3000);
    } else {
      setIsSubmitting(false);
      alert(result.error);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="w-32 h-32 text-green-600 mb-6" />
        <h1 className="text-5xl font-black text-green-900 mb-4">Félicitations !</h1>
        <p className="text-2xl text-green-800 mb-10">
          Votre commande pour <strong>{itemName}</strong> a été enregistrée.<br/>
          Maman Louise vous contactera bientôt.
        </p>
        <Link href="/">
          <BigButton variant="success">Retour à l&apos;accueil</BigButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50 p-6 pb-24">
      <Link href="/" className="inline-flex items-center gap-2 text-rose-700 font-bold text-xl mb-8">
        <ArrowLeft /> Retour
      </Link>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl border-4 border-white mb-8">
          <h1 className="text-4xl font-black text-rose-900 mb-2">Finaliser ma commande</h1>
          <p className="text-xl text-rose-700 mb-8 font-medium">Article : {itemName} ({itemPrice} $)</p>

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
                <BigButton type="submit" className="text-3xl py-8">
                  Payer {itemPrice} $
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
    <Suspense fallback={<div className="min-h-screen bg-rose-50 flex items-center justify-center text-2xl font-bold">Chargement...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
