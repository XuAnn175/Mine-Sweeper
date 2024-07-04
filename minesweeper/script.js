// Define the number of rows in the game board
let numRows = 12;

// Define the number of columns in the game board
let numCols = 12;

// Define the number of mines in the game
let numMines = 30;

// Get the game board element from the DOM
const gameBoard = document.getElementById("gameBoard");

// Initialize the board array
let board = [];

// Function to initialize the game board
function initializeBoard() {
    for (let i = 0; i < numRows; i++) {
        board[i] = [];
        for (let j = 0; j < numCols; j++) {
            board[i][j] = {
                isMine: false,
                revealed: false,
                isFlagged: false,
                count: 0,
            };
        }
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        const row = Math.floor(Math.random() * numRows);
        const col = Math.floor(Math.random() * numCols);

        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }

    }

    // Calculate counts for each cell
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (!board[i][j].isMine) {
                let count = 0;

                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        const ni = i + dx;
                        const nj = j + dy;
                        if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols && board[ni][nj].isMine) {
                            count++;
                        }
                    }
                }
                board[i][j].count = count;

            }
        }
    }
}

// Function to reveal a cell
function revealCell(row, col) {
    if (row < 0 || row >= numRows || 
        col < 0 || col >= numCols || 
        board[row][col].revealed) {
        return;
    }

    board[row][col].revealed = true;

    if (board[row][col].isMine) {
        // Handle game over
        alert("Game Over! You stepped on a mine.");
        gameOver();
    } 
    
    else if (board[row][col].count === 0) {
        // If cell has no mines nearby, reveal adjacent cells
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                revealCell(row + dx, col + dy);
            }
        }
    }

    renderBoard();
}

// Get the save and retrieve buttons from the DOM
let saveButton = document.getElementById('saveState');
let retrieveButton = document.getElementById('retrieveState');

// Function to handle game over
function gameOver() {
    // Log a message to the console
    console.log("Game Over");

    // Iterate over each row of the board
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        // Iterate over each column of the board
        for (let colIndex = 0; colIndex < numCols; colIndex++) {
            // Get the cell at the current row and column
            const cellState = board[rowIndex][colIndex];

            // Check if the cell is a mine
            if (cellState.isMine) {
                // Get the HTML element for the cell
                let cellElement = getCellElement(rowIndex, colIndex);

                // Log the cell element to the console
                console.log(cellElement);

                // Change the cell's background color to red
                cellElement.style.backgroundColor = 'red';

                // Set the cell's inner HTML to an image of a bomb
                cellElement.innerHTML = '<img src="bomb.svg" alt="Mine">';
            }
    }
    }

    // Clear the game timer interval
    // clearInterval(timerInterval);

    //set timeleft to 0
    timeLeft = 0;
    // Change the reset button's image to a negative image
    resetButton.src = "negative.svg";

    // Disable the save button
    saveButton.disabled = true;
}

// Function to restart the timer
function restartTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            timer.textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Function to get the cell element from the board
function getCellElement(row, col) {
    return gameBoard.children[row * (numCols + 1) + col];
}

// Function to render the game board
function renderBoard() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (board[i][j].revealed) {
                cell.classList.add("revealed");
                if (board[i][j].isMine) {
                    cell.classList.add("mine");
                    //cell.textContent = "💣";
                } else if (board[i][j].count > 0) {
                    cell.textContent = board[i][j].count;
                }
            } else if (board[i][j].isFlagged) {
                cell.classList.add("flagged");
                cell.style.backgroundColor = 'yellow'; // Change color for flagged cells
            }

            cell.addEventListener('click', function() {
                if (board[i][j].isMine) {
                    gameOver();
                    alert('Game Over');
                }
                else {
                    revealCell(i, j);
                }
                checkWin();
            });

            // Add an event listener for the 'contextmenu' event to the cell
            cell.addEventListener('contextmenu', function(event) {
                // Prevent the default context menu from appearing
                event.preventDefault();
                // Get the cell's row and column indices
                const rowIndex = i;
                const colIndex = j;
                // Get the cell's state from the board
                const cellState = board[rowIndex][colIndex];
                // Check if the cell is a mine and is not flagged
                if (cellState.isMine && !cellState.isFlagged) {
                    // Flag the cell
                    cellState.isFlagged = true;
                    // Change the cell's background color to yellow
                    cell.style.backgroundColor = 'yellow';
                    // Decrease the mine count by 1
                    const currentMineCount = Number(mineCount.textContent);
                    const newMineCount = currentMineCount - 1;
                    mineCount.textContent = newMineCount;
                }
                // Check if the cell is a mine and is flagged
                else if (cellState.isMine && cellState.isFlagged) {
                    // Unflag the cell
                    cellState.isFlagged = false;

                    // Reset the cell's background color
                    cell.style.backgroundColor = '';
                    // Increase the mine count by 1
                    const currentMineCount = Number(mineCount.textContent);
                    const newMineCount = currentMineCount + 1;
                    mineCount.textContent = newMineCount;
                }
            });

            gameBoard.appendChild(cell);
        }
        gameBoard.appendChild(document.createElement("br"));
    }
}

