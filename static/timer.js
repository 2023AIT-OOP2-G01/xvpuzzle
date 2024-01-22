// timer.js

let timer;
let seconds = 0;

function startTimerButtonClicked() {
    const timerArea = document.getElementById('timerArea');
    timerArea.style.display = 'block';  // タイマーエリアを表示
    startTimer();
}

function startTimer() {
    seconds = 0;
    timer = setInterval(updateTimer, 1000);
}

function restartTimer() {
    timer = setInterval(updateTimer, 1000);
}


function updateTimer() {
    seconds++;
    const timerDisplay = document.getElementById('timerArea');
    timerDisplay.textContent = formatTime(seconds);
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
}

function padNumber(number) {
    return (number < 10 ? '0' : '') + number;
}

function stopTimer() {
    clearInterval(timer);
}

startTimer();