class Coordinates {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
};

class GameArea {
	constructor(container, width, height) {
		this.container = container;
		
		this.clear();
		
		this.grid = new Grid(container, width, height);
	}
	
	displaySplashScreen() {	
		this.grid.container.append(
			'<div id="overlay">' +
			'<h1>Snake</h1>' +
			'<button id="gameButton">Play</button>' +
			'</div>'
		);
		
		this.styleOverlay();
	}
	
	displayGameOver(score, gameWon) {
		var outputText = '<div id="overlay">'
		
		
		if(gameWon) outputText += '<h1>You Win</h1>';
		else outputText += '<p>Score: ' + (score) + '</p>';
		
		outputText += '<button id="gameButton">Play Again</button></div>'
		
		this.grid.container.append(outputText);
		
		this.styleOverlay();
		
		//fade in
		$('#overlay').toggle();
		$('#overlay').toggle(200);
	}
	
	styleOverlay() {
		$('#overlay').css({
			'background-color': 'rgba(0,0,0,0.75)',

			'color': 'white',
			'font-size': '100px',
			'line-height': '80%',
			
			'display': 'block',
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'bottom': '0',
			'right': '0',
			'z-index': '2',
			
			'width': '100%',
			'height': '100%',
			
			'user-select': 'none'
		});
		
		$('#overlay button').css({
			'background-color': 'black',
			
			'color': 'white',
			
			'font-size': '50px',
			
			'padding': '20px',
			'margin': '0'
		});
	}
	
	removeOverlay() {
		$('#overlay').remove();
	}
	
	checkGameAreaFilled() {
		var gameItemsFilled = 0;
		
		//count filled items
		for(var i = 0; i < this.grid.body.length; i++){
			for(var j = 0; j < this.grid.body[i].length; j++) {
				if($(this.grid.body[i][j]).data().occupied == true) gameItemsFilled ++
			}
		}
		
		return gameItemsFilled;
	}
	
	checkGameAreaFull(qty) {
		var totalGameItems = this.height * this.width;
		
		if (qty == totalGameItems) return true
		else if( qty > totalGameItems) {//Just in case
			console.log('You have filled more of the game than there are squares.')
			return false
		}
		else return false
	}
	
	clear() {
		this.container.html('');
	}
};

class Grid {
	constructor(container, width, height) {
		this.container = container;
		this.width = width;
		this.height = height;
		
		this.boxWidth = 25;
		this.color = 'green';
		
		
		this.body = this.displayAndGetGrid();
	}
	
	displayAndGetGrid() {
		this.initGrid();
		
		this.styleGrid();
		
		return this.getGrid();
	}
	
	initGrid() {
		this.container.html(''); //clear the game area
		
		for(var i = 0; i < this.width; i++) {
			//create rows
			this.container.append('<div class="col-box col-' + i + '"></div>');
			
			//create columns
			for(var j = 0; j < this.height; j++) {
				$('.col-' + i).append('<div class="row-box row-' + j + '"></div>');
			}
		}
		
		//give all boxes data
		$('.row-box').data('occupied', false);
	}
	
	styleGrid() {
		var boxWidth = this.boxWidth + 'px';
	
		var row = $('.row-box');
		var col = $('.col-box');
		
		//remove padding and inline-block blank space
		this.container.css({
			'font-size': '0',
			
			'padding': '0',

			'height': (this.boxWidth * this.height) + 20 + 'px',
			'width': (this.boxWidth * this.width) + 20 + 'px'
		});
		
		//organize boxes;
		//columns
		col.css({	
			'display': 'inline-block',
		
			'width': boxWidth
		});
		
		//rows
		row.css({
			'background-color': 'green',
			
			'border':'1px solid black',
			
			'height': boxWidth,
			'width': 'inherit'		
		});
	}
	
	getGrid() {
		var grid = [];
		
		var cols = $('.col-box');
		
		//get an array of divs that can be called as grid[x][y]
		for(var i = 0; i < cols.length; i++) {
			grid[i] = $('.col-' + i).children();
		}
		
		return grid;
	}
	
