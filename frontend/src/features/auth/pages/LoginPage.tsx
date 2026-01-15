import React from "react";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <div className="page">
      <section className="login">
        <div className="login__intro">
          <h2>Login</h2>
          <p>Use seu email e senha cadastrados para acessar o sistema.</p>
        </div>
        <LoginForm />
      </section>
    </div>
  );
}
