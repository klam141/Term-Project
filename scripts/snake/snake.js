var gameArea;
var snake;
var food;

function main() {
	initGame();
	
	initGameLoop(100);	
}

function initGame() {
	gameContainer = $('#game');
	gameWidth = 25;
	gameHeight = 15;
	
	snakeLength = 10;
	
	gameArea = new GameArea(gameContainer, gameWidth, gameHeight);
	snake = new Snake(gameArea.getRandomCoords(), snakeLength);
	displaySnake();
	
	food = new Food(gameArea.getRandomCoords());
	displayFood();
	
	//set the game to be active right away
	gameContainer.focus();
	
	setMoveKeys();
}

function setMoveKeys() {	
	$(gameArea.container).on('keydown', function(e) {		
		if(e.keyCode != 116) e.preventDefault(); //stop keyboard scrolling
		
		var newDirection;
		
		switch(e.keyCode) {
			case 38: //up arrow
			case 87: //w
				newDirection = 'up';
				break;
				
			case 40: //down arrow
			case 83: //s
				newDirection = 'down';
				break;
				
			case 37: //left arrow
			case 65: //a
				 newDirection = 'left';
				break;
				
			case 39: //right arrow
			case 68: //d
				newDirection = 'right';
				break;
		}
		
		//store data for later use
		snake.newDirections.push(newDirection);	
	});
}

function initGameLoop(interval) {
	var gameLoop = setInterval(function() {manageGameLoop(gameLoop)}, interval);
}

function manageGameLoop(g) {
	
	//update direction
	snake.updateDirection();
	
	//wait for a direction to be pressed
	if(snake.direction != '') {
		//clear the grid every frame
		gameArea.clearGrid();
				
		var newCoords = snake.getNewCoords();
		
		//stop if bad collision
		if(checkCollisions(newCoords)) snake.updateCoords(newCoords);
		else clearInterval(g);
		
		displaySnake();
		displayFood();
		
	}
}

function displaySnake() {
	for(var i = 0; i < snake.coords.length; i++) {
		gameArea.displayGridItem(snake.coords[i], snake.color);
	}
}

function displayFood() {
	gameArea.displayGridItem(food.coords, food.color);
}

function growSnake() {
	snake.updateLength();
	
	food.coords = gameArea.getRandomCoords();
}

//returns false if bad collision
function checkCollisions(newCoords) {
	switch(snake.checkCollisions(gameArea.grid, food.coords, newCoords)) {
		case 0:
			return true;
			break;
			
		case 1: //if you eat food gain length and move the food				
			growSnake()				
			return true;
			break;
			
		case 2:
		return false;
			break;		
	}
}




$(function(){main()});