	clear() {
		$('.row-box').css({
			'background-color': this.color
		});
	}
	
	//gets a random set of coordinates that arent already occupied
	getRandomCoords(){			
		do {
			var randX = Math.floor(Math.random() * (this.width));
			var randY = Math.floor(Math.random() * (this.height));
			
			var coords = new Coordinates(randX, randY);
			
		} while (!this.checkEmptyGridItem(this.getGridItem(coords)));
		
		
		
		return coords;
	}
	
	getGridItem(coords) {
		return this.body[coords.x][coords.y];
	}
	
	//if item is occupied returns false
	checkEmptyGridItem(gridItem) {
		
		if($(gridItem).data().occupied) return false;
		else return true;
		
	}
	
	displayGridItem(coords, color) {
		var gridItem = this.getGridItem(coords);
		
		$(gridItem).css({
			'background-color': color
		});
		
		//set grid item as occupied
		$(gridItem).data('occupied', true);
	}
};

class Snake {
	constructor(coords, length) {
		this.coords = [coords];
		
		this.direction = '';
		this.newDirections = [];
		
		this.snakeLength = length;
		this.color = 'black';		
	}
	
	updateCoords(newCoords) {
		if(!this.coords.length < this.snakeLength) {
			this.coords = this.coords.slice(0, this.snakeLength -1)
		}
		
		this.coords.unshift(newCoords);
	}
	
	updateDirection() {		
		switch(this.newDirections[0]) {
			//prevent turning straight around
			case 'up':
				if(this.direction != 'down') this.direction = this.newDirections[0];
				break;
			
			case 'down':
				if(this.direction != 'up') this.direction = this.newDirections[0];
				break;
			
			
			case 'left':
				if(this.direction != 'right') this.direction = this.newDirections[0];
				break;
			
			
			case 'right':
				if(this.direction != 'left') this.direction = this.newDirections[0];
				break;
		}
		
		//remove first direction from queue 
		this.newDirections = []
	}
	
	getNewCoords() {
		var newCoords;
			
			
		switch(this.direction) {
			case 'up':
				newCoords = new Coordinates(this.coords[0].x, this.coords[0].y - 1);				
				break;
				
			case 'down':
				newCoords = new Coordinates(this.coords[0].x, this.coords[0].y + 1);
				break;
				
			case 'left':
				newCoords = new Coordinates(this.coords[0].x -1, this.coords[0].y);
				break;
				
			case 'right':
				newCoords = new Coordinates(this.coords[0].x + 1, this.coords[0].y);
				break;
		}
		
		return newCoords;
	}
	
	updateLength() {
		this.snakeLength += 1
	}
	
	//Returns 0 if there are no bad collisions
	//Returns 1 if colliding with food
	//Returns 2 if colliding with self/wall
	checkCollisions(grid, foodCoords, newCoords) {
		if(this.checkCollidesWithSelf(newCoords) || this.checkCollidesWithWall(grid, newCoords)) return 2;
		else if(this.checkCollidesWithFood(foodCoords, newCoords)) return 1;
		else return 0;
	}
	
	//returns true if colliding with self
	checkCollidesWithSelf(newCoords) {
		//check each coordinate in the snake and compare with the new coords
		for(var i = 0; i < this.coords.length; i++) {
			if(this.coords[i].x == newCoords.x && this.coords[i].y == newCoords.y) return true
		}		
		return false;
	}
	
	//returns true if colliding with a wall
	checkCollidesWithWall(grid, newCoords) {
		var maxX = grid.length - 1;
		var maxY = grid[0].length - 1;
		
		if(0 > newCoords.x || newCoords.x > maxX || 0 > newCoords.y || newCoords.y > maxY) return true
		else return false;
	}
	
	//returns true if colliding with food
	checkCollidesWithFood(foodCoords, newCoords) {
		if(newCoords.x == foodCoords.x && newCoords.y == foodCoords.y) return true;
		else return false;
	}
	
};

class Food {
	constructor(coords) {
		this.coords = coords;
		this.color = 'yellow';		
	}	
};
