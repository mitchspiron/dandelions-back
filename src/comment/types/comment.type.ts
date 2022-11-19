export type CreateComment = {
  id: number;
  idUtilisateur: number;
  idArticle: number;
  contenu: string;
  createdAt: Date;
};

export type GetComment = {
  id: number;
  idUtilisateur: number;
  idArticle: number;
  contenu: string;
  createdAt: Date;
  reponse: {
    id: number;
    idUtilisateur: number;
    contenu: string;
    createdAt: Date;
  }[];
};
