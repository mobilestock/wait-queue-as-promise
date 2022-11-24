import waitQueue, {QueueResponse, SucessfulResponse} from "../index";

let timeout = 500000;
it("should wait response retry 2 times and resolve successfully.", async () => {
  let retryCount = 1;
  const queueResponse = await waitQueue(
    () => new Promise<QueueResponse>((resolve) => {
      if (retryCount === 3) {
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

      retryCount++;
    })
  );

  expect(queueResponse.resposta).toStrictEqual({
    message: "Deu tudo certo."
  })
}, timeout);

it("should wait response retry 2 times and resolve error.", async () => {
  let retryCount = 1;
  let response = await waitQueue(
    () => new Promise<QueueResponse>((resolve) => {
      if (retryCount === 3) {
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
      retryCount++
    })
  );

  expect(response.resposta).toStrictEqual({
    message: 'Os dados enviados estão inválidos.'
  })
}, timeout)

it('should wait error response no retry.', async () => {
  try {
    await waitQueue(() => new Promise((_, reject) => {
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
