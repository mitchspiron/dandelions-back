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
};

export type GetEvenement = {
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
  inscription_evenement: {
    id: number;
    idUtilisateur: number;
  }[];
};
