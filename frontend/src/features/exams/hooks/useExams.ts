import { useCallback, useState } from "react";
import {
  criarExame,
  ExameItem,
  ExameResumo,
  ExameRequest,
  listarExames,
  resumoExames,
  uploadAnexo
} from "../services/examService";

type LoadStatus = "idle" | "loading" | "error";

export function useExams() {
  const [status, setStatus] = useState<LoadStatus>("idle");
  const [message, setMessage] = useState("");
  const [exames, setExames] = useState<ExameItem[]>([]);
  const [resumo, setResumo] = useState<ExameResumo | null>(null);

  const carregar = useCallback(async (usuarioId: number) => {
    setStatus("loading");
    setMessage("");
    try {
      const [listaResult, resumoResult] = await Promise.allSettled([
        listarExames(usuarioId),
        resumoExames(usuarioId)
      ]);
      if (listaResult.status === "fulfilled") {
        const lista = listaResult.value;
        if (!Array.isArray(lista)) {
          throw new Error("Resposta invalida da lista de exames.");
        }
        setExames(lista);
      }
      if (resumoResult.status === "fulfilled") {
        setResumo(resumoResult.value);
      } else {
        setResumo(null);
      }
      setStatus("idle");
    } catch (error) {
      const message =
        typeof (error as { message?: string }).message === "string"
          ? (error as { message: string }).message
          : "Falha ao carregar exames.";
      setStatus("error");
      setMessage(message);
    }
  }, []);

  const criar = useCallback(
    async (
      payload: ExameRequest & {
        anexoArquivo?: File | null;
      }
    ) => {
    setStatus("loading");
    setMessage("");
    try {
      const { anexoArquivo, ...examePayload } = payload;
      const criado = await criarExame(examePayload);
      setExames((prev) => [criado, ...prev]);
      setResumo((prev) => {
        const base = prev ?? { sangue: 0, urina: 0, imagem: 0 };
        const categoria = (criado.categoria || "").toUpperCase();
        if (categoria === "SANGUE") return { ...base, sangue: base.sangue + 1 };
        if (categoria === "URINA") return { ...base, urina: base.urina + 1 };
        if (categoria === "IMAGEM") return { ...base, imagem: base.imagem + 1 };
        return base;
      });
      let falhaUpload = false;
      if (anexoArquivo) {
        try {
          await uploadAnexo(criado.idExame, anexoArquivo);
        } catch (error) {
          falhaUpload = true;
        }
      }
      await carregar(payload.usuarioId);
      if (falhaUpload) {
        setStatus("error");
        setMessage("Exame criado, mas falha ao enviar o anexo.");
      } else {
        setStatus("idle");
      }
    } catch (error) {
      const message =
        typeof (error as { message?: string }).message === "string"
          ? (error as { message: string }).message
          : "Falha ao criar exame.";
      setStatus("error");
      setMessage(message);
    }
    },
    [carregar]
  );

  return { status, message, exames, resumo, carregar, criar };
}
