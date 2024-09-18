let timerInterval;
let stopwatchInterval;
let isTimerRunning = false;
let isStopwatchRunning = false;
let themeIndex = 0;

const themes = ['light-theme', 'dark-theme', 'alternate-theme'];

document.getElementById('startStop').addEventListener('click', function() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        this.textContent = 'Iniciar';
    } else {
        startTimer();
        isTimerRunning = true;
        this.textContent = 'Parar';
    }
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStop').textContent = 'Iniciar';
});

document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.className = themes[themeIndex];
    themeIndex = (themeIndex + 1) % themes.length;
});

function startTimer() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    timerInterval = setInterval(function() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }

        document.getElementById('display').textContent =
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds;
    }, 1000);
}

// Add similar functionality for the stopwatch if needed
