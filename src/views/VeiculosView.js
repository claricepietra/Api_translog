class VeiculoView {
    static sucesso (mensagem, dados, statusHttp = 200){
        return{status: "sucesso", codigoHttp: statusHttp, mensagem: mensagem, dados: dados};
    }
    static erro(mensagem, dados, statusHttp = 400){
        return{status: statusHttp >= 500 ?  "Erro Critico do servidor (5xx0)" : "Erro do cliente (4xx)", codigoHttp: statusHttp, mensagem: mensagem};
    }
  
    }
    module.exports =  VeiculoView
