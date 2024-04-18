import { PLAYER, LEVEL } from '../app.js';
import { levels, levelsPath, levelsTrees } from './mazes.js';

const maze = document.querySelector('#maze');
let currentLevel;
let LEVELPATH
let TREES

function createLevelGrid() {
	console.log('create grid');
	LEVELPATH = levelsPath[`level-${LEVEL}`];
	TREES = levelsTrees[`level-${LEVEL}`];

	let mazeTable = document.querySelector('#maze-table');

	if (mazeTable === null) {
		mazeTable = document.createElement('table');
		mazeTable.id = 'maze-table';
	} else {
		mazeTable.innerHTML = '';
	}
	// let mazeTable = document.createElement('table');
	mazeTable.id = 'maze-table';
	currentLevel = levels[LEVEL - 1];

	for (let outerIndex = 0; outerIndex < currentLevel.length; outerIndex++) {
		const currentRowLevel = currentLevel[outerIndex];
		const rowGrid = createRowGrid(currentRowLevel, outerIndex);
		mazeTable.append(rowGrid);
	}

	maze.append(mazeTable);
	return mazeTable;
}

function createRowGrid(row, outerIndex) {
	const rowGrid = document.createElement('tr');
	rowGrid.setAttribute('data-row-index', outerIndex);
	for (let innerIndex = 0; innerIndex < row.length; innerIndex++) {
		let rowCell = document.createElement('td');
		const element = row[innerIndex];
		if (
			outerIndex == 0 ||
			innerIndex == 0 ||
			innerIndex == row.length - 1 ||
			outerIndex == currentLevel.length - 1
		) {
			rowCell = createBorder(rowCell);
		} else if (element === '*') {
			rowCell = createWall(rowCell);
		}

		if (element === 'S') {
			rowCell = createPlayer(rowCell);
		}
		if (element === 'T') {
			rowCell = createTreasure(rowCell);
		}
		if (element === '.') {
			rowCell = createPath(rowCell);
		}
		if (element === 'W') {
			rowCell = createWater(rowCell);
		}
		if (element === 'K') {
			rowCell = createKey(rowCell);
		}
		rowCell = setIndexes(rowCell, innerIndex);
		rowGrid.append(rowCell);
	}
	return rowGrid;
}

function createBorder(rowCell) {
	rowCell.classList.add('maze__border');
	rowCell.setAttribute('id', 'border');

	return rowCell;
}

function createWall(rowCell) {
	rowCell.classList.add('maze__wall');
	rowCell.setAttribute('id', 'wall');
	rowCell.style.background = `url(./images/sprite_trees_small.png) no-repeat ${TREES},
		url(./images/sprite_paths_small.png) no-repeat ${LEVELPATH}`;

	return rowCell;
}

function createPath(rowCell) {
	rowCell.classList.add('maze__path');
	rowCell.setAttribute('id', 'path');
	rowCell.style.background = `url(./images/sprite_paths_small.png) no-repeat ${LEVELPATH}`;
	return rowCell;
}

function createWater(rowCell) {
	rowCell.classList.add('maze__water');
	rowCell.setAttribute('id', 'water');
	return rowCell;
}

function createKey(rowCell) {
	rowCell.classList.add('maze__key');
	rowCell.setAttribute('id', 'key');
	rowCell.style.background = `url(./images/sprite_treasures_small.png) no-repeat -42px 2px,
		url(./images/sprite_paths_small.png) no-repeat ${LEVELPATH}`;
	return rowCell;
}

function createPlayer(rowCell) {
	rowCell.classList.add('maze__player');
	rowCell.setAttribute('id', 'player');
	rowCell.style.background = `url(./images/sprite_players_small.png) no-repeat ${PLAYER}, url(./images/sprite_paths_small.png) no-repeat ${LEVELPATH}`;
	return rowCell;
}

function createTreasure(rowCell) {
	rowCell.classList.add('maze__treasure');
	rowCell.setAttribute('id', 'treasure');
	return rowCell;
}

function setIndexes(rowCell, innerIndex) {
	rowCell.setAttribute('data-cell-index', innerIndex);
	return rowCell;
}

export { createLevelGrid, LEVELPATH };
