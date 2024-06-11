function calculoImpostoRenda(salarioBruto){
    let impostoRenda = 0;

    if(salarioBruto >= 2112.01 && salarioBruto <= 2826.65){
        impostoRenda = salarioBruto*0.075;
    } else if( salarioBruto >= 2826.66 && salarioBruto <= 3751.05 ){
        impostoRenda = salarioBruto*0.15;
    } else if( salarioBruto >= 3751.06 && salarioBruto <= 4664.68 ){
        impostoRenda = salarioBruto*0.225;
    } else if( salarioBruto > 4664.68 ){
        impostoRenda = salarioBruto*0.275;
    }

    return impostoRenda.toFixed(2)
}

module.exports = calculoImpostoRenda;