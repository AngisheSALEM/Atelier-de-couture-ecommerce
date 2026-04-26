import { useState, useEffect } from 'react';

const KINSHASA_COMMUNES = [
  "Bandalungwa", "Barumbu", "Bumbu", "Gombe", "Kalamu", "Kasa-Vubu", "Kimbanseke",
  "Kinshasa", "Kintambo", "Kisenso", "Lemba", "Limete", "Lingwala", "Makala",
  "Maluku", "Masina", "Matete", "Mont-Ngafula", "Ndjili", "Ngaba", "Ngaliema",
  "Ngiri-Ngiri", "Nsele", "Selembao"
];

export function useSmartForm() {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    ville: 'Kinshasa',
  });

  useEffect(() => {
    // 1. Recover saved info
    const savedNom = localStorage.getItem('ml_nom');
    const savedTel = localStorage.getItem('ml_tel');
    const savedVille = localStorage.getItem('ml_ville');

    if (savedNom || savedTel || savedVille) {
      setFormData(prev => ({
        ...prev,
        nom: savedNom || '',
        telephone: savedTel || '',
        ville: savedVille || prev.ville,
      }));
    }

    // 2. Try to get geolocation and predict commune
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=fr`);
          const data = await response.json();

          if (data.locality) {
             const detectedCommune = KINSHASA_COMMUNES.find(c =>
               data.locality.toLowerCase().includes(c.toLowerCase()) ||
               (data.principalSubdivision && data.principalSubdivision.toLowerCase().includes(c.toLowerCase()))
             );

             if (detectedCommune) {
               updateField('ville', detectedCommune);
             } else if (data.city) {
               updateField('ville', data.city);
             }
          }
        } catch (error) {
          console.error('Error fetching location', error);
        }
      }, (err) => console.log("Geoloc denied", err));
    }
  }, []);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Auto-save
    if (field === 'nom') localStorage.setItem('ml_nom', value);
    if (field === 'telephone') localStorage.setItem('ml_tel', value);
    if (field === 'ville') localStorage.setItem('ml_ville', value);
  };

  return { formData, updateField };
}
