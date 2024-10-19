const gameContainer = document.getElementById('game');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const gameLevel = document.getElementById('game-level');

let playerPosition = { x: 0, y: 0 };
let finishPosition = { x: 0, y: 0 };
let walls = [];
let level = 1;
let gridSize = 10;
let gameActive = false;


function createGrid() {
    gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
    gameContainer.style.gridTemplateRows = `repeat(${gridSize}, 40px)`;
    gameContainer.innerHTML = '';
    gameLevel.innerHTML = 'Уровень: ' + level;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (i === playerPosition.y && j === playerPosition.x) {
                cell.textContent = '🙂';
            } else if (i === finishPosition.y && j === finishPosition.x) {
                cell.classList.add('finish');
            } else if (walls.some(wall => wall.x === j && wall.y === i)) {
                cell.classList.add('wall');
            }
            gameContainer.appendChild(cell);
        }
    }
}

function generateFinish() {
    finishPosition = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
    };
    
    if (finishPosition.x === playerPosition.x && finishPosition.y === playerPosition.y) {
        generateFinish();
    } else if (walls.some(wall => wall.x === finishPosition.x && wall.y === finishPosition.y)) {
        generateFinish();
    }
}

function generateWalls(level) {
    walls = [];
    while (walls.length < level) {
        const wallX = Math.floor(Math.random() * gridSize);
        const wallY = Math.floor(Math.random() * gridSize);
        if ((wallX !== playerPosition.x || wallY !== playerPosition.y) &&
            (wallX !== finishPosition.x || wallY !== finishPosition.y) &&
            !walls.some(wall => wall.x === wallX && wall.y === wallY)) {
            walls.push({ x: wallX, y: wallY });
        }
    }
}

function startGame() {
    const inputSize = prompt("Введите размер игрового поля (например, 10 для 10x10):", "10");

    if (!inputSize || isNaN(inputSize) || inputSize <= 0) {
        alert("Некорректный ввод! Пожалуйста, введите положительное число.");
        return;
    }

    gridSize = parseInt(inputSize);
    playerPosition = { x: 0, y: 0 };
    level = 1;
    gameActive = true;
    restartBtn.disabled = false;

    generateWalls(level);
    generateFinish();
    createGrid();
}

function restartGame() {
    playerPosition = { x: 0, y: 0 };
    gameActive = true;
    generateWalls(level);
    generateFinish();
    createGrid();
}

function movePlayer(dx, dy) {
    if (!gameActive) return;

    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (newX < 0 || newY < 0 || newX >= gridSize || newY >= gridSize) {
        alert('Вы выпали за пределы поля, можете попробовать еще раз нажав на кнопку переиграть.');
        gameActive = false;
        return;
    }

    if (walls.some(wall => wall.x === newX && wall.y === newY)) {
        alert('Вы ударились о стену, можете попробовать еще раз нажав на кнопку переиграть.');
        gameActive = false;
        return;
    }

    playerPosition.x = newX;
    playerPosition.y = newY;

    if (playerPosition.x === finishPosition.x && playerPosition.y === finishPosition.y) {
        alert('Вы достигли финиша! Следующий уровень.');
        level++;
        restartGame();
    } else {
        createGrid();
    }
}

document.addEventListener('keydown', function (event) {
    if (!gameActive) return;
    switch (event.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

createGrid();