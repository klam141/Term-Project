class GameArea {
	constructor(container, width, height) {
		this.container = container;
		this.width = width;
		this.height = height;
		this.color = 'white';

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
};


class Snake {
	constructor(coords, grid) {
		this.coords = [coords];
		this.direction = '';
		this.snakeLength = 5;
		this.color = 'green';
		
		this.displaySnake(grid);
	}
	
	displaySnake(grid) {
		for(var i = 0; i < this.coords.length; i++) {
			$(grid[this.coords[i].x][this.coords[i].y]).css({
				'background-color': this.color
			});
		}
	}	
	
	updateCoords(newX, newY) {
		var newCoords = {'x': newX, 'y': newY};
		console.log(newCoords);
		
		if(this.checkCollisions(newCoords)) {
			//if snake is max length remove end of snake
			if(!this.coords.length < this.snakeLength) {
				this.coords = this.coords.slice(0, this.snakeLength -1)
			}
			
			this.coords.unshift(newCoords);
		}
	}	
	
	updateAndDisplayLocation(grid) {
		this.move();
		this.displaySnake(grid);
	}
	
	move() {
		switch(this.direction) {
			case 'up':
				this.updateCoords(this.coords[0].x, this.coords[0].y - 1)
				break;
				
			case 'down':
				this.updateCoords(this.coords[0].x, this.coords[0].y + 1)
				break;
				
			case 'left':
				this.updateCoords(this.coords[0].x - 1, this.coords[0].y)
				break;
				
			case 'right':
				this.updateCoords(this.coords[0].x + 1, this.coords[0].y)
				break;
		}		
	}
	
	grow() {
		this.length += 1
	}
	
	//Returns true if there are no bad collisions
	checkCollisions(newCoords) {
		console.log(this.coords.includes(newCoords));
		console.log(this.checkCollidesWithWall());
		//check if snake collides with itself
		if(this.coords.includes(newCoords)) return false;
		else if(this.checkCollidesWithWall()) return false;
		else return true;
	}
	
	//returns true if colliding with a wall
	checkCollidesWithWall() {		
		var maxX = gameArea.width - 1;
		var maxY = gameArea.height - 1;
		console.log(this.coords[0].x, this.coords[0].y);
		
		if(0 > this.coords[0].x > maxX) return true
		else if(0 > this.coords[0].y > maxY) return true
		else return false;
	}
	
};
