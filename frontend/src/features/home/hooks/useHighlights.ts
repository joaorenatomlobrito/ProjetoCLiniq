export type Highlight = {
  title: string;
  description: string;
};

export function useHighlights(): Highlight[] {
  return [
    {
      title: "Linha do tempo clinica",
      description:
        "Visualize uploads, validacoes e compartilhamentos em um fluxo cronologico simples de acompanhar."
    },
    {
      title: "Arquivos sempre acessiveis",
      description:
        "PDFs, imagens e laudos ficam seguros e disponiveis para download a qualquer momento."
    },
    {
      title: "Compartilhamento inteligente",
      description:
        "Libere acesso apenas para quem precisa, com rastreabilidade e respeito a privacidade."
    }
  ];
}
