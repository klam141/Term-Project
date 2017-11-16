var gameArea;
var snake;
var food;

function main() {
	initGame();	
}

function initGame() {	
	gameContainer = $('#game');
	gameWidth = 25;
	gameHeight = 15;
	
	gameArea = new GameArea(gameContainer, gameWidth, gameHeight);
	
	gameArea.displaySplashScreen();
	
	setEvents();
};

function initRound() {
	//make a new grid each game
	gameArea.clear();
	gameArea.grid.body = gameArea.grid.displayAndGetGrid();
	
	gameArea.removeOverlay();
	
	snakeLength = 10;
	snake = new Snake(gameArea.grid.getRandomCoords(), snakeLength);
	displaySnake();
	
	food = new Food(gameArea.grid.getRandomCoords());
	displayFood();
	
	//set the game to be active right away
	gameArea.grid.container.focus();
	
	setMoveKeys();
	
	initGameLoop();
}

function setEvents() {
	setButtonEvents();
	setMoveKeys();
}

function setButtonEvents() {
	$(gameArea.grid.container).on('click', '#gameButton', initRound);
	
	
	$(gameArea.grid.container).on('keydown', function(e) {
		if(e.keyCode == 13 | e.keyCode == 32) {
			var click = $.Event('click');
			$('#gameButton').trigger(click);
		}
	});
	
}

function setMoveKeys() {
	$(gameArea.grid.container).on('keydown', function(e) {
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

function initGameLoop() {
	requestAnimationFrame(manageGameLoop);
}

function manageGameLoop() {
	var frameId = setTimeout(function() {requestAnimationFrame(manageGameLoop)}, 90);
	
	snake.updateDirection();
	
	//wait for a direction to be pressed
	if(snake.direction != '') {
		//clear the grid every frame
		gameArea.grid.clear();
				
		var newCoords = snake.getNewCoords();
		
		displaySnake();
		displayFood();
		
		if(checkCollisions(newCoords)) {
			snake.updateCoords(gameArea.grid, newCoords);
		}
		//stop if bad collision
		else {
			var score = snake.coords.length;
			displayScoreScreen(score, gameArea.checkGameAreaFull(score));
			window.clearTimeout(frameId);
		}	
	}	
}

function displaySnake() {
	for(var i = 0; i < snake.coords.length; i++) {
		gameArea.grid.displayGridItem(snake.coords[i], snake.color, 'snake');
	}
}

function displayFood() {
	gameArea.grid.displayGridItem(food.coords, food.color, 'food');
}

function growSnake() {
	snake.updateLength();
	
	food.coords = gameArea.grid.getRandomCoords();
}

//returns false if bad collision
function checkCollisions(newCoords) {
	switch(snake.checkCollisions(gameArea.grid, newCoords)) {
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

function displayScoreScreen(score, gameWon) {
	gameArea.displayGameOver(score, gameWon);
}




$(function(){main()});