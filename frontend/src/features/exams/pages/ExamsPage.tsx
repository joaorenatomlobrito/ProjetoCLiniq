import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../shared/components/Button";
import { ExamForm } from "../components/ExamForm";
import { ExamList } from "../components/ExamList";
import { ExamSummary } from "../components/ExamSummary";
import { useExams } from "../hooks/useExams";

export function ExamsPage() {
  const { status, message, exames, resumo, carregar, criar } = useExams();
  const [mostrarForm, setMostrarForm] = useState(false);
  const usuario = useMemo(() => {
    try {
      const raw = localStorage.getItem("cliniq_usuario");
      return raw ? (JSON.parse(raw) as { idUsuario: number; nome: string }) : null;
    } catch (error) {
      return null;
    }
  }, []);
  const token = useMemo(() => localStorage.getItem("cliniq_token"), []);

  useEffect(() => {
    if (usuario?.idUsuario && token) {
      carregar(usuario.idUsuario);
    }
  }, [carregar, usuario, token]);

  return (
    <div className="page">
      <section className="exams">
        <header className="exams__header">
          <div>
            <h2>Meus Exames</h2>
            <p>Gerenciando {exames.length} exame(s)</p>
          </div>
          <div className="exams__actions">
            <div className="user-pill">
              <span>Usuario</span>
              <strong>{usuario?.nome || "Nao identificado"}</strong>
            </div>
            <Button variant="primary" type="button" onClick={() => setMostrarForm((prev) => !prev)}>
              + Novo Exame
            </Button>
          </div>
        </header>
        {(!usuario?.idUsuario || !token) && (
          <div className="status error">Faça login novamente para carregar seus exames.</div>
        )}
        {mostrarForm && (
          <div className="card">
            <ExamForm
              disabled={status === "loading" || !token}
              onSubmit={(payload) =>
                criar({
                  usuarioId: usuario?.idUsuario || 0,
                  ...payload
                })
              }
            />
          </div>
        )}
        <ExamSummary resumo={resumo} items={exames} />
        {message && <div className="status error">{message}</div>}
        <ExamList items={exames} />
      </section>
    </div>
  );
}
