export type Users = {
  id: number;
  nom: string;
  prenom: string;
  illustration: string;
  email: string;
  telephone: string;
  aPropos: string;
  role_utilisateur: {
    id: number;
    nomRole: string;
  };
  motDePasse: string;
};

export type UsersCreate = {
  id: number;
  nom: string;
  prenom: string;
  illustration: string;
  email: string;
  telephone: string;
  aPropos: string;
  role: number;
  motDePasse: string;
};

export type UsersInfo = {
  id: number;
  nom: string;
  prenom: string;
  illustration: string;
  email: string;
  telephone: string;
  aPropos: string;
  role: number;
};

export type UsersPassword = {
  id: number;
  motDePasse: string;
};

export type UserTokenWithoutPassword = [
  {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    aPropos: string;
    role: number;
  },
  {
    access_token: string;
  },
];
