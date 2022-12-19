export type WriterRequest = {
  id: number;
  utilisateur: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
  };
  acceptee: boolean;
};

export type AcceptWriterRequest = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
};
