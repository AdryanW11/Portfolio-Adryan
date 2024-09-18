let dataPoints = [];
let hoveredBar = null; // Variável para armazenar a barra sobre a qual o mouse está passando

// Função para adicionar dados
function addData() {
    const date = document.getElementById('date').value;
    const value = document.getElementById('value').value;

    if (date && value) {
        dataPoints.push({ date: date, value: parseFloat(value) });
        renderData();
    }
}

// Função para renderizar as barras no gráfico
function renderData() {
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    const chart = document.getElementById('chart');
    const ctx = chart.getContext('2d');
    ctx.clearRect(0, 0, chart.width, chart.height);

    const baseLine = chart.height / 2; // Linha central do gráfico

    // Desenha a linha de base no meio
    ctx.beginPath();
    ctx.moveTo(0, baseLine);
    ctx.lineTo(chart.width, baseLine);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Loop pelos pontos de dados e desenha as barras
    dataPoints.forEach((point, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Data: ${point.date} - Valor: ${point.value}`;
        dataList.appendChild(listItem);

        const barHeight = (Math.abs(point.value) / 100) * (chart.height / 2);
        const barX = index * 50 + 10;
        const barWidth = 40;
        let barY;

        // Se o valor for positivo, desenha a barra acima da linha de base
        if (point.value >= 0) {
            barY = baseLine - barHeight;
            ctx.fillStyle = 'green';
            ctx.fillRect(barX, barY, barWidth, barHeight);
        } else {
            // Se for negativo, desenha a barra abaixo da linha de base
            barY = baseLine;
            ctx.fillStyle = 'red';
            ctx.fillRect(barX, barY, barWidth, barHeight);
        }

        // Armazena a posição e tamanho da barra para detecção de mouseover
        dataPoints[index].barPosition = { x: barX, y: barY, width: barWidth, height: barHeight, value: point.value, date: point.date };
    });
}

// Função para detectar se o mouse está sobre uma barra
function handleMouseMove(event) {
    const chart = document.getElementById('chart');
    const ctx = chart.getContext('2d');
    const rect = chart.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let foundBar = null;

    // Verifica se o mouse está sobre alguma barra
    dataPoints.forEach((point, index) => {
        const bar = point.barPosition;
        if (
            mouseX >= bar.x &&
            mouseX <= bar.x + bar.width &&
            mouseY >= bar.y &&
            mouseY <= bar.y + bar.height
        ) {
            foundBar = point;
        }
    });

    if (foundBar) {
        hoveredBar = foundBar;
        renderData(); // Redesenha as barras para atualizar o tooltip
        showTooltip(mouseX, mouseY, hoveredBar.value, hoveredBar.date);
    } else {
        hoveredBar = null;
        renderData(); // Redesenha as barras sem tooltip
        hideTooltip();
    }
}

// Função para mostrar o tooltip com o valor e a data
function showTooltip(x, y, value, date) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'block';
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y + 10}px`;
    tooltip.textContent = `Data: ${date} | Valor: ${value}`;
}

// Função para esconder o tooltip
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}

// Função para apagar todos os dados
function clearAllData() {
    dataPoints = [];
    renderData();
}

// Função para apagar o último dado adicionado
function clearLastData() {
    dataPoints.pop();
    renderData();
}

// Adiciona o evento de movimento do mouse no canvas
document.getElementById('chart').addEventListener('mousemove', handleMouseMove);
