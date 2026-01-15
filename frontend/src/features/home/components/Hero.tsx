import React from "react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <header className="hero">
      <div className="hero__brand">
        <span className="hero__badge">CQ</span>
        <span>CliniQ</span>
      </div>
      <h1>Seu prontuario digital com ritmo humano.</h1>
      <p>
        Centralize exames, organize historicos e compartilhe informacoes com
        profissionais de saude com controle total.
      </p>
      <div className="hero__actions">
        <Link className="btn primary" to="/login">
          Entrar
        </Link>
        <a className="btn ghost" href="/#recursos">
          Explorar
        </a>
      </div>
    </header>
  );
}
