export type Token = {
  access_token: string;
};

export type User = {
  id: number;
  nom: string;
  prenom: string;
  illustration: string;
  email: string;
  telephone: string;
  role: number;
  motDePasse: string;
};

export type UserToken = [
  {
    id: number;
    nom: string;
    prenom: string;
    illustration: string;
    email: string;
    telephone: string;
    role: number;
    motDePasse: string;
  },
  {
    access_token: string;
  },
];
