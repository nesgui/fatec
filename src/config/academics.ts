/**
 * Offre de formation et admissions de la FATEC.
 * Source : formulaire d'inscription officiel, année académique 2026-2027.
 * Étape 3 : ces données passeront en base de données et seront gérées depuis l'admin.
 */

type T = { fr: string; en: string };

export const academicYear = '2026-2027';

/** Formulaire d'inscription actuel (Google Forms), en attendant le formulaire en ligne du site (étape 4). */
export const applicationFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSfn8vf3uNv6Z3Y5r-KfxnTCoahcUSlAoVS6dO9SECF7kDMBFg/viewform';

/** Frais d'inscription + formulaire, non remboursables, payés au campus lors du dépôt (inchangés sur les affiches 2024 et 2025). */
export const applicationFeeUsd = 10;

export const studyModes: { id: string; icon: string; label: T }[] = [
  { id: 'onsite', icon: 'ph-buildings', label: { fr: 'En présentiel', en: 'On campus' } },
  { id: 'online', icon: 'ph-laptop', label: { fr: 'En ligne', en: 'Online' } }
];

const theologySpecializations: T[] = [
  { fr: 'Ancien Testament', en: 'Old Testament' },
  { fr: 'Nouveau Testament', en: 'New Testament' },
  { fr: 'Histoire de l’Église', en: 'Church History' },
  { fr: 'Théologie systématique', en: 'Systematic Theology' },
  { fr: 'Théologie pratique', en: 'Practical Theology' },
  { fr: 'Missiologie', en: 'Missiology' }
];

export type Program = {
  id: string;
  icon: string;
  level: T;
  name: T;
  description?: T;
  specializations?: T[];
  /** Durée du cursus (source : affiche des inscriptions 2025-2026). */
  duration?: T;
  /** Également proposé en ligne (affiche 2025-2026 : « Licence en ligne », « bientôt Master en ligne »). */
  online?: boolean;
};

export const programs: Program[] = [
  {
    id: 'licence',
    icon: 'ph-graduation-cap',
    level: { fr: 'Premier cycle', en: 'Undergraduate' },
    name: { fr: 'Licence', en: 'Bachelor’s degree (Licence)' },
    duration: { fr: '3 ans', en: '3 years' },
    online: true
  },
  {
    id: 'master',
    icon: 'ph-books',
    level: { fr: 'Deuxième cycle', en: 'Graduate' },
    name: { fr: 'Master en théologie', en: 'Master of Theology' },
    duration: { fr: '2 ans', en: '2 years' },
    specializations: theologySpecializations
  },
  {
    id: 'dmin',
    icon: 'ph-chalkboard-teacher',
    level: { fr: 'Troisième cycle', en: 'Doctoral' },
    name: { fr: 'Doctorat en Ministères (DMin)', en: 'Doctor of Ministry (DMin)' },
    specializations: theologySpecializations
  },
  {
    id: 'phd',
    icon: 'ph-scroll',
    level: { fr: 'Troisième cycle', en: 'Doctoral' },
    name: { fr: 'Doctorat en Théologie (PhD)', en: 'Doctor of Philosophy in Theology (PhD)' },
    duration: { fr: '4 ans', en: '4 years' },
    specializations: theologySpecializations
  },
  {
    id: 'langues',
    icon: 'ph-translate',
    level: { fr: 'Institut', en: 'Institute' },
    name: { fr: 'Institut des Langues Bibliques', en: 'Institute of Biblical Languages' },
    specializations: [
      { fr: 'Hébreu', en: 'Hebrew' },
      { fr: 'Grec', en: 'Greek' },
      { fr: 'Araméen', en: 'Aramaic' }
    ]
  },
  {
    id: 'mamans-pasteurs',
    icon: 'ph-users-three',
    level: { fr: 'École', en: 'School' },
    name: { fr: 'École des Mamans Pasteurs', en: 'School for Pastors’ Wives (École des Mamans Pasteurs)' },
    description: {
      fr: 'Formation ouverte notamment aux épouses des étudiants de la FATEC.',
      en: 'A program open in particular to the wives of FATEC students.'
    }
  }
];

