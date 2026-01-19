import React from "react";
import { ExameResumo } from "../services/examService";

type ExamSummaryProps = {
  resumo: ExameResumo | null;
  items: { categoria: string }[];
};

export function ExamSummary({ resumo, items }: ExamSummaryProps) {
  const fallback = items.reduce(
    (acc, item) => {
      const categoria = (item.categoria || "").toUpperCase();
      if (categoria === "SANGUE") acc.sangue += 1;
      if (categoria === "URINA") acc.urina += 1;
      if (categoria === "IMAGEM") acc.imagem += 1;
      return acc;
    },
    { sangue: 0, urina: 0, imagem: 0 }
  );

  const sangue = resumo?.sangue ?? fallback.sangue;
  const urina = resumo?.urina ?? fallback.urina;
  const imagem = resumo?.imagem ?? fallback.imagem;

  return (
    <section className="exam-summary">
      <article className="exam-card exam-card--sangue">
        <div>
          <h3>Exames de Sangue</h3>
          <p>Hemograma, Glicose, Perfil Lipidico...</p>
        </div>
        <span className="pill pill--sangue">{sangue} exames</span>
      </article>
      <article className="exam-card exam-card--urina">
        <div>
          <h3>Exames de Urina</h3>
          <p>Urinalise, Teste de Proteina...</p>
        </div>
        <span className="pill pill--urina">{urina} exames</span>
      </article>
      <article className="exam-card exam-card--imagem">
        <div>
          <h3>Exames de Imagem</h3>
          <p>Ultrassom, Radiografia, Tomografia...</p>
        </div>
        <span className="pill pill--imagem">{imagem} exames</span>
      </article>
    </section>
  );
}
