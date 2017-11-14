class GameArea {
	constructor(container, width, height) {
		this.container = container;
		this.width = width;
		this.height = height;

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
	
	//TODO
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
		this.snakeLength = 5;
		
		this.displaySnake(grid)
	}
	
	displaySnake(grid) {
		for(var i = 0; i < this.coords.length; i++) {
			$(grid[this.coords[i].x][this.coords[i].y]).css({
				'background-color': 'green'
			});
		}
	}
	
	//TODO	
	upDateCoords(newX, newY) {
		//if snake is max length remove end of snake
		if(!this.coords.length < this.snakeLength) {
			this.coords = this.coords.slice(0, this.snakeLength -1)
		}
		
		this.coords.unshift([this.newX, this.newY]);
	}
	
	//TODO
	move(direction) {
		switch(direction) {
			case 'up':
				updateCoords(this.coords[0].x, this.coords[0].y - 1)
				break;
				
			case 'down':
				updateCoords(this.coords[0].x, this.coords[0].y + 1)
				break;
				
			case 'left':
				updateCoords(this.coords[0].x - 1, this.coords[0].y)
				break;
				
			case 'right':
				updateCoords(this.coords[0].x + 1, this.coords[0].y)
				break;
		}
		
		displaySnake();
	}
	
	grow() {
		this.length += 1
	}
	
	//TODO
	checkCollisions() {
		
	}
};

function main() {	
	var gameArea = new GameArea($('#game'), 25, 15);
	var snake = new Snake(gameArea.getRandomCoords(), gameArea.grid);
}

function initGame(c) {
	
}




//style a box occupied by the snake
function setSnakeStyle(snakeBox) {
	console.log(snakeBox);
	snakeBox.css({
		'backgroundColor': 'green'	
	});
}




$(function(){main()});