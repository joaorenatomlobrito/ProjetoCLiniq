import React from "react";
import { ExameItem } from "../services/examService";

type ExamListProps = {
  items: ExameItem[];
};

export function ExamList({ items }: ExamListProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <section className="exam-list empty">
        <p>Nenhum exame cadastrado.</p>
      </section>
    );
  }

  return (
    <section className="exam-list">
      {items.map((item) => (
        <article key={item.idExame} className="exam-item">
          <div>
            <span className="exam-item__category">{item.categoria}</span>
            <h4>{item.titulo}</h4>
            <p className="exam-item__meta">
              {item.dataExame} · Clinica: {item.clinica || "Nao informado"} · Medico:{" "}
              {item.medico || "Nao informado"}
            </p>
          </div>
          <div className="exam-item__side">
            <span className={`pill pill--status ${item.status?.toLowerCase() || ""}`}>
              {item.status || "Pendente"}
            </span>
            <span className="exam-item__attachments">{item.anexos} anexo(s)</span>
          </div>
        </article>
      ))}
    </section>
  );
}
