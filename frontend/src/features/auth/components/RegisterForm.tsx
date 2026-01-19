import React from "react";
import { Button } from "../../../shared/components/Button";
import { useRegister } from "../hooks/useRegister";

export function RegisterForm() {
  const { status, message, submit } = useRegister();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const ok = await submit({
      nome: String(formData.get("nome") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      senha: String(formData.get("senha") || ""),
      idade: String(formData.get("idade") || ""),
      sexo: String(formData.get("sexo") || ""),
      tipoSanguineo: String(formData.get("tipoSanguineo") || ""),
      tipoUsuario: String(formData.get("tipoUsuario") || ""),
      alergias: String(formData.get("alergias") || "")
    });
    if (ok) {
      form.reset();
    }
  }

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nome
          <input name="nome" type="text" required placeholder="Nome completo" />
        </label>
        <label>
          Email
          <input name="email" type="email" required placeholder="voce@cliniq.com" />
        </label>
        <label>
          Senha
          <input name="senha" type="password" required placeholder="Crie uma senha" />
        </label>
        <label>
          Idade
          <input name="idade" type="number" min="0" placeholder="Idade" />
        </label>
        <label>
          Sexo
          <select name="sexo" defaultValue="">
            <option value="" disabled>
              Selecione
            </option>
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
            <option value="Outro">Outro</option>
            <option value="Prefiro nao informar">Prefiro nao informar</option>
          </select>
        </label>
        <label>
          Tipo sanguineo
          <select name="tipoSanguineo" defaultValue="">
            <option value="" disabled>
              Selecione
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </label>
        <label>
          Tipo de usuario
          <select name="tipoUsuario" defaultValue="" required>
            <option value="" disabled>
              Selecione
            </option>
            <option value="Paciente">Paciente</option>
            <option value="Medico">Medico</option>
            <option value="Laboratorio">Laboratorio</option>
          </select>
        </label>
      </div>
      <label>
        Alergias
        <input name="alergias" type="text" placeholder="Opcional" />
      </label>
      <Button variant="primary" type="submit" disabled={status === "loading"}>
        Cadastrar
      </Button>
      <div className={`status ${status === "error" ? "error" : ""} ${status === "success" ? "ok" : ""}`}>
        {message}
      </div>
    </form>
  );
}
