import { useState } from "react";
import { registerUser, RegisterResponse } from "../services/authService";

type RegisterStatus = "idle" | "loading" | "success" | "error";

export function useRegister() {
  const [status, setStatus] = useState<RegisterStatus>("idle");
  const [message, setMessage] = useState("");
  const [data, setData] = useState<RegisterResponse | null>(null);

  async function submit(payload: {
    nome: string;
    email: string;
    senha: string;
    idade: string;
    sexo: string;
    tipoSanguineo: string;
    tipoUsuario: string;
    alergias: string;
  }): Promise<boolean> {
    setStatus("loading");
    setMessage("Enviando...");
    setData(null);

    try {
      const response = await registerUser(payload);
      setData(response);
      setStatus("success");
      setMessage("Usuario criado com sucesso.");
      return true;
    } catch (error) {
      const message =
        typeof (error as { message?: string }).message === "string"
          ? (error as { message: string }).message
          : "Falha ao cadastrar usuario.";
      setStatus("error");
      setMessage(message);
      return false;
    }
  }

  return { status, message, data, submit };
}