/** Pièces à joindre au dossier (required = obligatoire dans le formulaire officiel). */
export const requiredDocuments: { label: T; required?: boolean; note?: T }[] = [
  { label: { fr: 'Photo au format passeport', en: 'Passport-size photo' }, required: true },
  {
    label: { fr: 'Bref témoignage de conversion à Jésus-Christ', en: 'Short testimony of conversion to Jesus Christ' },
    required: true
  },
  {
    label: { fr: 'Preuve de paiement des frais de dossier', en: 'Proof of payment of the application fee' },
    required: true
  },
  { label: { fr: 'Photocopie des diplômes', en: 'Copies of diplomas' } },
  { label: { fr: 'Certificat médical', en: 'Medical certificate' } },
  { label: { fr: 'Recommandation de l’église', en: 'Church recommendation letter' } },
  { label: { fr: 'Attestation de ressources financières', en: 'Proof of financial resources' } },
  {
    label: { fr: 'Attestation de mariage', en: 'Marriage certificate' },
    note: { fr: 'candidats et candidates mariés', en: 'married applicants' }
  },
  {
    // Formulation neutre : la FATEC forme « serviteurs et servantes » (le formulaire officiel dit « l'épouse »).
    label: {
      fr: 'Bref témoignage de conversion du conjoint ou de la conjointe',
      en: 'Short conversion testimony of the spouse'
    },
    note: { fr: 'candidats et candidates mariés', en: 'married applicants' }
  }
];

/** Confession de foi de la FATEC (texte officiel ; l'anglais est une traduction à faire valider). */
export const confessionOfFaith: { text: T; ref: T }[] = [
  {
    text: {
      fr: 'Dieu est Un en essence, mais Trois en Personnes : Père – Fils – Saint-Esprit.',
      en: 'God is One in essence, but Three in Persons: Father – Son – Holy Spirit.'
    },
    ref: { fr: 'Matthieu 28 : 19', en: 'Matthew 28:19' }
  },
  {
    text: {
      fr: 'La Bible est la Parole infaillible de Dieu, et représente la volonté absolue de Dieu en matière de vie, de foi et de conduite.',
      en: 'The Bible is the infallible Word of God and represents God’s absolute will in matters of life, faith and conduct.'
    },
    ref: { fr: '2 Timothée 3 : 16-17', en: '2 Timothy 3:16-17' }
  },
  {
    text: {
      fr: 'L’humanité a été créée bonne par Dieu, mais elle est tombée dans le péché par sa désobéissance et sa rébellion contre Dieu.',
      en: 'Humanity was created good by God, but fell into sin through its disobedience and rebellion against God.'
    },
    ref: { fr: 'Genèse 2-3', en: 'Genesis 2–3' }
  },
  {
    text: {
      fr: 'Jésus est Emmanuel, Dieu avec nous : Il est devenu homme, et est venu sur la terre pour nous sauver du péché. Il est le seul chemin, la seule vérité, et la seule vie qui nous amène au Père.',
      en: 'Jesus is Emmanuel, God with us: He became man and came to earth to save us from sin. He is the only way, the only truth and the only life that leads us to the Father.'
    },
    ref: { fr: 'Jean 14 : 6', en: 'John 14:6' }
  },
  {
    text: {
      fr: 'Le Saint-Esprit est Dieu en nous : Il nous dynamise afin que nous puissions vivre et témoigner avec onction et puissance, de Christ dans le monde.',
      en: 'The Holy Spirit is God in us: He empowers us so that we may live and bear witness to Christ in the world with anointing and power.'
    },
    ref: { fr: 'Actes 1 : 4, 8', en: 'Acts 1:4, 8' }
  },
  {
    text: {
      fr: 'La mission première de l’Église consiste à prêcher la Bonne Nouvelle et à gagner les âmes perdues pour le Seigneur Jésus-Christ.',
      en: 'The primary mission of the Church is to preach the Good News and to win lost souls for the Lord Jesus Christ.'
    },
    ref: { fr: 'Matthieu 28 : 16-20', en: 'Matthew 28:16-20' }
  },
  {
    text: {
      fr: 'La vie de sanctification, d’obéissance, et de service à Dieu, sous la puissance de sa grâce, est indispensable pour confirmer l’œuvre salvatrice du Christ en nous.',
      en: 'A life of sanctification, obedience and service to God, under the power of His grace, is essential to confirm Christ’s saving work in us.'
    },
    ref: { fr: 'Matthieu 7 : 16, 20', en: 'Matthew 7:16, 20' }
  },
  {
    text: {
      fr: 'Il y aura un jugement dernier, à la fin des temps. Nous qui croyons au Seigneur Jésus-Christ vivrons éternellement avec Dieu. Ceux qui n’auront pas cru au Seigneur Jésus-Christ pendant leur vie terrestre vivront éternellement sous la punition divine dans l’enfer.',
      en: 'There will be a last judgment at the end of time. We who believe in the Lord Jesus Christ will live eternally with God. Those who have not believed in the Lord Jesus Christ during their earthly life will live eternally under divine punishment in hell.'
    },
    ref: { fr: 'Apocalypse 20 : 11-14', en: 'Revelation 20:11-14' }
  }
];
