class GameArea {
	constructor(container, width, height) {
		this.container = container;
		this.width = width;
		this.height = height;
		
		this.styleContainer();
		
		this.clear();
		
		this.body = new GameBody(this.container);
	}
	
	styleContainer() {
		$(this.container).css({
			'background-color': 'black',
			
			'color': 'white',
		
			'height': this.height,
			'width': this.width
		});
	}
	
	displaySplashScreen() {	
		this.container.append(
			'<div id="overlay">' +
			'<h1>Pong</h1>' +
			'<button id="gameButton">Play</button>' +
			'</div>'
		);
		
		this.styleOverlay();
	}
	
	displayGameOver(gameWon) {
		var outputText = '<div id="overlay">'
		
		
		if(gameWon) outputText += '<h1>You Win</h1>';
		else outputText += '<h1>You Lose</h1>';
		
		outputText += '<button id="gameButton">Play Again</button></div>'
		
		this.container.append(outputText);
		
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
			
			'padding': '150px 0',
			
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
	
	clear() {
		this.container.html('');
	}
};

class GameBody {
	constructor(container) {
		this.container = container;
		this.color = 'white';
		this.score = {'left': 0, 'right': 0}
		
		this.gameBoard = this.displayAndGetGameBody();		
	}
	
	displayAndGetGameBody() {
		this.displayGameBody();
		this.styleGameBody();
		
		return $('#gameBoard');
	}
	
	displayGameBody() {
		var c = $(this.container);
		
		c.append(
			'<div id="scoreBoard"></div>'
		);
		this.displayScore();
		
		c.append(
			'<div id="gameBoard"></div>'
		);
	}
	
	styleGameBody() {
		$('#scoreBoard').css({
			'border-bottom': '4px solid ' + this.color,
			
			'height': '10%'
		});
		$('.score').css({
			'display': 'inline-block',
			'float': 'none',
			
			'font-size':'2em',
			'textAlign': 'center'
		});
		
		
		$('#gameBoard').css({
			'height': '90%'
		});
		
		$('#game .left').css({
			'border-right': '2px dashed ' + this.color,
			
			'width': '50%'
		});
		$('#game .right').css({
			'border-left': '2px dashed ' + this.color,
			'width': '50%'
		});
		
		
	}
	
	displayScore() {
		var scoreBoard = $('#scoreBoard')
		
		scoreBoard.html('');
		
		scoreBoard.append('<div class="left score"></div>');
		scoreBoard.append('<div class="right score"></div>');
		
		$('.left.score').append('<h1>' + this.score['left'] + '</h1>');
		$('.right.score').append('<h1>' + this.score['right'] + '</h1>');		
	}
}