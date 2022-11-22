export type CreateComment = {
  id: number;
  idUtilisateur: number;
  idArticle: number;
  contenu: string;
  createdAt: Date;
};

export type GetComment = {
  id: number;
  utilisateur: {
    id: number;
    nom: string;
    prenom: string;
    illustration: string;
  };
  idArticle: number;
  contenu: string;
  createdAt: Date;
  reponse: {
    id: number;
    utilisateur: {
      id: number;
      nom: string;
      prenom: string;
      illustration: string;
    };
    contenu: string;
    createdAt: Date;
  }[];
};
