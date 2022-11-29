import {esperaFila, RespostaFila} from '../index'

let timeout = 500000;
it("deve tentar duas vezes e na terceira resolver com sucesso.", async () => {
  let contagemTentativas = 1;
  const respostaFila = await esperaFila(
    () => new Promise<RespostaFila<{message: string}>>((resolve) => {
      if (contagemTentativas === 3) {
        return resolve({
          situacao: "OK",
          resposta: {
            message: "Deu tudo certo."
          },
        });
      }

      resolve({
        situacao: 'PE'
      });

      contagemTentativas++;
    })
  );

  expect(respostaFila.resposta).toStrictEqual({
    message: "Deu tudo certo."
  })
  expect(respostaFila.situacao).toBe('OK')
}, timeout);

it("deve tentar duas vezes e na terceira resolver com erro.", async () => {
  let contagemTentativas = 1;
  let respostaFila = await esperaFila(
    () => new Promise<RespostaFila<{ message: string }>>((resolve) => {
      if (contagemTentativas === 3) {
        return resolve({
          situacao: 'ER',
          resposta: {
            message: 'Os dados enviados estão inválidos.'
          }
        })
      }

      resolve({
        situacao: 'PE'
      })
      contagemTentativas++
    })
  );

  expect(respostaFila.resposta).toStrictEqual({
    message: 'Os dados enviados estão inválidos.'
  })
  expect(respostaFila.situacao).toBe('ER')
}, timeout)

it('deve tentar uma vez e dar erro.', async () => {
  try {
    await esperaFila(() => new Promise((_, reject) => {
      reject({
        message: "Erro ao buscar o item da fila."
      })
    }));
  } catch (err) {
    expect(err).toStrictEqual({
      message: "Erro ao buscar o item da fila."
    })
  }
}, timeout);
