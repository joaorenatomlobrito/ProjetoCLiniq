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
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return apiPost<LoginResponse>("/auth/login", payload);
}
