function calcularInss(salarioBruto){
    let inss = 0;
    let inssTeto = 908.85;

    if (salarioBruto <= 1412){
        inss = salarioBruto * 0.075;
    } else if (salarioBruto >= 1412.01 && salarioBruto <= 2666.68){
        inss = salarioBruto * 0.09;
    } else if (salarioBruto >= 2666.69 && salarioBruto <= 4000.03){
        inss = salarioBruto * 0.12;
    } else if (salarioBruto >= 4000.04){
        if (salarioBruto * 0.14 < inssTeto){
            inss = salarioBruto * 0.14;
        }else {
            inss = 908.85;
        }
    }

    return inss.toFixed(2);
}

module.exports = calcularInss;