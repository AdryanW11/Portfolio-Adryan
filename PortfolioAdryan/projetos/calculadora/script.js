let display = document.getElementById('display');

// Função para adicionar valor ao visor
function appendValue(value) {
    display.value += value;
}

// Função para limpar o visor
function clearDisplay() {
    display.value = '';
}

// Função para deletar o último caractere
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Função para calcular o resultado
function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Erro';
    }
}
