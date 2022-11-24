import { clearInterval } from "timers";

type SucessfulResponse = {
    situacao: "OK" | "ER"
    resposta: unknown;
};
type PendingResponse = {
    situacao: "PE";
};
type QueueResponse =
  | SucessfulResponse
  | PendingResponse;

export default function waitQueue(
  fetcher: () => Promise<QueueResponse>
): Promise<SucessfulResponse> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      let request = fetcher();
      request.then((res) => {
        if ("OK" === res.situacao || 'ER' === res.situacao) {
          resolve(res);
          clearInterval(interval);
        }
      });
      request.catch(res => {
        reject(res)
        clearInterval(interval)
      })
    }, 500);
  });
}

export { QueueResponse, SucessfulResponse };
