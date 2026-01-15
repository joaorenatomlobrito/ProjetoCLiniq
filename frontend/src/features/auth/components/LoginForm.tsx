import React from "react";
import { Button } from "../../../shared/components/Button";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const { status, message, submit } = useLogin();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");
    const senha = String(formData.get("senha") || "");
    submit(email.trim(), senha);
    form.reset();
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
      <Button variant="primary" type="submit" disabled={status === "loading"}>
        Entrar
      </Button>
      <div className={`status ${status === "error" ? "error" : ""} ${status === "success" ? "ok" : ""}`}>
        {message}
      </div>
    </form>
  );
}
