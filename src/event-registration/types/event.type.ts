export type EventRegistration = {
  id: number;
  evenement: {
    id: number;
    titre: string;
  };
  utilisateur: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
  };
};
