const calcularInss = require('./calculo_inss')
const calculoImpostoRenda = require('./calculo_imposto_renda')

function calculoSalarioLiquido(salarioBruto){
    return (salarioBruto - calcularInss(salarioBruto) - calculoImpostoRenda(salarioBruto)).toFixed(2)
}

module.exports = calculoSalarioLiquido;