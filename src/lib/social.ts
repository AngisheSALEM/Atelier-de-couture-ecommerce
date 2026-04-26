export interface SocialProduct {
  nom: string;
  prix: number;
}

export function generateSocialCaption(product: SocialProduct) {
  const whatsappNumber = "243812345678"; // Numéro fictif de Maman Louise
  const message = encodeURIComponent(`Bonjour Chez Maman LOUISE, je suis intéressée par le modèle "${product.nom}" vu sur votre site.`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return `🧵 ✨ L'élégance du pagne chez "Chez Maman LOUISE" ! ✨ 🇨🇩

Découvrez notre nouveau modèle : ${product.nom}
Prix : ${product.prix} $

Qualité supérieure, couture sur mesure et amour du pagne. 👗❤️

Commandez directement sur notre site ou contactez-nous sur WhatsApp ici :
👉 ${whatsappLink}

#ChezMamanLouise #ModeRDC #PagneAfricain #CoutureDeQualite`;
}
