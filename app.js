import { createLevelGrid } from './js/createLevel.js';
import { game } from './js/game.js';
import { levels, players } from './js/mazes.js';

let PLAYER = players['player-1'];

let LEVEL = 1;

function setLevel(value) {
	LEVEL = value;
}

// if we want to give the user the possibility to select the level
// const levelOption = document.querySelector('#levels');
// levelOption.addEventListener('change', (e) => {
// 	LEVEL = levelOption.children[e.target.selectedIndex].id;
// 	if (LEVEL != '0') {
// 		LEVELPATH = levelsPath[`level-${LEVEL}`];
// 		startGame();
// 	}
// });

const playersList = [...document.querySelector('.players__list').children];
playersList.forEach((playerList) => {
	playerList.addEventListener('click', (e) => {
		PLAYER = players[e.target.id];
		startGame();
	});
});

function startGame() {
	console.log("LEVEL ", LEVEL, " LENGTH ", levels.length)
	if (LEVEL > levels.length) {
		console.log('abort');
		return;
	} else {
		createLevelGrid();
		game();
	}
}

export { LEVEL, PLAYER, setLevel };
