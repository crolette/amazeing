import { LEVEL, PLAYER } from '../app.js';
import { LEVELPATH } from './createLevel.js';
import { levels } from './mazes.js';
import { lostGame, missingKey, winningGame } from './win.js';

const levelDisplay = document.querySelector('#level');
const timerCurrent = document.querySelector('#timer__current');
let timer;
let interval;
let currentLevel;
let KEY = 0;

function game() {
	timer = 1;
	currentLevel = levels[LEVEL - 1];
	clearInterval(interval);
	levelDisplay.textContent = `LEVEL ${LEVEL}`;
	timerCurrent.textContent = timer;
	interval = setInterval(() => {
		timerCurrent.textContent = timer++;
	}, 1000);

	document.body.removeEventListener('keyup', handleKeyEvent);
	document.body.addEventListener('keyup', handleKeyEvent);
}

function sizeMaze() {
	const maxHeightMaze = document.querySelector('#maze-table').children.length;
	const maxWidthMaze = currentLevel[0].length;
	return [maxHeightMaze, maxWidthMaze];
}

function handleKeyEvent(e) {
	const [maxHeightMaze, maxWidthMaze] = sizeMaze(currentLevel);
	let mazeTable = document.querySelector('#maze-table');
	const player = document.querySelector('#player');
	let currentPlayerPosition = {
		row: parseInt(player.parentElement.getAttribute('data-row-index')),
		cell: parseInt(player.getAttribute('data-cell-index')),
	};

	if (e.key == 'ArrowLeft') {
		if (currentPlayerPosition.cell == 0) return;

		const nextPosition = player.previousElementSibling;
		checkPosition(player, nextPosition);
		currentPlayerPosition = newPlayerPosition(
			currentPlayerPosition.row,
			parseInt(nextPosition.getAttribute('data-cell-index'))
		);
	}

	if (e.key == 'ArrowRight') {
		if (currentPlayerPosition.cell == maxWidthMaze - 1) return;
		const nextPosition = player.nextElementSibling;
		checkPosition(player, nextPosition);
		currentPlayerPosition = newPlayerPosition(
			currentPlayerPosition.row,
			parseInt(nextPosition.getAttribute('data-cell-index'))
		);
	}

	if (e.key == 'ArrowUp') {
		if (currentPlayerPosition.row == 0) return;
		else {
			currentPlayerPosition.row--;
			const nextPosition = mazeTable
				.querySelector(`[data-row-index='${currentPlayerPosition.row}']`)
				.querySelector(`[data-cell-index='${currentPlayerPosition.cell}']`);
			checkPosition(player, nextPosition);
		}
	}

	if (e.key == 'ArrowDown') {
		if (currentPlayerPosition.row == maxHeightMaze - 1) return;
		else {
			currentPlayerPosition.row++;
			const nextPosition = mazeTable
				.querySelector(`[data-row-index='${currentPlayerPosition.row}']`)
				.querySelector(`[data-cell-index='${currentPlayerPosition.cell}']`);
			checkPosition(player, nextPosition);
		}
	}
}

function checkPosition(playerPosition, nextPosition) {
	if (nextPosition.id === 'wall') return;
	if (nextPosition.id == 'path') {
		playerPosition.classList.remove('maze__player');
		playerPosition.classList.add('maze__path');
		playerPosition.setAttribute('id', 'path');
		playerPosition.style.background = `url(./images/sprite_paths_small.png) no-repeat ${LEVELPATH}`;

		nextPosition.classList.remove('maze__path');
		nextPosition.classList.add('maze__player');
		nextPosition.style.background = `url(./images/sprite_players_small.png) no-repeat ${PLAYER}, url(./images/sprite_paths_small.png) no-repeat ${LEVELPATH}`;
		nextPosition.setAttribute('id', 'player');
	}

	if (nextPosition.id == 'water') {
		console.log('water');
		playerPosition.classList.remove('maze__player');
		playerPosition.classList.add('maze__path');
		playerPosition.setAttribute('id', 'path');
		playerPosition.style.background = `url(./images/sprite_paths_small.png) no-repeat ${LEVELPATH}`;

		nextPosition.classList.remove('maze__path');
		nextPosition.classList.add('maze__player');
		nextPosition.setAttribute('id', 'player');
		nextPosition.style.background = `url(./images/sprite_players_small.png) no-repeat ${PLAYER}, url(./images/sprite_paths_small.png) no-repeat -168px 0px`;
		document.body.removeEventListener('keyup', handleKeyEvent);
		clearInterval(interval);
		lostGame(timer);
	}

	if (nextPosition.id == "key") {
		console.log("KEY : ", KEY)
		KEY = 1;
		console.log("KEY : ", KEY)
		playerPosition.classList.remove('maze__player');
		playerPosition.classList.add('maze__path');
		playerPosition.setAttribute('id', 'path');
		playerPosition.style.background = `url(./images/sprite_paths_small.png) no-repeat ${LEVELPATH}`;

		nextPosition.classList.remove('maze__path');
		nextPosition.classList.add('maze__player');
		nextPosition.style.background = `url(./images/sprite_players_small.png) no-repeat ${PLAYER}, url(./images/sprite_paths_small.png) no-repeat ${LEVELPATH}`;
		nextPosition.setAttribute('id', 'player');

	}

	if (nextPosition.id == 'treasure') {
		playerPosition.classList.remove('maze__player');
		playerPosition.classList.add('maze__path');
		playerPosition.setAttribute('id', 'path');
		playerPosition.style.background = `url(./images/sprite_paths_small.png) no-repeat ${LEVELPATH}`;

		nextPosition.classList.remove('maze__path');
		nextPosition.classList.add('maze__player');
		nextPosition.setAttribute('id', 'player');
		nextPosition.style.background = `url(./images/sprite_players_small.png) no-repeat ${PLAYER}, url(./images/sprite_paths_small.png) no-repeat ${LEVELPATH}`;
		if (LEVEL < levels.length) {
			document.body.removeEventListener('keyup', handleKeyEvent);
			clearInterval(interval);
			winningGame(timer);
		}
		else if (LEVEL == levels.length && KEY == 0) {
			missingKey();
		} else if (LEVEL == levels.length && KEY == 1) {
			document.body.removeEventListener('keyup', handleKeyEvent);
			clearInterval(interval);
			winningGame(timer);
		}
	}
}

function newPlayerPosition(row, cell) {
	const currentPlayerPosition = {
		row: row,
		cell: cell,
	};
	return currentPlayerPosition;
}

export { game, KEY };