// Get the normal button from the DOM
let normalButton = document.getElementById('normal');

// Initialize the board and render it
// initializeBoard();
// renderBoard();

// Get the reset button from the DOM
let resetButton = document.getElementById('resetButton');

// Get the mine count display element from the DOM
let mineCount = document.getElementById('mineCount');

// Get the timer display element from the DOM
let timer = document.getElementById('timer');

// Set the total number of mines
let totalMines = 10;

// Set the initial time left
let timeLeft = 999;

// Display the total number of mines
mineCount.textContent = totalMines;

// Add event listener for the reset button
resetButton.addEventListener('click', function() {
    initializeBoard();
    renderBoard();
    resetButton.src = "neutral.svg"; // Set to neutral image during game
    mineCount.textContent = numMines;
    timeLeft = 999;
    timer.textContent = timeLeft;
    saveButton.disabled = false;
    restartTimer();
});

// Set up the timer interval
let timerInterval = setInterval(function() {
    if (timeLeft > 0) {
        timeLeft--;
        timer.textContent = timeLeft;
    } else {
        clearInterval(timerInterval);
    }
}, 1000);

// Function to handle game won
function gameWon() {
    alert('Congratulations! You have won the game.');
    resetButton.src = "positive.svg"; // Set to positive image when game is won
    clearInterval(timerInterval);
    saveButton.disabled = true; // Disable save button after game is won
}

// Function to check if the player has won the game
function checkWin() {
    // Iterate over each row of the board
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        // Iterate over each column of the board
        for (let colIndex = 0; colIndex < numCols; colIndex++) {
            // Get the cell at the current row and column
            const cell = board[rowIndex][colIndex];

            // Check if the cell is not a mine and has not been revealed
            if (!cell.isMine && !cell.revealed) {
                // If such a cell is found, the game has not been won yet, so return immediately
                return;
            }
        }
    }
    // If no such cell is found after checking all cells, the game has been won
    // Call the gameWon function to handle winning the game
    gameWon();
}
// Get the easy button from the DOM
let easyButton = document.getElementById('easy');

// Get the hard button from the DOM
let hardButton = document.getElementById('hard');

// Add event listener for the easy button
easyButton.addEventListener('click', function() {
    numRows = 8;
    numCols = 8;
    numMines = 10;
    resetButton.click();
    updateGameInfoWidth();
    updateButtonWidth();
    restartTimer();
});

// Add event listener for the normal button
normalButton.addEventListener('click', function() {
    numRows = 12;
    numCols = 12;
    numMines = 24;
    resetButton.click();
    updateGameInfoWidth();
    updateButtonWidth();
    restartTimer();
});

// Add event listener for the hard button
hardButton.addEventListener('click', function() {
    numRows = 24;
    numCols = 24;
    numMines = 79;
    resetButton.click();
    updateGameInfoWidth();
    updateButtonWidth();
    restartTimer();
});

// Function to update the game info width
function updateGameInfoWidth() {
    const gameInfo = document.getElementById('gameInfo');
    if (numCols <= 8) {
        gameInfo.style.width = '12%';
    } 
    else if (numCols <= 12) {
        gameInfo.style.width = '19%';
    } 
    else {
        gameInfo.style.width = '39.5%';
    }
}

