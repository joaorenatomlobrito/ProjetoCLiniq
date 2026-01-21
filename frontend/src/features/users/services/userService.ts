import { apiGet } from "../../../shared/services/api";

export type UserProfile = {
  idUsuario: number;
  nome: string;
  email: string;
  idade: number;
  sexo: string;
  tipoSanguineo: string;
  tipoUsuario: string;
  alergias: string;
};

export async function getUserById(id: number): Promise<UserProfile> {
  return apiGet<UserProfile>(`/usuarios/${id}`);
}
