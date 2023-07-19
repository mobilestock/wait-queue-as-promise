import { esperaFila } from '../index'

let timeout = 500000;
it('deve tentar uma vez e dar erro.', async () => {
  try {
    await esperaFila('3');
  } catch (err) {
    expect(err).toStrictEqual({
      message: "Erro ao buscar o item da fila."
    })
  }
}, timeout);
