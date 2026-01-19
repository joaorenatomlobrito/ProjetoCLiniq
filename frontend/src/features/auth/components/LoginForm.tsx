import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const { status, message, submit } = useLogin();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");
    const senha = String(formData.get("senha") || "");
    try {
      const response = await submit(email.trim(), senha);
      form.reset();
      localStorage.setItem(
        "cliniq_usuario",
        JSON.stringify({ idUsuario: response.idUsuario, nome: response.nome })
      );
      localStorage.setItem("cliniq_token", response.token);
      navigate("/exames");
    } catch (error) {
      return;
    }
  }

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <label>
        Email
        <input name="email" type="email" required placeholder="voce@cliniq.com" />
      </label>
      <label>
        Senha
        <input name="senha" type="password" required placeholder="sua senha" />
      </label>
      <div className="form-actions">
        <Button variant="primary" type="submit" disabled={status === "loading"}>
          Entrar
        </Button>
        <Link className="btn ghost" to="/cadastro">
          Criar conta
        </Link>
      </div>
      <div className={`status ${status === "error" ? "error" : ""} ${status === "success" ? "ok" : ""}`}>
        {message}
      </div>
    </form>
  );
}
