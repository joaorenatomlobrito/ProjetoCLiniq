import { apiPost } from "../../../shared/services/api";

export type LoginPayload = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  idUsuario: number;
  email: string;
  nome: string;
  mensagem: string;
  token: string;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return apiPost<LoginResponse>("/auth/login", payload);
}

export type RegisterPayload = {
  nome: string;
  email: string;
  senha: string;
  idade: string;
  sexo: string;
  tipoSanguineo: string;
  tipoUsuario: string;
  alergias: string;
};

export type RegisterResponse = {
  idUsuario: number;
  nome: string;
  email: string;
  idade: string;
  sexo: string;
  tipoSanguineo: string;
  tipoUsuario: string;
  alergias: string;
};

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  return apiPost<RegisterResponse>("/usuarios", payload);
}
