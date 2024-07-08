
# Gaming Paradise - JavaScript Web Game Project  [(Game Link)](https://xuann175.github.io/XuAnn.github.io/)

## Abstract
We created two web mini games using JavaScript combined with HTML and CSS: Minesweeper and Wordle. A primary game interface links to these games, allowing play via a web browser. Minesweeper includes game state saving/loading using JSON files, while Wordle features keyboard input with interactive and visually appealing game interfaces.

## 1. Introduction
### Motivation
After learning HTML, CSS, and JavaScript throughout the semester, we decided to leverage our gaming interests and JavaScript's suitability for web game development by creating two web mini games for our final project.

### Research Overview
We developed an initial game interface as a homepage linking to two JavaScript mini games: Minesweeper and Wordle. Minesweeper displays remaining mines, reset button, countdown timer, mine grid, difficulty buttons, and game state save/load buttons. Players use the mouse to play and can save the game state at any time. Wordle generates a five-letter word daily from a set of 2315 words, giving players six attempts to guess the word using a keyboard.

### Results
- **Figure 1:** Initial Game Interface  
![](https://imgur.com/SNOU8XA.jpg)
- **Figure 2:** Minesweeper Game Interface  
![](https://imgur.com/doeZIF6.jpg)
- **Figure 3:** Wordle Game Interface  
![](https://imgur.com/q7l1jpy.jpg)
## 2. Background
### Minesweeper Overview
Minesweeper is a Microsoft-developed game where the objective is to identify all non-mine squares. Clicking a mine results in failure, with scoring based on remaining time. Players select different grid sizes and use logical reasoning to identify mine locations.

### Wordle Overview
Wordle, developed by Josh Wardle, generates a five-letter word daily from a set of 2315 words. Players have six attempts to guess the word, with feedback given through colored indicators (green for correct letters in the correct position, yellow for correct letters in the wrong position, gray for incorrect letters). The game gained global popularity in late 2021 due to its simplicity and shareable results.

## 3. Gaming Paradise - Main Content
### Minesweeper - Program Principles
- **Game Interface Structure:**
  1. Remaining Mines: `<div id="mineCount">`
  2. Reset Button: `<div id="resetbutton">`
  3. Countdown Timer: `<div id="timer">`
  4. Mine Grid: `<div id="gameboard">`

#### Initialization Functions
1. `initializeBoard()`: Initializes each grid cell to default state and randomly places mines.
2. `renderBoard()`: Displays appropriate icons based on grid cell status.
3. `restartTimer()`: Resets the countdown timer to 999 seconds.

#### Winning Function
Determines victory if all non-mine cells are revealed.

#### Game Over Function
Triggers defeat if any mine cell is clicked.

#### Save/Load Game State Functions
Creates a new object storing all current information and converts it to a JSON file for download. Loading restores the game state from the uploaded JSON file.

### Wordle - Program Principles
- **Game Interface Structure:**
  1. Title: `<div id="logo">`
  2. Give Up Button: `<div id="giveUpBtn">`
  3. Game Area: `<div id="game_area">`
  4. Clickable Keyboard: `<div id="keyboard">`

#### Main Functions
- Initializes the game board
- Ends the game upon correct guess or exhausting attempts
- Adds input letters to the current word
- Deletes the last letter in the current word
- Validates the guessed word against the dictionary and provides feedback based on correctness


## 4. Issues and Discussions
### Challenges & Solutions
We faced difficulties finding suitable transparent background images for mines. After extensive search, we found suitable SVG files. Initially, we aimed to use JavaScript's OOP features and run the code on a web server but later simplified the approach by consolidating code into a single JS file.

### Additional Features
We added game state saving functionality using JSON files, providing a seamless experience for players to pause and resume their games.

