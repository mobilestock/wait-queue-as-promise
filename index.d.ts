type RespostaSucesso<T = {}> = {
    situacao: "OK"
    resposta: T;
} | {
    situacao: "ER",
    resposta: {
        message: string
    }
};
type RespostaPendente = {
    situacao: "PE";
};
type RespostaFila<T = {}> =
  | RespostaSucesso<T>
  | RespostaPendente;

declare function esperaFila(processo: () => Promise<RespostaFila>): Promise<RespostaSucesso>;

export {
  esperaFila,
  RespostaFila,
  RespostaPendente
}