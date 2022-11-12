export type Users = {
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
