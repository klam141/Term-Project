var listOfWords = [
	//max letters in a word: 12
	'apple',
	'ping pong',
	'purple',
	'giraffe',
	'bananna',
	'javascript',
	'computer',
	'dog',
	'monkey',
	'snow',
	'potato',
	'over and out'
]

class GameArea {
	constructor(container, width, height) {
		this.container = container;
		this.width = width;
		this.height = height;
		
		this.styleContainer();
		
		this.clear();
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
			'<h1>Hangman</h1>' +
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

class Word {
	constructor(container, width, word) {
		this.word = word;
		this.wordToCheck = this.word.replace(/\s/g, '');//word without spaces
		
		this.width = width;
		
		this.guessedLetters = [];
		
		this.container = this.displayAndGetContainer(container);
		
		this.displayWord();		
	}
	
	displayAndGetContainer(c) {
		$(c).append(
			'<div id="word">' +
				
			'</div>'
		);
		
		return $('#word');
	}
	
	displayWord() {
		var wordCount = 1;
		
		$(this.container).append('<div class="word ' + wordCount + '"></div>');
		
		for(var i = 0; i < this.word.length; i++) {
			if(this.word[i] != ' ') {
				$('.word.' + wordCount).append(
					'<div class="letter ' + this.word[i] + '">' +
					this.word[i].toUpperCase() +
					'</div>'
				);
			}
			else {
				wordCount++;
				$(this.container).append('<div class="word ' + wordCount + '"></div>');
			}
		}
		
		this.styleWord()
	}
	
	styleWord() {
		$(this.container).css({
			'display': 'flex',
			'align-content': 'center',
			'flex-wrap': 'wrap',
			'justify-content': 'center',
			
			'position': 'absolute',
			'top': 20,
			'right':20,
			
			'width': this.width,
			'height':260
		});
		
		$('.word').css({
			'display': 'flex',
			'flex': '1 1 auto',
			'flex-wrap': 'wrap',
			'justify-content': 'space-evenly',
			
			'margin': '0 10px',
			
			//prevents short words from stretching to the entire page
			'max-width': this.word.length * 70
		});
		
		$('.letter').css({
			'border': '1px solid white',
			
			'display': 'inline-block',
			'flex': '1 1 0',	
			
			'color': 'black',
			'font-size': '25px',			
			'line-height': '100%',		
			
			'margin': '10px 0',
			'padding': '10px',
			
			'max-width': '50px',
			
			'user-select': 'none'
		});
	}
	
	//returns true if word is completed
	checkAndDisplayWord(letter) {
		this.showLetter(letter);
		
		this.guessedLetters.push(letter);
		
		var wordComplete = true;
		for(var i = 0; i < this.wordToCheck.length; i++) {
			if(this.guessedLetters.indexOf(this.wordToCheck[i]) == -1) wordComplete = false;
		}

		return wordComplete;
	}
	
	//returns true if the word contains the letter
	checkWordContainsLetter(letter) {		
		if(this.word.indexOf(letter) != -1) return true;
		else return false;
	}
	
	showLetter(letter) {
		
		for(var i = 0; i < this.word.length; i++) {
			if(letter == this.word[i]) {
				$('.' + this.word[i]).css({'color': 'white'});
			}
		}
	}
}

class Hangman {
	constructor(container, width) {
		this.color = 'white';
		this.width = width
		this.currentPart = 0;
		
		this.container = this.displayAndGetContainer(container);
		
		this.displayHangman();
	}
	
	displayAndGetContainer(c) {		
		$(c).append(
			'<div id="hangman">' +
			
			'</div>'
		);
		
		return $('#hangman');
	}
	
	displayHangman() {
		//must be even
		var lineWidth = 2;
		
		var gallowsWidth = this.width
		this.displayGallows();
		
		var stickFigureWidth = this.width / 2
		this.displayStickFigure();
		
		this.styleHangman(gallowsWidth, stickFigureWidth, lineWidth);
	}
	
	displayGallows() {
		$(this.container).append(
			'<div id="gallows">' +
			'<div class="gallowsPart noose"></div>' +
			'<div class="gallowsPart neck"></div>' +
			'<div class="gallowsPart body"></div>' +
			'<div class="gallowsPart base"></div>' +
			'</div>'
		);
	}
	
	displayStickFigure() {		
		$(this.container).append(
			'<div id="stickFigure">'+
			'<div class="stickFigurePart head"></div>' +
			'<div class="stickFigurePart body"></div>' +
			'<div class="stickFigurePart left arm"></div>' +
			'<div class="stickFigurePart right arm"></div>' +
			'<div class="stickFigurePart left leg"></div>' +
			'<div class="stickFigurePart right leg"></div>' +
			'</div>'
		);
	}
	
	styleHangman(gallowsWidth, stickFigureWidth, lineWidth) {
		$(this.container).css({
			'position': 'absolute',			
			'top': 20,
			'left': 20,
			
			'width': this.width,
			'height': 260,
		});
		
		$('#gallows').css({
			'position': 'absolute',			
			'top': 0,
			'left': 0,
			
			'width': gallowsWidth
		});
		
		$('#stickFigure').css({
			'position': 'absolute',
			//place at the bottom of the noose
			'top': gallowsWidth/4,
			'left': gallowsWidth*3/4 - stickFigureWidth/2,
			
			'width': stickFigureWidth
		});
		
		this.styleGallows(gallowsWidth, lineWidth);
		this.styleStickFigure(stickFigureWidth, lineWidth);
	}
	
	styleGallows(gallowsWidth, lineWidth) {
		
		$('.gallowsPart').css({
			'border': lineWidth + 'px solid ' + this.color,
			
			'position': 'absolute'
		});
		
		//area that touches the hangman
		$('.gallowsPart.noose').css({
			'top': 0,
			'left': gallowsWidth*3/4 - lineWidth,
			
			'width': 0,
			'height': gallowsWidth/4
		});
		
		//horizontal line at the top
		$('.gallowsPart.neck').css({
			'top': 0,
			'left': gallowsWidth/4 - lineWidth,
			
			'width': gallowsWidth/2,
			'height': 0
		});
		
		//vertical line
		$('.gallowsPart.body').css({
			'top': 0,
			'left': gallowsWidth/4 - lineWidth,
			
			'width': 0,
			'height': gallowsWidth*2
		});
		
		//horizontal line at bottom
		$('.gallowsPart.base').css({
			'top': gallowsWidth*2,
			'left': 0,
			
			'width': gallowsWidth,
			'height': 0
		});
		
	}
	
	styleStickFigure(stickFigureWidth, lineWidth) {		
		$('.stickFigurePart').css({
			'border': lineWidth + 'px solid ' + this.color,
			
			'position': 'absolute',
			
			'display': 'none'
		});
		
		//head
		$('.stickFigurePart.head').css({
			//place at the top
			'top': '0',
			
			//make a circle
			'border-radius': stickFigureWidth/2,
			'border-width': lineWidth*2 + 'px',
			'width': stickFigureWidth,
			'height': stickFigureWidth
		});
		
		//body
		$('.stickFigurePart.body').css({
			//place at the bottom middle of the head
			'top': stickFigureWidth,
			'left': (stickFigureWidth/2) - lineWidth,
			
			'width': 0,
			'height': stickFigureWidth,
		});
		
		//arms
		$('.stickFigurePart.arm').css({
			'top': stickFigureWidth,
			
			'width': stickFigureWidth/2,
			'height':0
		});
		
		//legs
		$('.stickFigurePart.leg').css({
			//start at the bottom of the body
			'top': stickFigureWidth*2 + stickFigureWidth/5,
			
			//make legs 45deg angle
			'width': stickFigureWidth/2,
			'transform': 'skew(22.5deg, -45deg)'
		});
		
		$('.right.leg').css({
			//fix right leg
			'transform': 'skew(-22.5deg, 45deg)'
		});
		
		//left limbs
		$('.stickFigurePart.left').css({
			'left': 0,
		});
		
		//right limbs
		$('.stickFigurePart.right').css({
			'right': 0
		});		
	}
	
	checkAndDisplayHangman() {
		this.displayHangmanPart();
		
		//return true if guesses are still available
		if(this.currentPart < $('#stickFigure > div').length - 1) {
			this.currentPart++
			return true;
		}
		else return false;
	}
	
	displayHangmanPart() {
		var currentPart = $('.stickFigurePart');
		$(currentPart[this.currentPart]).show();
	}
	
	
}