import { useState } from "react";
import { login, LoginResponse } from "../services/authService";

type LoginStatus = "idle" | "loading" | "success" | "error";

export function useLogin() {
  const [status, setStatus] = useState<LoginStatus>("idle");
  const [message, setMessage] = useState("");
  const [data, setData] = useState<LoginResponse | null>(null);

  async function submit(email: string, senha: string) {
    setStatus("loading");
    setMessage("Enviando...");
    setData(null);

    try {
      const response = await login({ email, senha });
      setData(response);
      setStatus("success");
      setMessage(response.mensagem || "Login realizado.");
    } catch (error) {
      const message =
        typeof (error as { message?: string }).message === "string"
          ? (error as { message: string }).message
          : "Falha no login.";
      setStatus("error");
      setMessage(message);
    }
  }

  return { status, message, data, submit };
}
