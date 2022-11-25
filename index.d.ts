type RespostaSucesso = {
    situacao: "OK"
    resposta: {
        token_cartao?: string,
        qrcode_text_pix?: string,
        qrcode_pix?: string
    };
} | {
    situacao: "ER",
    resposta: {
        message: string
    }
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