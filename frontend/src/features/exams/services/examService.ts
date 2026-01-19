import { apiGet, apiPost, apiPostForm } from "../../../shared/services/api";

export type ExameResumo = {
  sangue: number;
  urina: number;
  imagem: number;
};

export type ExameItem = {
  idExame: number;
  titulo: string;
  categoria: string;
  tipoExame: string;
  dataExame: string;
  clinica: string;
  medico: string;
  status: string;
  anexos: number;
};

export type ExameRequest = {
  usuarioId: number;
  titulo: string;
  categoria: string;
  tipoExame: string;
  dataExame: string;
  clinica: string;
  medico: string;
  observacoes: string;
  status: string;
};

export type AnexoRequest = {
  nome: string;
  tipo: string;
  url: string;
};

export async function listarExames(usuarioId: number): Promise<ExameItem[]> {
  return apiGet<ExameItem[]>(`/exames?usuarioId=${usuarioId}`);
}

export async function resumoExames(usuarioId: number): Promise<ExameResumo> {
  return apiGet<ExameResumo>(`/exames/resumo?usuarioId=${usuarioId}`);
}

export async function criarExame(payload: ExameRequest): Promise<ExameItem> {
  return apiPost<ExameItem>("/exames", payload);
}

export async function adicionarAnexo(exameId: number, payload: AnexoRequest): Promise<void> {
  await apiPost(`/exames/${exameId}/anexos`, payload);
}

export async function uploadAnexo(exameId: number, file: File): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);
  await apiPostForm(`/exames/${exameId}/anexos/upload`, formData);
}
