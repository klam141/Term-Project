function main() {
	var container = $('#game');
	
	initGame(container);
}

function initGame(c) {
	c.html('');//empties the container
	
	initGrid(c);
	setGridStyle(c);
	
}

function initGrid(c) {
	var gridWidth = 25;
	var gridHeight = 15;
	
	
	for(var i = 0; i < gridHeight; i++) {
		//create rows
		c.append('<div class="row-box row-' + i + '"></div>');
		
		//create columns
		for(var j = 0; j < gridWidth; j++) {
			$('.row-' + i).append('<div class="col-box col-' + j + '"></div>');
			$('.col-' + j).css('display', 'inline-block');
		}
	}
	
	
}

function setGridStyle(c) {
	var boxWidth = '25px';
	
	var row = $('.row-box');
	var col = $('.col-box');
	
	//remove padding
	c.css({'padding': '0'});
	
	//organize boxes;
	//rows
	row.css({	
		'height': boxWidth
	});
	
	//columns
	col.css({
		'border':'1px solid black',
		
		'height': 'inherit',
		'width': boxWidth,
		
	});
}

$(function(){main()});