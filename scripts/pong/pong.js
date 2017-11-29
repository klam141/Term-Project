var gameArea

function main() {
	initGame();
}

function initGame() {
	var container = $('#game');
	var gameWidth = 600;
	var gameHeight = 800;
	
	gameArea = new GameArea(container, gameWidth, gameHeight);
	
	gameArea.displaySplashScreen();
	
	setEvents();
	
	gameArea.container.focus();	
}



function setEvents() {
	setOverlayButtonEvent();
}

function setOverlayButtonEvent() {
	$(gameArea.container).on('click', '#gameButton', initRound);
}

$(main());