type RespostaSucesso = {
    situacao: "OK" | "ER"
    resposta: unknown;
};
type RespostaPendente = {
    situacao: "PE";
};
type RespostaFila =
  | RespostaSucesso
  | RespostaPendente;

declare function esperaFila(processo: () => Promise<RespostaFila>): Promise<RespostaSucesso>;

export {
  esperaFila,
  RespostaFila,
  RespostaPendente
}