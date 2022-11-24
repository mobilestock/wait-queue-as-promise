module.exports = {
    esperaFila: function (processo) {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                let requisicao = processo()
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
            }, 500)
        })
    }
}