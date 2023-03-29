var playButtons = document.getElementsByClassName("container")
const SELECTIONS = ['Rock', 'Paper', 'Scissors']

for (var i = 0; i < playButtons.length; i++) {
	var button = playButtons[i]
	button.addEventListener('click', function(event) {
		var choice
		if (event.target.className === "container") {
			choice = event.target.children[1].innerText
		}
		else if (event.target.className === "text") {
			choice = event.target.innerText
		}
		makeSelection(choice)
	})
}

function makeSelection(selection) {
	const comSelection = SELECTIONS[Math.floor(Math.random() * 3)]
	const scoreboard = document.querySelectorAll('span')
	var guide = document.querySelector('.text-guide')
	roundResult = SELECTIONS.indexOf(selection) - SELECTIONS.indexOf(comSelection)
	if (roundResult === 2) {roundResult = -1}
		else if (roundResult === -2) {roundResult = 1}
	guide.innerText = 'You chose ' + selection + ', COM chose ' + comSelection
	if (roundResult === 0) {
		guide.innerText = guide.innerText + '. Draw.'
	} else if (roundResult === 1) {
		guide.innerText = guide.innerText + '. You win.'
		scoreboard[0].innerText = parseInt(scoreboard[0].innerText) + 1
	} else if (roundResult === -1) {
		guide.innerText = guide.innerText + '. COM win.'
		scoreboard[1].innerText = parseInt(scoreboard[1].innerText) + 1
	}

	console.log(scoreboard)
}