// Function to update the button widths
function updateButtonWidth() {
    const buttons = document.querySelectorAll('button.difficulty');
    const saveButton = document.getElementById('saveState');
    const retrieveButton = document.getElementById('retrieveState');

    if (numCols <= 8) {
        buttons.forEach(button => {
            let gameInfoWidth = parseFloat('12%');
            let newWidth = gameInfoWidth / 3;
            button.style.width = `${newWidth + 0.33}%`;
        });
        saveButton.style.width = '6.5%';
        retrieveButton.style.width = '6.5%';
        retrieveButton.style.fontSize = 'smaller';
    } 

    else if (numCols <= 12) {
        buttons.forEach(button => {
            let gameInfoWidth = parseFloat('19%');
            let newWidth = gameInfoWidth / 3;
            button.style.width = `${newWidth + 0.33}%`;
        });
        saveButton.style.width = '10%';
        retrieveButton.style.width = '10%';
        retrieveButton.style.fontSize = 'medium';
    } 

    else {
        buttons.forEach(button => {
            let gameInfoWidth = parseFloat('39.5%');
            let newWidth = gameInfoWidth / 3;
            button.style.width = `${newWidth + 0.33}%`;
        });
        saveButton.style.width = '20.5%';
        retrieveButton.style.width = '20.5%';
        retrieveButton.style.fontSize = 'medium';
    }
}

// Add event listeners for the save and retrieve buttons
saveButton.addEventListener('click', saveGameState);
retrieveButton.addEventListener('click', retrieveGameState);

// Function to save the game state
function saveGameState() {
    // Create a new object to hold the game state
    const gameState = {};
    gameState.board = board;
    gameState.numRows = numRows;
    gameState.numCols = numCols;
    gameState.numMines = numMines;
    gameState.timeLeft = timeLeft;
    gameState.mineCount = mineCount.textContent;

    // Convert the game state to a JSON string
    const gameStateJSON = JSON.stringify(gameState);

    // Create a new Blob object from the JSON string
    const blob = new Blob([gameStateJSON], { type: 'application/json' });

    // Create a new anchor element
    const a = document.createElement('a');

    // Set the href of the anchor to a URL representing the Blob
    a.href = URL.createObjectURL(blob);

    // Set the download attribute of the anchor to the desired file name
    a.download = 'gameState.json';

    // Add the anchor to the document body
    document.body.appendChild(a);

    // Programmatically click the anchor to start the download
    a.click();

    // Remove the anchor from the document body
    document.body.removeChild(a);
}

// Function to retrieve the game state
function retrieveGameState() {
    // Create a new file input element
    const fileInput = document.createElement('input');

    // Set the type of the input to file
    fileInput.type = 'file';

    // Accept only JSON files
    fileInput.accept = 'application/json';

    // Add an event listener for the onchange event
    fileInput.onchange = function(event) {
        // Get the first file from the file list
        const selectedFile = event.target.files[0];

        // Create a new FileReader
        const fileReader = new FileReader();

        // Add an event listener for the onload event
        fileReader.onload = function(loadEvent) {
            // Parse the file content as JSON
            const gameState = JSON.parse(loadEvent.target.result);

            // Update the game state with the loaded data
            board = gameState.board;
            numRows = gameState.numRows;
            numCols = gameState.numCols;
            numMines = gameState.numMines;
            timeLeft = gameState.timeLeft;

            // Update the mine count display
            mineCount.textContent = gameState.mineCount;

            // Render the game board
            renderBoard();

            // Update the width of the button and game info
            updateButtonWidth();
            updateGameInfoWidth();

            // Update the timer display
            timer.textContent = timeLeft;

            // Restart the game timer
            restartTimer();
        };

        // Start reading the file as text
        fileReader.readAsText(selectedFile);
    };

    // Add the file input to the document body
    document.body.appendChild(fileInput);

    // Programmatically click the file input to open the file dialog
    fileInput.click();

    // Remove the file input from the document body
    document.body.removeChild(fileInput);
}

// Function to handle the initial setup and rendering
function initialSetup() {
    initializeBoard();
    renderBoard();
    restartTimer();
    saveButton.disabled = false;
    resetButton.src = "neutral.svg";
    mineCount.textContent = numMines;
    timer.textContent = timeLeft;
}

// Call the initial setup function on page load
initialSetup();