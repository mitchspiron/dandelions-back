export type Response = {
  id: number;
  utilisateur: {
    id: number;
    nom: string;
    prenom: string;
    illustration: string;
  };
  idCommentaire: number;
  contenu: string;
  vu: boolean;
  createdAt: Date;
};

export type UnseenResponse = {
  id: number;
  utilisateur: {
    id: number;
    nom: string;
    prenom: string;
    illustration: string;
  };
  commentaire: {
    article: {
      id: number;
      titre: string;
      slug: string;
      idRedacteur: number;
    };
  };
  contenu: string;
  vu: boolean;
  createdAt: Date;
};
