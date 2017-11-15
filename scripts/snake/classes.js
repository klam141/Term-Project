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
	}
	
	getRandomCoords(){
		var randX = Math.floor(Math.random() * (this.width - 1));
		var randY = Math.floor(Math.random() * (this.height - 1));
		
		var coords = {
			'x': randX,
			'y': randY
		}
		
		return coords;
	}
	
	displayGridItem(coords, color) {
		for(var i = 0; i < coords.length; i++) {
			var currentBox = this.grid[coords[i].x][coords[i].y];
			$(currentBox).css({
				'background-color': color
			});
		}
	}
};


class Snake {
	constructor(coords, length) {
		this.coords = [coords];
		this.direction = '';
		this.snakeLength = length;
		this.color = 'black';		
	}
	
	updateCoords(newCoords) {
		if(!this.coords.length < this.snakeLength) {
			this.coords = this.coords.slice(0, this.snakeLength -1)
		}
		
		this.coords.unshift(newCoords);
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
		
		if(new)
		
		return newCoords;
	}
	
	grow() {
		this.length += 1
	}
	
	//Returns true if there are no bad collisions
	checkCollisions(grid, newCoords) {
		if(this.checkCollidesWithSelf(newCoords) | this.checkCollidesWithWall(grid, newCoords)) return false;
		else return true;
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
	
};
