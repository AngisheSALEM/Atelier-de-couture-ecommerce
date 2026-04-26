'use client';

import { useState } from 'react';
import { useSmartForm } from '@/hooks/useSmartForm';
import { BigButton } from '@/components/ui/BigButton';
import { scheduleAppointment } from '@/app/actions';
import { ArrowLeft, CheckCircle2, Calendar as CalendarIcon, Clock } from 'lucide-react';
import Link from 'next/link';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function RDVPage() {
  const { formData, updateField } = useSmartForm();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      alert('Veuillez choisir une heure');
      return;
    }

    setIsSubmitting(true);
    const result = await scheduleAppointment({
      nom: formData.nom,
      telephone: formData.telephone,
      date: selectedDate,
      heure: selectedTime,
      motif: 'Prise de mesures / Commande',
    });

    if (result.success) {
      setIsSuccess(true);
    } else {
      alert(result.error);
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="w-32 h-32 text-green-600 mb-6" />
        <h1 className="text-5xl font-black text-green-900 mb-4">Rendez-vous Confirmé !</h1>
        <p className="text-2xl text-green-800 mb-10">
          Maman Louise vous attend le <strong>{format(selectedDate, 'EEEE d MMMM', { locale: fr })}</strong> à <strong>{selectedTime}</strong>.
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
          <h1 className="text-4xl font-black text-rose-900 mb-6">Prendre Rendez-vous</h1>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
              <label className="block text-2xl font-bold text-gray-800">Votre Nom</label>
              <input
                type="text"
                required
                className="w-full p-6 text-2xl rounded-2xl border-4 border-rose-100 focus:border-rose-500 outline-none transition-all"
                placeholder="Ex: Maman Alphonsine"
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
              <label className="block text-2xl font-bold text-gray-800 flex items-center gap-2">
                <CalendarIcon className="text-rose-600" /> Choisir le jour
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {next7Days.map((date) => (
                  <button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`p-4 rounded-xl border-4 font-bold text-lg transition-all ${
                      selectedDate.toDateString() === date.toDateString()
                        ? 'border-rose-600 bg-rose-600 text-white shadow-lg scale-105'
                        : 'border-rose-100 bg-white text-gray-700 hover:border-rose-300'
                    }`}
                  >
                    <span className="block uppercase text-xs opacity-70">
                      {format(date, 'EEE', { locale: fr })}
                    </span>
                    {format(date, 'd MMM', { locale: fr })}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Clock className="text-rose-600" /> Choisir l&apos;heure
              </label>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-4 rounded-xl border-4 font-bold text-xl transition-all ${
                      selectedTime === time
                        ? 'border-rose-600 bg-rose-600 text-white shadow-lg scale-105'
                        : 'border-rose-100 bg-white text-gray-700 hover:border-rose-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <BigButton type="submit" disabled={isSubmitting} className="text-3xl py-8">
                {isSubmitting ? 'Chargement...' : 'Confirmer mon rendez-vous'}
              </BigButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
