const initialState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

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

        if (isSolved(currentState)) {
            alert('Congratulations! Puzzle solved.');
        }
    }
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

const currentState = [...initialState];

do {
    shuffleArray(currentState);
} while (!isSolvable(currentState));

renderPuzzle(currentState);


console.log("This puzzle is guaranteed to be solvable!");
