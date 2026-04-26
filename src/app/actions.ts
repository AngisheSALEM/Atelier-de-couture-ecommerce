'use server';

import prisma from '@/lib/prisma';

export async function createOrder(data: {
  nom: string;
  telephone: string;
  ville: string;
  typePaiement: string;
  total: number;
}) {
  try {
    const client = await prisma.client.upsert({
      where: { telephone: data.telephone },
      update: { nom: data.nom, ville: data.ville },
      create: {
        nom: data.nom,
        telephone: data.telephone,
        ville: data.ville
      },
    });

    const order = await prisma.commande.create({
      data: {
        clientId: client.id,
        type_paiement: data.typePaiement,
        total: data.total,
        status: 'EN_ATTENTE',
      },
    });

    console.log(`[SMS Simulation] Confirmation envoyée à ${data.telephone} pour la commande ${order.id}`);

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: 'Une erreur est survenue lors de la commande.' };
  }
}

export async function scheduleAppointment(data: {
  nom: string;
  telephone: string;
  date: Date;
  heure: string;
  motif: string;
}) {
  try {
    const client = await prisma.client.upsert({
      where: { telephone: data.telephone },
      update: { nom: data.nom },
      create: {
        nom: data.nom,
        telephone: data.telephone
      },
    });

    const appointment = await prisma.rendezVous.create({
      data: {
        clientId: client.id,
        date: data.date,
        heure: data.heure,
        motif: data.motif,
      },
    });

    console.log(`[SMS Simulation] Rendez-vous confirmé pour ${data.nom} le ${data.date.toLocaleDateString()}`);

    return { success: true, appointmentId: appointment.id };
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    return { success: false, error: 'Impossible de prendre le rendez-vous.' };
  }
}
