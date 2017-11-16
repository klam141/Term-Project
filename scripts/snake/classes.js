class GameArea {
	constructor(container, width, height) {
		this.container = container;
		this.width = width;
		this.height = height;
		this.color = 'green';

		this.grid = this.displayAndGetGrid();
	}
	
	displayAndGetGrid() {
		this.initGrid();
		
		this.styleGrid();
		
		return this.getGrid();
	}
	
	initGrid() {
		this.container.html('');//empties the container
		
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
		var boxWidth = '25px';
	
		var row = $('.row-box');
		var col = $('.col-box');
		
		//remove padding and inline-block blank space
		this.container.css({
			'font-size': '0',
			
			'padding': '0'	
		});
		
		//organize boxes;
		//columns
		col.css({	
			'display': 'inline-block',
		
			'width': boxWidth
		});
		
		//rows
		row.css({
			'background-color': this.color,
			
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
	
	clearGrid() {
		$('.row-box').css({
			'background-color': this.color
		});
		
		$('row-box').data('occupied', false);
	}
	
	//gets a random set of coordinates that arent already occupied
	getRandomCoords(){			
		do {
			var randX = Math.floor(Math.random() * (this.width));
			var randY = Math.floor(Math.random() * (this.height));
			
			var coords = {
			'x': randX,
			'y': randY
			}
			
			//if the area is not empty is isnt valid
		} while (!this.checkEmptyGridItem(this.getGridItem(coords)));
		
		
		
		return coords;
	}
	
	getGridItem(coords) {
		return this.grid[coords.x][coords.y];
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
		this.newDirections.shift();
	}
	
	getNewCoords() {
		var newCoords;
			
			
		switch(this.direction) {
			case 'up':
				newCoords = {
					'x': this.coords[0].x, 
					'y': this.coords[0].y - 1
				}
				
				break;
				
			case 'down':
				newCoords = {
					'x': this.coords[0].x, 
					'y': this.coords[0].y + 1
				}
				
				break;
				
			case 'left':
				newCoords = {
					'x': this.coords[0].x - 1,
					'y': this.coords[0].y
				}
				
				break;
				
			case 'right':
				newCoords = {
					'x': this.coords[0].x + 1,
					'y': this.coords[0].y
				}
				
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
		if(this.checkCollidesWithSelf(newCoords) | this.checkCollidesWithWall(grid, newCoords)) return 2;
		else if(this.checkCollidesWithFood(foodCoords, newCoords)) return 1;
		else return 0;
	}
	
	//returns true if colliding with self
	checkCollidesWithSelf(newCoords) {
		//check each coordinate in the snake and compare with the new coords
		for(var i = 0; i < this.coords.length; i++) {
			if(this.coords[i].x == newCoords.x & this.coords[i].y == newCoords.y) return true
		}		
		return false;
	}
	
	//returns true if colliding with a wall
	checkCollidesWithWall(grid, newCoords) {
		var maxX = grid.length - 1;
		var maxY = grid[0].length - 1;
		
		if(0 > newCoords.x | newCoords.x > maxX | 0 > newCoords.y | newCoords.y > maxY) return true
		else return false;
	}
	
	//returns true if colliding with food
	checkCollidesWithFood(foodCoords, newCoords) {
		if(newCoords.x == foodCoords.x & newCoords.y == foodCoords.y) return true;
		else return false;
	}
	
};

class Food {
	constructor(coords) {
		this.coords = coords;
		this.color = 'yellow';		
	}
	
	getNewCoords(coords) {
		
	}
	
};
