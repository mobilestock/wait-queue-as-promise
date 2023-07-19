module.exports = {
    esperaFila: function (url) {
        return new Promise((resolve, reject) => {
            var requisicaoPendente = false
            const interval = setInterval(() => {
                if (requisicaoPendente === true) {
                    return;
                }
                let requisicao = fetch(url)
                requisicaoPendente = true
                requisicao.then(async resposta => {
                    if (200 === resposta.status) {
                        resolve(await resposta.json())
                        clearInterval(interval)
                    } else if ([422, 500].includes(resposta.status)) {
                        reject(await resposta.json())
                        clearInterval(interval)
                    }
                })
                requisicao.catch(err => {
                    reject(err)
                    clearInterval(interval)
                })
                requisicao.finally(() => (requisicaoPendente = false))
            }, 3500)
        })
    }
}