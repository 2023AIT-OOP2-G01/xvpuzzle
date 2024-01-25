// 初期状態とクリア状態のパズルの配列
const initialState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
const clearState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15];

let game_clear = false;

// パズルの各ピースの画像ファイルのパス
const imagePaths = [
    'segment_1.jpg', 'segment_2.jpg', 'segment_3.jpg', 'segment_4.jpg',
    'segment_5.jpg', 'segment_6.jpg', 'segment_7.jpg', 'segment_8.jpg',
    'segment_9.jpg', 'segment_10.jpg', 'segment_11.jpg', 'segment_12.jpg',
    'segment_13.jpg', 'segment_14.jpg', 'segment_15.jpg', 'segment_16.jpg'
];

// 配列をシャッフルする関数
const shuffleArray = (array) => {
    let solvable = false;

    // 配列が解ける状態になるまでシャッフルを繰り返す
    do {
        for (let i = array.length - 2; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        solvable = isSolvable(array);
    } while (!solvable);
};

// パズルが解ける状態かどうかを判定する関数
const isSolvable = (state) => {
    let inversions = 0;
    for (let i = 0; i < state.length - 1; i++) {
        for (let j = i + 1; j < state.length; j++) {
            if (state[i] > state[j] && state[i] !== 0 && state[j] !== 0) {
                inversions++;
            }
        }
    }
    // グリッドの幅が奇数の場合、転倒数は偶数である必要がある
    if (inversions % 2 === 0) {
        return true;
    }
    // グリッドの幅が偶数の場合、転倒数と空白の行番号の合計が偶数である必要がある
    const emptyIndex = state.indexOf(0);
    const emptyRow = Math.floor(emptyIndex / 4);
    const gridWidth = Math.sqrt(state.length);
    const sum = inversions + emptyRow + 1;
    return sum % 2 === 0 && gridWidth % 2 === 1;
};

// パズルが解かれた状態かどうかを判定する関数
const isSolved = (state) => state.every((value, index) => value === index + 1);

// パズルを描画する関数
const renderPuzzle = (state) => {
    const puzzleElement = document.getElementById('puzzle');
    puzzleElement.innerHTML = '';

    state.forEach((number, index) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');

        if (number !== 0) {
            const img = document.createElement('img');
            img.src = `../static/divided_images/${imagePaths[number - 1]}`;
            tile.appendChild(img);
            tile.addEventListener('click', () => moveTile(index));
        }
        puzzleElement.appendChild(tile);
    });
};

// パズルのピースを移動させる関数
const moveTile = (index) => {
    const emptyIndex = currentState.indexOf(0);

    if (isMoveValid(index, emptyIndex)) {
        [currentState[index], currentState[emptyIndex]] = [currentState[emptyIndex], currentState[index]];
        renderPuzzle(currentState);

        if (currentState == clearState) {
            console.log("Congratulations! Puzzle solved.");
        }

        let count_i = 0;

        // パズルが解かれたかどうかを確認する
        for (let i = 0; i < currentState.length; i++) {
            if (currentState[i] == initialState[i]) {
                count_i++;
            }
        }

        // パズルが解かれた場合の処理
        if (count_i == 16) {
            timerstopetask();
            game_clear = true;
            displayCompletionMessage("clear");
        }
    }
};

// タイマーを停止する関数
timerstopetask = () => {
    clearInterval(timer);
}

// ゲームクリア時のメッセージを表示する関数
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

    const message = document.createElement('p');
    if (state == "clear") {
        message.textContent = 'パズル完成';

    } else if (state == "pause") {
        message.textContent = '一時停止';
    }

    if (game_clear == true) {
        message.textContent = 'メニュー';
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
        game_clear = false;
        timerDisplay = document.getElementById('timerArea');
        timerDisplay.textContent = formatTime(seconds);
    });



    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;'; // HTMLエンティティで「×」を表現
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        if (game_clear == true) {
            document.body.removeChild(modal);
        } else if (state == "pause") {
            restartTimer();
            document.body.removeChild(modal);
        }
    });

    // ホバー時のスタイルを追加
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.border = '1px solid #555';
        closeButton.style.padding = '2px';
        closeButton.style.color = 'red';
    });

    // ホバーが外れた時のスタイルを追加
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.border = 'black';
        closeButton.style.padding = '0';
        closeButton.style.color = '#333';
    });

    const homeButton = document.createElement('button');
    homeButton.textContent = 'アップロード画面に戻る';
    homeButton.style.padding = '5px';
    homeButton.addEventListener('click', () => {
        // ホームへのリダイレクト処理
        window.location.href = '/';
    });

    modal.appendChild(closeButton);
    modal.appendChild(message);
    modal.appendChild(timeDisplay);
    modal.appendChild(img);
    modal.appendChild(restartButton);
    modal.appendChild(homeButton);
    modal.appendChild(closeButton);

    document.body.appendChild(modal);
};

// ゲームをリスタートする関数
const restartGame = () => {
    currentState.length = 0;
    currentState.push(...initialState);

    // パズルを解ける状態になるまでシャッフル
    do {
        shuffleArray(currentState);
    } while (!isSolvable(currentState));

    renderPuzzle(currentState);
    startTimer();
};

// 移動が有効かどうかを判定する関数
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

// タイマーを一時停止する関数
function pauseTimer() {
    stopTimer();
    timerstopetask();
    displayCompletionMessage("pause");
}

// ゲームの初期状態をコピー
const currentState = [...initialState];

// パズルを解ける状態になるまでシャッフル
do {
    shuffleArray(currentState);
} while (!isSolvable(currentState));

// パズルの初期描画
renderPuzzle(currentState);

// コンソールにメッセージを表示
console.log("This puzzle is guaranteed to be solvable!");

const img = document.createElement('img');
const imageName = 'original.jpg'; // 表示する画像のファイル名を指定
img.src = `../static/divided_images/${imageName}`; // 画像のパスを upload_images フォルダ内に設定
img.style.maxWidth = '200px'; // 最大幅を200pxに設定
img.style.maxHeight = '200px'; // 最大高さを200pxに設定

// ページの読み込み完了時の処理
document.addEventListener('DOMContentLoaded', function () {
    // 一時停止ボタンのクリックイベント
    const pauseButton = document.getElementById('pauseButton');
    pauseButton.addEventListener('click', pauseTimer);
});
