const botaoCalcular = document.querySelector('#botaoCalcular');
const erroMensagem = document.querySelector('#erroMensagem'); // Adiciona um espaço para a mensagem de erro

botaoCalcular.addEventListener('click', function() {
    erroMensagem.textContent = ''; // Limpa qualquer mensagem de erro anterior
    
    const valor = parseFloat(textoValor.value);
    const entrada = parseFloat(textoEntrada.value);
    const taxaJuros = parseFloat(textoTaxaJuros.value);
    const prazo = parseFloat(textoPrazo.value);

    if (isNaN(valor) || isNaN(entrada) || isNaN(taxaJuros) || isNaN(prazo)) {
        erroMensagem.textContent = 'Insira apenas números válidos.';
    } else {
        // Continue com o cálculo
    }
});
