export type CreateEvenement = {
  id: number;
  idEntreprise: number;
  titre: string;
  slug: string;
  illustration: string;
  description: string;
  contenu: string;
  deadline: Date;
  onHeader: boolean;
  createdAt: Date;
  onSubscribe: boolean;
};

export type GetEvenement = {
  id: number;
  entreprise: {
    id: number;
    nom: string;
    illustration: string;
    slug: string;
    descriptionA: string;
  };
  titre: string;
  slug: string;
  illustration: string;
  description: string;
  contenu: string;
  deadline: Date;
  onHeader: boolean;
  createdAt: Date;
  onSubscribe: boolean;
  inscription_evenement: {
    id: number;
    idUtilisateur: number;
  }[];
};

export type SwitchOnHeader = {
  id: number;
  onHeader: boolean;
};

export type SwitchOnSubscribe = {
  id: number;
  onSubscribe: boolean;
};
