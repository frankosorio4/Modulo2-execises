const readline = require('readline');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { format } = require('date-fns');
const calcularInss = require('./calculo_inss');
const calculoImpostoRenda = require('./calculo_imposto_renda');
const calculoSalarioLiquido = require('./calculo_salario_liquido');

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let nomeEmpregado = "";
let cpfEmpregado = "";
let salarioBruto = 0;

function obterData(questionText) {
    return new Promise((resolve) => {
        input.question(questionText, (response) => resolve(response.trim()));
    });
}

async function main() {
    while (true) {
        nomeEmpregado = await obterData("Digite o NOME do Empregado: ");
        if (nomeEmpregado != '' && nomeEmpregado.length > 3) {
            break;
        }
        console.log("NOME INVALIDO! Digite um nome valido.");
    }

    while (true) {
        cpfEmpregado = await obterData("Digite o CPF do Empregado (só números): ");
        if (!isNaN(cpfEmpregado) && Number(cpfEmpregado) > 0 && cpfEmpregado.length === 11) {
            cpfEmpregado = cpfEmpregado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            break;
        }
        console.log("CPF INVALIDO! O CPF deve ser um número de 11 dígitos maior que zero.");
    }

    while (true) {
        const salario = await obterData("Digite o SALRIO bruto do Empregado (só números): ");
        if (!isNaN(salario) && Number(salario) > 0) {
            salarioBruto = Number(salario);
            break;
        }
        console.log("SALARIO INVALIDO! Salário deve ser um número maior que zero.");
    }

    const INSS = calcularInss(salarioBruto);
    const impostoRenda = calculoImpostoRenda(salarioBruto);
    const salarioLiquido = calculoSalarioLiquido(salarioBruto);

    console.log("--- Folha de pagamento ---");
    console.log(`Nome: ${nomeEmpregado}`);
    console.log(`CPF: ${cpfEmpregado}`);
    console.log(`Salário bruto: R$ ${salarioBruto}`);
    console.log(`INSS: R$ ${INSS}`);
    console.log(`Imposto Renda: R$ ${impostoRenda}`);
    console.log(`Salário Líquido: R$ ${salarioLiquido}`);

    while (true) {
        const desition = await obterData("Deseja crear um pdf para a folha de pagamento? \nDigite \"sim\" ou \"nao\": ");
        if (desition.toLowerCase() === 'sim' || desition.toLowerCase() === 's') {
            // createPdf()
            const now = new Date;
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream('folha_pagamento.pdf'));
            doc.fontSize(14);
            doc.text("--- Folha de pagamento ---");
            doc.text(`Data de geração: ${format(now, 'dd-MM-yyyy')}`);
            doc.text(`Nome: ${nomeEmpregado}`);
            doc.text(`CPF: ${cpfEmpregado}`);
            doc.text("--- ---");
            doc.text(`Salário bruto: R$ ${salarioBruto.toFixed(2)}`);
            doc.text("--- ---");
            doc.text(`INSS: R$ ${INSS}`);
            doc.text(`Imposto Renda: R$ ${impostoRenda}`);
            doc.text(`Outros descontos: R$ 0.00`);
            doc.text("--- ---");
            doc.text(`Salário Líquido: R$ ${salarioLiquido}`);
            doc.end();
            console.log('Folha de pagamento salva em pdf');
            break;
        } else if (desition.toLowerCase() === 'nao' || desition.toLowerCase() === 'n') {
            break;
        }
    }
    input.close();
}

main();