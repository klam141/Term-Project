var gameArea;
var snake;

function main() {
	initGame();
	
	initGameLoop()	
}

function initGame() {
	gameContainer = $('#game');
	gameWidth = 25;
	gameHeight = 15;
	
	snakeLength = 10;
	
	gameArea = new GameArea(gameContainer, gameWidth, gameHeight);
	snake = new Snake(gameArea.getRandomCoords(), snakeLength);
	
	gameArea.displayGridItem(snake.coords, snake.color);
	
	//set the game to be active right away
	gameContainer.focus();
	
	setMoveKeys();
}

function setMoveKeys() {	
	$(gameArea.container).on('keydown', function(e) {		
		if(e.keyCode != 116) e.preventDefault(); //stop keyboard scrolling
		
		var prevDirection = snake.direction;
		var newDirection;
		
		switch(e.keyCode) {
			case 38: //up arrow
			case 87: //w
				if(prevDirection != 'down') newDirection = 'up';
				break;
				
			case 40: //down arrow
			case 83: //s
				if(prevDirection != 'up') newDirection = 'down';
				break;
				
			case 37: //left arrow
			case 65: //a
				if(prevDirection != 'right') newDirection = 'left';
				break;
				
			case 39: //right arrow
			case 68: //d
				if(prevDirection != 'left') newDirection = 'right';
				break;
		}
		
		//prevent turning around too quickly
		snake.direction = newDirection;
	});
}

function initGameLoop() {
	var gameLoop = setInterval(function() {manageGameLoop(gameLoop)}, 100);
}

function manageGameLoop(g) {
	
	
	//wait for a direction to be pressed
	if(snake.direction != '') {
		//clear the grid every frame
		gameArea.clearGrid();
		
		
		
		var newCoords = snake.getNewCoords();
		
		if(snake.checkCollisions(gameArea.grid, newCoords)) {
			snake.updateCoords(newCoords);
			
		}
		else {
			clearInterval(g); //stops on a bad collision
		}
			
		gameArea.displayGridItem(snake.coords, snake.color);
	}
}




$(function(){main()});