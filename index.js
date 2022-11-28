module.exports = {
    esperaFila: function (processo) {
        return new Promise((resolve, reject) => {
            var requisicaoPendente = false
            const interval = setInterval(() => {
                if (requisicaoPendente === true) {
                    return;
                }
                let requisicao = processo()
                requisicaoPendente = true
                requisicao.then(respostaFila => {
                    if ("OK" === respostaFila.situacao || "ER" === respostaFila.situacao) {
                        resolve(respostaFila)
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