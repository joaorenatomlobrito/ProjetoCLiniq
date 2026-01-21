import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../shared/components/Button";
import { ExamForm } from "../components/ExamForm";
import { ExamList } from "../components/ExamList";
import { ExamSummary } from "../components/ExamSummary";
import { useExams } from "../hooks/useExams";
import { getUserById, UserProfile } from "../../users/services/userService";

export function ExamsPage() {
  const { status, message, exames, resumo, carregar, criar } = useExams();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    "SANGUE" | "URINA" | "IMAGEM" | null
  >(null);
  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const [perfilStatus, setPerfilStatus] = useState<"idle" | "loading" | "error">("idle");
  const [perfilErro, setPerfilErro] = useState("");
  const usuario = useMemo(() => {
    try {
      const raw = localStorage.getItem("cliniq_usuario");
      return raw ? (JSON.parse(raw) as { idUsuario: number; nome: string }) : null;
    } catch (error) {
      return null;
    }
  }, []);
  const token = useMemo(() => localStorage.getItem("cliniq_token"), []);
  const ultimoExame = exames.length > 0 ? exames[0] : null;
  const examesFiltrados = categoriaSelecionada
    ? exames.filter(
        (exame) => (exame.categoria || "").toUpperCase() === categoriaSelecionada
      )
    : exames;
  const resumoSeguro = resumo ?? { sangue: 0, urina: 0, imagem: 0 };

  useEffect(() => {
    if (usuario?.idUsuario && token) {
      carregar(usuario.idUsuario);
    }
  }, [carregar, usuario, token]);

  async function carregarPerfil() {
    if (!usuario?.idUsuario || !token) {
      return;
    }
    setPerfilStatus("loading");
    setPerfilErro("");
    try {
      const data = await getUserById(usuario.idUsuario);
      setPerfil(data);
      setPerfilStatus("idle");
    } catch (error) {
      const message =
        typeof (error as { message?: string }).message === "string"
          ? (error as { message: string }).message
          : "Nao foi possivel carregar o perfil.";
      setPerfilErro(message);
      setPerfilStatus("error");
    }
  }

  function handlePerfilClick() {
    const next = !mostrarPerfil;
    setMostrarPerfil(next);
    if (next && !perfil && perfilStatus !== "loading") {
      void carregarPerfil();
    }
  }

  function formatarData(data: string | null | undefined) {
    if (!data) {
      return "--";
    }
    const parsed = new Date(data);
    if (Number.isNaN(parsed.getTime())) {
      return data;
    }
    return parsed.toLocaleDateString("pt-BR");
  }

  function handleSelecionarCategoria(categoria: "SANGUE" | "URINA" | "IMAGEM") {
    setCategoriaSelecionada((prev) => (prev === categoria ? null : categoria));
  }

  return (
    <div className="page">
      <section className="exams">
        <header className="exams__header">
          <div>
            <h2>Meus Exames</h2>
            <p>Gerenciando {exames.length} exame(s)</p>
          </div>
          <div className="exams__actions">
            <button className="user-pill user-pill--interactive" type="button" onClick={handlePerfilClick}>
              <span>Usuario</span>
              <strong>{usuario?.nome || "Nao identificado"}</strong>
            </button>
            <Button variant="primary" type="button" onClick={() => setMostrarForm((prev) => !prev)}>
              + Novo Exame
            </Button>
          </div>
        </header>
        {(!usuario?.idUsuario || !token) && (
          <div className="status error">Faca login novamente para carregar seus exames.</div>
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
        {mostrarPerfil && (
          <section className="profile-card">
            <header className="profile-card__header">
              <div>
                <span className="profile-card__eyebrow">Perfil</span>
                <h3>{perfil?.nome || usuario?.nome || "Usuario"}</h3>
                <p className="profile-card__subtitle">{perfil?.email || "Email nao informado"}</p>
              </div>
              <button className="profile-card__close" type="button" onClick={handlePerfilClick}>
                Fechar
              </button>
            </header>
            {perfilStatus === "loading" && <p className="status">Carregando perfil...</p>}
            {perfilStatus === "error" && <p className="status error">{perfilErro}</p>}
            {perfilStatus !== "loading" && (
              <>
                <div className="profile-card__stats">
                  <div>
                    <span>Idade</span>
                    <strong>{perfil?.idade ?? "--"}</strong>
                  </div>
                  <div>
                    <span>Exames feitos</span>
                    <strong>{exames.length}</strong>
                  </div>
                  <div>
                    <span>Ultimo exame</span>
                    <strong>{ultimoExame ? formatarData(ultimoExame.dataExame) : "--"}</strong>
                  </div>
                </div>
                <div className="profile-card__activity">
                  <h4>O que foi feito no site</h4>
                  {exames.length === 0 ? (
                    <p>Nenhum exame cadastrado ainda.</p>
                  ) : (
                    <ul>
                      <li>
                        Ultimo exame: {ultimoExame?.titulo || "Sem titulo"} em{" "}
                        {formatarData(ultimoExame?.dataExame)}
                      </li>
                      <li>
                        Exames por categoria: {resumoSeguro.sangue} sangue, {resumoSeguro.urina} urina,{" "}
                        {resumoSeguro.imagem} imagem.
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}
          </section>
        )}
        <ExamSummary
          resumo={resumo}
          items={exames}
          selectedCategory={categoriaSelecionada}
          onSelect={handleSelecionarCategoria}
        />
        {message && <div className="status error">{message}</div>}
        <ExamList items={examesFiltrados} />
      </section>
    </div>
  );
}
