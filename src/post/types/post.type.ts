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
  isPublier: boolean;
};
