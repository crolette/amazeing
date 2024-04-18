import { LEVEL, setLevel } from '../app.js';
import { createLevelGrid } from './createLevel.js';
import { KEY, game } from './game.js';
import { levels } from './mazes.js';

const dialog = document.querySelector('dialog');
const dialogNextLevel = document.querySelector('#dialog-next-level');
const dialogQuit = document.querySelector('#dialog-quit');
const dialogText = document.querySelector('#text-dialog');
const dialogTitle = document.querySelector('#dialog-title');
dialog - close;


dialogNextLevel.addEventListener('click', nextGame);
dialogQuit.addEventListener('click', quitGame);

function quitGame() {
	if (
		(KEY == 0 && LEVEL < levels.length) ||
		(KEY == 1 && LEVEL == levels.length)
	) {
		setLevel(1);
		resetGame();
		dialog.close();
	} else if (KEY == 0 && LEVEL == levels.length) {
		dialog.close();
	}
}

function closeDialog() {
	dialog.close();
}

function winningGame(timer) {
	dialogQuit.textCOntent = 'Quitter le jeu';
	setTextDialog(
		`Vous avez mis: ${timer}s pour finir le niveau ${LEVEL}. Bien joué!`
	);
	if (LEVEL == levels.length) {
		setTextDialog(
			`Vous avez mis: ${timer}s pour finir le niveau ${LEVEL}. Bien joué!
			Vous avez fini le jeu. Pourquoi ne pas essayer avec un autre joueur ?`
		);
		dialogNextLevel.style.display = 'none';
	}

	dialog.showModal();
}

function missingKey() {
	dialogTitle.textContent = 'OUPS...';
	dialogQuit.textCOntent = 'Continuer le jeu';
	setTextDialog(`Apparemment ce dernier coffre ne s'ouvre pas tout seul...`);
	dialogNextLevel.style.display = 'none';
	dialog.showModal();
}

function lostGame(timer) {
	dialogTitle.textContent = 'PERDU';
	setTextDialog(
		`Vous avez perdu en seulement ${timer}secondes !
		Et oui, malheureusement vous ne savez pas nager!`
	);
	dialogNextLevel.style.display = 'none';

	dialog.showModal();
}

function resetGame() {
	const levelDisplay = document.querySelector('#level');
	const timerCurrent = document.querySelector('#timer__current');
	const maze = document.querySelector('#maze');
	maze.innerHTML = '';
	levelDisplay.textContent = 'LEVEL';
	timerCurrent.textContent = '';
}

function setTextDialog(text) {
	dialogText.innerHTML = text;
}

function nextGame() {
	console.log('win click next');
	console.log(LEVEL);

	const newLevel = LEVEL + 1;
	setLevel(newLevel);
	createLevelGrid(levels[LEVEL - 1]);
	game();
	dialog.close();
}

export { winningGame, lostGame, missingKey };
