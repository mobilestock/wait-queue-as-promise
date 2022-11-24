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

export default function esperaFila(
  processo: () => Promise<RespostaFila>
): Promise<RespostaSucesso> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      let requisicao = processo();
      requisicao.then((respostaFila) => {
        if ("OK" === respostaFila.situacao || 'ER' === respostaFila.situacao) {
          resolve(respostaFila);
          clearInterval(interval);
        }
      });
      requisicao.catch(err => {
        reject(err)
        clearInterval(interval)
      })
    }, 500);
  });
}

export { RespostaFila, RespostaSucesso };
