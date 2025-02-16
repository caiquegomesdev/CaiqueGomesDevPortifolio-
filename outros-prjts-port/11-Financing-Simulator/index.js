import { Financiamento } from "./financiamento.js";
import { FinanciamentoCarencia } from "./financiamentocarencia.js";

const comCarencia = document.querySelector('#comCarencia');
const listaSuspensa = document.querySelector('#listaSuspensa');
const corpoTabela = document.querySelector('#corpoTabela');
const botaoCalcular = document.querySelector('#botaoCalcular')
const textoValor = document.querySelector('#textoValor');
const textoEntrada = document.querySelector('#textoEntrada');
const textoTaxaJuros = document.querySelector('#textoTaxaJuros');
const textoPrazo = document.querySelector('#textoPrazo');
const erroMensagem = document.querySelector('#erroMensagem'); // Mensagem de erro
const valorTotalDiv = document.querySelector('#valorTotal'); // Elemento para exibir o valor total

//FUNÇÃO LIMPAR TABELA
function limpaCorpoDaTabela() {
    while(corpoTabela.firstChild) {
        corpoTabela.removeChild(corpoTabela.firstChild);
    }
}

//APRESENTA OPÇÕES SE CLICADO COM CARÊNCIA
comCarencia.addEventListener('change', function() {
    if(this.checked) {
        listaSuspensa.removeAttribute('hidden');
    } else {
        listaSuspensa.setAttribute('hidden', 'hidden')
    }
});

//CRIAÇÃO DO BOTÃO PARA CALCULAR
botaoCalcular.addEventListener('click', function() {
    limpaCorpoDaTabela();
    const valor = parseFloat(textoValor.value);
    const entrada = parseFloat(textoEntrada.value);
    const taxaJuros = parseFloat(textoTaxaJuros.value);
    const prazo = parseFloat(textoPrazo.value);
    let simulacao;
    if(comCarencia.checked) {
        const carencia = parseInt(listaSuspensa.value);
        simulacao = new FinanciamentoCarencia(valor, entrada, taxaJuros, prazo, carencia);
    } else {
        simulacao = new Financiamento(valor, entrada, taxaJuros, prazo);
    }
    simulacao.calcParcelasMensais();
    simulacao.exibeParcelas();
});

// Função para calcular o valor total a ser pago
function calcularValorTotal(valor, entrada, taxaJuros, prazo) {
    const valorFinanciado = valor - entrada; // Valor a ser financiado
    const taxaMensal = taxaJuros / 12 / 100; // Convertendo a taxa anual para mensal
    const numeroParcelas = prazo; // Número de parcelas (prazo em meses)
    
    // Calculando o valor da parcela (PMT) usando fórmula de juros compostos
    const parcelaMensal = (valorFinanciado * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -numeroParcelas));
    
    // Calculando o valor total a ser pago
    const valorTotal = (parcelaMensal * numeroParcelas) + entrada;
    
    return valorTotal;
}

botaoCalcular.addEventListener('click', function () {
    erroMensagem.textContent = ''; // Limpar qualquer mensagem de erro anterior
    valorTotalDiv.textContent = ''; // Limpar valor total anterior
    
    const valor = parseFloat(textoValor.value);
    const entrada = parseFloat(textoEntrada.value);
    const taxaJuros = parseFloat(textoTaxaJuros.value);
    const prazo = parseFloat(textoPrazo.value);

    // Validando entradas
    if (isNaN(valor) || isNaN(entrada) || isNaN(taxaJuros) || isNaN(prazo)) {
        erroMensagem.textContent = 'Insira apenas números válidos.';
    } else {
        // Calcular valor total
        const valorTotal = calcularValorTotal(valor, entrada, taxaJuros, prazo);
        valorTotalDiv.textContent = `R$ ${valorTotal.toFixed(2)}`; // Exibe o valor total formatado
    }
});