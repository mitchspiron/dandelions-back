export type CreatePost = {
  idRedacteur: number;
  idCategorie: number;
  titre: string;
  slug: string;
  illustration: string;
  description: string;
  contenu: string;
  top: boolean;
  recommadee: boolean;
  etat: number;
};

export type GetPost = {
  id: number;
  idRedacteur: number;
  idCategorie: number;
  titre: string;
  slug: string;
  illustration: string;
  description: string;
  contenu: string;
  top: boolean;
  recommadee: boolean;
  etat_article: {
    id: number;
    nomEtat: string;
  };
  createdAt: Date;
  commentaire: {
    id: number;
    idUtilisateur: number;
    contenu: string;
    createdAt: Date;
    reponse: {
      id: number;
      idUtilisateur: number;
      contenu: string;
      createdAt: Date;
    }[];
  }[];
};

export type UpdatePost = {
  id: number;
  idRedacteur: number;
  idCategorie: number;
  titre: string;
  slug: string;
  illustration: string;
  description: string;
  contenu: string;
  top: boolean;
  recommadee: boolean;
  etat: number;
  createdAt: Date;
};
