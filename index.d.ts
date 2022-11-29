type RespostaSucesso<T> = {
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
type RespostaFila<T> =
  | RespostaSucesso<T>
  | RespostaPendente;

declare function esperaFila<T = {}>(processo: () => Promise<RespostaFila<T>>): Promise<RespostaSucesso<T>>;

export {
  esperaFila,
  RespostaFila,
  RespostaPendente
}