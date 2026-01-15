import React from "react";
import { Link } from "react-router-dom";

export function CallToAction() {
  return (
    <section className="panel">
      <div>
        <h3>Proximos passos</h3>
        <p>
          Integre exames, valide laudos e mantenha todo o historico clinico em
          um unico lugar.
        </p>
      </div>
      <Link className="btn primary" to="/login">
        Ir para login
      </Link>
    </section>
  );
}
