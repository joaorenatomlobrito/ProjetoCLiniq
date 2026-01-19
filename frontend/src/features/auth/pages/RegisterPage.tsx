import React from "react";
import { Link } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  return (
    <div className="page">
      <section className="login">
        <div className="login__intro">
          <h2>Cadastro</h2>
          <p>Crie sua conta para organizar seus documentos medicos.</p>
          <Link className="link" to="/login">
            Ja tenho conta
          </Link>
        </div>
        <RegisterForm />
      </section>
    </div>
  );
}
