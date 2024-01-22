const initialState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
const clearState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15];


const imagePaths = [
    'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg',
    'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg',
    'image9.jpg', 'image10.jpg', 'image11.jpg', 'image12.jpg',
    'image13.jpg', 'image14.jpg', 'image15.jpg', 'image16.jpg'
];

const shuffleArray = (array) => {
    let solvable = false;

    do {
        for (let i = array.length - 2; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        solvable = isSolvable(array);
    } while (!solvable);
};

const isSolvable = (state) => {
    let inversions = 0;
    for (let i = 0; i < state.length - 1; i++) {
        for (let j = i + 1; j < state.length; j++) {
            if (state[i] > state[j] && state[i] !== 0 && state[j] !== 0) {
                inversions++;
            }
        }
    }
    // If the grid width is odd, the number of inversions should be even
    if (inversions % 2 === 0) {
        return true;
    }
    // If the grid width is even, the sum of the inversion count and the row number of the blank should be even
    const emptyIndex = state.indexOf(0);
    const emptyRow = Math.floor(emptyIndex / 4);
    const gridWidth = Math.sqrt(state.length);
    const sum = inversions + emptyRow + 1;
    return sum % 2 === 0 && gridWidth % 2 === 1;
};

const isSolved = (state) => state.every((value, index) => value === index + 1);

const renderPuzzle = (state) => {
    const puzzleElement = document.getElementById('puzzle');
    puzzleElement.innerHTML = '';

    state.forEach((number, index) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');

        if (number !== 0) {
            const img = document.createElement('img');
            img.src = `../static/image_num/${imagePaths[number - 1]}`;
            tile.appendChild(img);
            tile.addEventListener('click', () => moveTile(index));
        }
        puzzleElement.appendChild(tile);
    });
};

const moveTile = (index) => {
    const emptyIndex = currentState.indexOf(0);

    if (isMoveValid(index, emptyIndex)) {
        [currentState[index], currentState[emptyIndex]] = [currentState[emptyIndex], currentState[index]];
        renderPuzzle(currentState);
        console.log(currentState);

        if (currentState == clearState) {
            console.log("Congratulations! Puzzle solved.");
        }

        let count_i = 0;

        for (let i = 0; i < currentState.length; i++) {
            if (currentState[i] == initialState[i]) {
                count_i++;
            }
        }

        console.log(count_i);
        if (count_i == 16) {

            timerstopetask();
            displayCompletionMessage("clear");
        }

    }

};

timerstopetask = () => {

    clearInterval(timer);
}

const displayCompletionMessage = (state) => {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = 'white';
    modal.style.padding = '20px';
    modal.style.border = '2px solid black';
    modal.style.zIndex = '1000';



    console.log(state);

    const message = document.createElement('p');
    if (state == "clear") {
        message.textContent = 'パズル完成';
    } else if (state == "pause") {
        message.textContent = '一時停止';
    }
    message.style.color = 'green';
    message.style.fontSize = '20px';
    message.style.marginBottom = '10px';

    const timeDisplay = document.createElement('p');
    timeDisplay.textContent = 'Time: ' + formatTime(seconds);
    timeDisplay.style.fontSize = '16px';
    timeDisplay.style.marginBottom = '10px';

    const restartButton = document.createElement('button');
    restartButton.textContent = 'リスタート';
    restartButton.style.padding = '5px';
    restartButton.addEventListener('click', () => {
        document.body.removeChild(modal);
        restartGame();
        timerDisplay = document.getElementById('timerArea');
        timerDisplay.textContent = formatTime(seconds);
    });

    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;'; // HTMLエンティティで「×」を表現
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        restartTimer();
        document.body.removeChild(modal);
    });

    // ホバー時のスタイルを追加
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.border = '1px solid #555';
        //closeButton.style.bordersoli = '30px';
        closeButton.style.padding = '2px';
        closeButton.style.color = 'red';
    });

    // ホバーが外れた時のスタイルを追加
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.border = 'black';
        closeButton.style.padding = '0';
        closeButton.style.color = '#333';
    });

    modal.appendChild(closeButton);

    const homeButton = document.createElement('button');
    homeButton.textContent = 'アップロード画面に戻る';
    homeButton.style.padding = '5px';
    homeButton.addEventListener('click', () => {
        // ホームへのリダイレクト処理

        window.location.href = 'home.html';
    });

    modal.appendChild(message);
    modal.appendChild(timeDisplay);
    modal.appendChild(restartButton);
    modal.appendChild(homeButton);
    modal.appendChild(closeButton);

    document.body.appendChild(modal);
};

const restartGame = () => {
    // パズルの初期化など、ゲームをリスタートするための処理を追加
    currentState.length = 0;
    currentState.push(...initialState);
    console.log(currentState);

    do {
        shuffleArray(currentState);
    } while (!isSolvable(currentState));
    renderPuzzle(currentState);
    startTimer();

};

const isMoveValid = (index, emptyIndex) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    return (
        (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
};

function pauseTimer() {
    // タイマーを一時停止する処理を追加
    // 例えば、stopTimer() 関数を呼び出すなど
    stopTimer();

    timerstopetask();
    displayCompletionMessage("pause");
}

const currentState = [...initialState];

do {
    shuffleArray(currentState);
} while (!isSolvable(currentState));

renderPuzzle(currentState);


console.log("This puzzle is guaranteed to be solvable!");

document.addEventListener('DOMContentLoaded', function () {
    const pauseButton = document.getElementById('pauseButton');
    pauseButton.addEventListener('click', pauseTimer);
});
