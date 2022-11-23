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
  utilisateur: {
    id: number;
    nom: string;
    prenom: string;
    role: number;
  };
  categorie_article: {
    id: number;
    nomCategorie: string;
  };
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

export type UpdateStatePost = {
  id: number;
  etat_article: {
    id: number;
    nomEtat: string;
  };
};

export type SwitchRecommanded = {
  id: number;
  recommadee: boolean;
};

export type SwitchTop = {
  id: number;
  top: boolean;
};

export type PostPublishedCategory = {
  id: number;
  categorie_article: [];
};
