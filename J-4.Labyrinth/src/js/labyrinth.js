const gameBoard = document.getElementById('game');

export let gameSizeX = 6;
export let gameSizeY = 6;

export function initGame() {
    gameBoard.innerHTML = "";
    gameBoard.style.gridTemplateColumns = `repeat(${gameSizeX}, 60px)`;
    gameBoard.style.gridTemplateRows = `repeat(${gameSizeY}, 60px)`;

    for (let y = 0; y < gameSizeY; y++) {
        for (let x = 0; x < gameSizeX; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            gameBoard.appendChild(cell);
        }
    }
}