var gameArea;
var snake;

function main() {
	initGame();
}

function initGame() {
	gameContainer = $('#game');
	gameWidth = 25;
	gameHeight = 15;
	
	gameArea = new GameArea(gameContainer, gameWidth, gameHeight);
	snake = new Snake(gameArea.getRandomCoords(), gameArea.grid);
	
	setMoveKeys();
}

function setMoveKeys() {
	
	$(gameArea.container).on('keydown', function(e) {		
		e.preventDefault(); //stop keyboard scrolling
		
		switch(e.keyCode) {
			case 38: //up arrow
			case 87: //w
				snake.direction = 'up';
				break;
				
			case 40: //down arrow
			case 83: //s
				snake.direction = 'down';
				break;
				
			case 37: //left arrow
			case 65: //a
				snake.direction = 'left';
				break;
				
			case 39: //right arrow
			case 68: //d
				snake.direction = 'right';
				break;
		}
		gameArea.clearGrid();
		snake.updateAndDisplayLocation(gameArea.grid);
	});
}




$(function(){main()});