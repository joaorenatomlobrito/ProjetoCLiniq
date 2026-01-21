import React, { useRef, useState } from "react";
import { Button } from "../../../shared/components/Button";

type ExamFormProps = {
  onSubmit: (payload: {
    titulo: string;
    categoria: string;
    tipoExame: string;
    dataExame: string;
    clinica: string;
    medico: string;
    observacoes: string;
    status: string;
    anexoArquivo?: File | null;
  }) => void;
  disabled?: boolean;
};

export function ExamForm({ onSubmit, disabled }: ExamFormProps) {
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
  const [erroArquivo, setErroArquivo] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const maxBytes = 10 * 1024 * 1024;

  function formatBytes(bytes: number) {
    if (!bytes) return "0 KB";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(2)} MB`;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (erroArquivo) {
      return;
    }
    const form = event.currentTarget;
    const formData = new FormData(form);
    const arquivo = formData.get("anexoArquivo") as File;
    const arquivoValido = arquivo && arquivo.size > 0 ? arquivo : null;
    onSubmit({
      titulo: String(formData.get("titulo") || "").trim(),
      categoria: String(formData.get("categoria") || ""),
      tipoExame: String(formData.get("tipoExame") || "").trim(),
      dataExame: String(formData.get("dataExame") || ""),
      clinica: String(formData.get("clinica") || "").trim(),
      medico: String(formData.get("medico") || "").trim(),
      observacoes: String(formData.get("observacoes") || "").trim(),
      status: String(formData.get("status") || ""),
      anexoArquivo: arquivoValido
    });
    form.reset();
    setArquivoSelecionado(null);
    setErroArquivo("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <form className="exam-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Titulo
          <input name="titulo" type="text" required placeholder="Funcao Renal" />
        </label>
        <label>
          Categoria
          <select name="categoria" defaultValue="" required>
            <option value="" disabled>
              Selecione
            </option>
            <option value="SANGUE">Sangue</option>
            <option value="URINA">Urina</option>
            <option value="IMAGEM">Imagem</option>
          </select>
        </label>
        <label>
          Tipo de exame
          <input name="tipoExame" type="text" placeholder="Hemograma" />
        </label>
        <label>
          Data do exame
          <input name="dataExame" type="date" required />
        </label>
        <label>
          Clinica
          <input name="clinica" type="text" placeholder="Clinica X" />
        </label>
        <label>
          Medico
          <input name="medico" type="text" placeholder="Dra. Yasmin" />
        </label>
        <label>
          Status
          <select name="status" defaultValue="Completo">
            <option value="Completo">Completo</option>
            <option value="Pendente">Pendente</option>
          </select>
        </label>
      </div>
      <label>
        Observacoes
        <textarea name="observacoes" rows={3} placeholder="Observacoes adicionais" />
      </label>
      <div className="exam-attachments">
        <h4>Digitalizacao do Exame</h4>
        <span className="exam-attachments__label">Anexar Arquivo(s)</span>
        <label className="dropzone">
          <input
            ref={fileInputRef}
            name="anexoArquivo"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.tiff"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] || null;
              if (file && file.size > maxBytes) {
                setArquivoSelecionado(null);
                setErroArquivo("Arquivo maior que 10MB. Selecione outro arquivo.");
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                return;
              }
              setErroArquivo("");
              setArquivoSelecionado(file);
            }}
          />
          <span>Clique para selecionar ou arraste arquivos aqui</span>
          <small>Formatos: PDF, JPG, PNG, TIFF (max. 10MB por arquivo)</small>
        </label>
        {arquivoSelecionado && (
          <div className="file-preview">
            <div className="file-preview__info">
              <span className="file-preview__name">{arquivoSelecionado.name}</span>
              <span className="file-preview__size">{formatBytes(arquivoSelecionado.size)}</span>
            </div>
            <button
              type="button"
              className="file-preview__remove"
              onClick={() => {
                setArquivoSelecionado(null);
                setErroArquivo("");
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              x
            </button>
          </div>
        )}
        {erroArquivo && <div className="file-error">{erroArquivo}</div>}
      </div>
      <Button variant="primary" type="submit" disabled={disabled}>
        Salvar exame
      </Button>
    </form>
  );
}
