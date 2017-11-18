var gameArea;
var hangman;
var word;

function main() {
	initGame();
}

function initGame() {
	var container = $('#game');
	var width = 800;
	var height = 400;
	
	gameArea = new GameArea(container, width, height);
	
	gameArea.displaySplashScreen();
	
	setEvents();
}

function initRound() {
	gameArea.clear();
	
	var hangmanWidth = 120;
	hangman = new Hangman(gameArea.container, hangmanWidth);
	
	var gameWord = getRandomWord();
	wordAreaWidth = gameArea.width - hangman.width - 40 - 20;//40 is the padding, 20 is the border
	word = new Word(gameArea.container, wordAreaWidth, gameWord);
	
	displayAlphabet();
}


function setEvents() {
	setOverlayButtonEvent();
	
	setAlphabetEvents();
}

function setOverlayButtonEvent() {
	$(gameArea.container).on('click', '#gameButton', initRound);		
	
	//trigger button with enter/space
	$(gameArea.container).on('keydown', function(e) {
		if(e.keyCode == 13 | e.keyCode == 32) {
			e.preventDefault();
			var click = $.Event('click');
			$('#gameButton').trigger(click);
		}
	});
}

function setAlphabetEvents() {
	$(gameArea.container).on(
		'click',
		'.letterButton button',
		function() {
			//disable the button
			$(this).prop('disabled', true);
			$(this).css({'background-color': 'black'});
			
			checkLetter(this.name);
		}
	);
}


function getRandomWord() {
	var randNum = Math.floor(Math.random() * listOfWords.length);
	return listOfWords[randNum];
}

function displayAlphabet() {
	var alphabet = 'abcdefghijklmnopqrstuvwxyz';
	
	$(gameArea.container).append(
		'<div id="alphabet">' +
		'<div class="alphabetLine 1"></div>' +
		'<div class="alphabetLine 2"></div>' +
		'</div>');
	
	var currentLine = 1;
	for(var i = 0; i < alphabet.length; i++) {
		$('.alphabetLine.' + currentLine).append(
					'<div class="letterButton">' +
					'<button name="' + alphabet[i] + '">' + alphabet[i].toUpperCase() + '</button>' +
					'</div>'
		);
		
		if(alphabet.length / (i + 1) == 2) currentLine++;
	}
	
	styleAlphabet();
}

function styleAlphabet() {
	$('#alphabet').css({
		'display': 'flex',
		'align-content': 'space-between',
		'flex-wrap': 'wrap',
		'position': 'absolute',
		'bottom': 20,
		'left': 20,
		
		'width': 800 - 40 - 20,
		'height': 400 - 260 - 40 - 20
	});
	
	$('.alphabetLine').css({
		'display': 'flex',
		'flex': '0 0 auto',
		'justify-content': 'space-between',
		
		'width': '100%'
	});
	
	$('.letterButton').css({
		'flex': '1 0 0',
		
		'display': 'inline-block',
		
		'margin': '0 5px',
		'padding': 0,
		
		'height': 36
	});
	
	$('.letterButton button').css({
		'background-color': 'white',
		
		'line-height': '100%',
		
		'margin': 0,
		'padding':0,
		
		'width': '100%',
		'height': '100%'
	});
}


function checkLetter(letter) {
	if(word.checkWordContainsLetter(letter)) {
		if(word.checkAndDisplayWord(letter)) gameArea.displayGameOver(true);
	}
	else {
		if(!hangman.checkAndDisplayHangman()) gameArea.displayGameOver(false);
	}
}

$(function(){main()});