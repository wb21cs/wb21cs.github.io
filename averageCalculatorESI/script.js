let semesterSelectors = document.querySelector('#semester')
let inputFields = document.querySelectorAll('input')
let inputArea = document.querySelectorAll('.input-area')
// let semesterSelectors = document.querySelectorAll('.semester-selector')
let subjectAverageList = [] /*this array stores the average value of each subject*/
let rowLength = 4
let chosenSemester = 0	/*it's self-descriptive, i declared it to
						allow us access one of the subarrays
						inside the 'semesters' array.
						the user will make a selection
						to choose which semester's
						average that should be calculated*/

let semesters = [	/* this is an array containing
					all necessary information about
					the semesters in ESI-SBA
					for now it only has 1CP-S1 and 1CP-S2*/

	[	// 'index = 0' semeseter = S1 1CP
		{
			subjectAbr : 'ALSDS',
			subjectFactor : 5,
			subjectComponents : [2/9, 1/9, 1/3, 1/3]
		},
		{
			subjectAbr : 'ARCHI',
			subjectFactor : 4,
			subjectComponents : [5/10, 0, 2/10, 3/10]
		},
		{
			subjectAbr : 'SYS1',
			subjectFactor : 3,
			subjectComponents : [0, 5/10, 2/10, 3/10]
		},
		{
			subjectAbr : 'ANA1',
			subjectFactor : 5,
			subjectComponents : [1/3, 0, 1/3, 1/3]
		},
		{
			subjectAbr : 'ALG1',
			subjectFactor : 3,
			subjectComponents : [1/3, 0, 1/3, 1/3]
		},
		{
			subjectAbr : 'ELECT',
			subjectFactor : 3,
			subjectComponents : [1/3, 0, 1/3, 1/3]
		},
		{
			subjectAbr : 'TEE',
			subjectFactor : 2,
			subjectComponents : [0, 1/3, 1/3, 1/3]
		},
		{
			subjectAbr : 'BW',
			subjectFactor : 1,
			subjectComponents : [0, 1/3, 1/3, 1/3]
		}
	],
	[	// 'index = 1' semeseter = S2 1CP
		{
			subjectAbr : 'ALSDD',
			subjectFactor : 5,
			subjectComponents : [2/9, 1/9, 1/3, 1/3]
		},
		{
			subjectAbr : 'SYS2',
			subjectFactor : 3,
			subjectComponents : [0, 1/3, 1/3, 1/3]
		},
		{
			subjectAbr : 'ANA2',
			subjectFactor : 5,
			subjectComponents : [1/3, 0, 1/3, 1/3]
		},
		{
			subjectAbr : 'ALG2',
			subjectFactor : 3,
			subjectComponents : [1/3, 0, 1/3, 1/3]
		},
		{
			subjectAbr : 'MECA',
			subjectFactor : 3,
			subjectComponents : [1/3, 0, 1/3, 1/3]
		},
		{
			subjectAbr : 'ELECTRO',
			subjectFactor : 4,
			subjectComponents : [1/3, 0, 1/3, 1/3]
		},
		{
			subjectAbr : 'TEO',
			subjectFactor : 2,
			subjectComponents : [0, 1/3, 1/3, 1/3]
		},
		{
			subjectAbr : 'ANG1',
			subjectFactor : 2,
			subjectComponents : [0, 1/3, 1/3, 1/3]
		}
	]
]




updateDisplay(chosenSemester) /*this initiates the display*/
updateAverage(chosenSemester) /* this updates the average once in case if the grid is already filled automatically*/

semesterSelectors.addEventListener('change', () => {
		chosenSemester = semesterSelectors.value
		console.log(chosenSemester)
		updateDisplay(chosenSemester)
		console.log(inputFields)
	})/*this updates the display based on the semester selection of the user*/

function updateAverage(chosenSemester) {

  	for (let i = 0; i < (inputArea.length / rowLength); i++) {
		let subjectAverage = 0
		for (let j = 0; j < rowLength; j++) {
			if (inputArea[i*rowLength + j].children.length > 0) {
				if (inputArea[i*rowLength + j].children[0].value.length > 0) {
				subjectAverage += parseFloat(inputArea[i*rowLength + j].children[0].value)*semesters[chosenSemester][i].subjectComponents[j]
				}
			}
		}
		subjectAverageList[i] = parseFloat(subjectAverage)
	} /*this create an array containing the average of each subject*/


	let totalAverage = 0
	let sumFactors = 0
	for (let i = 0; i < subjectAverageList.length; i++) {
		totalAverage += subjectAverageList[i]*semesters[chosenSemester][i].subjectFactor
		sumFactors += semesters[chosenSemester][i].subjectFactor
	} /*this calculates the sum of all averages with their weight factor*/

	totalAverage = totalAverage / sumFactors
	document.querySelector('.average-value').innerText = totalAverage.toFixed(2)
}

function updateDisplay(chosenSemester){
	document.querySelector('.grid-container').innerHTML = `<div class="grid-element titles">MODULE</div>
			<div class="grid-element titles">TD</div>
			<div class="grid-element titles">TP</div>
			<div class="grid-element titles">EMD1</div>
			<div class="grid-element titles">EMD2</div>`

	for (let i = 0; i < semesters[chosenSemester].length; i++) {
		document.querySelector('.grid-container').innerHTML += `<div class="grid-element titles">${semesters[chosenSemester][i].subjectAbr}</div>`
		for (let j = 0; j < rowLength; j++) {
			if (semesters[chosenSemester][i].subjectComponents[j] === 0) {
				document.querySelector('.grid-container').innerHTML += `<div class="grid-element titles blank input-area">-</div>`
			}
			else {
				document.querySelector('.grid-container').innerHTML += `<div class="input input-area">
				<input type="number" min="0" max="20" step="0.25" placeholder="0" inputmode="numeric" name="">
				</div>`
			}
		}
	}

	document.querySelector('.grid-container').innerHTML += `<div class="average grid-element">Average</div>
			<div class="average average-value grid-element">0.00</div>`



	inputFields = document.querySelectorAll('input')
	inputArea = document.querySelectorAll('.input-area')


	inputFields.forEach((item) => {
		item.addEventListener("input", function() {
			updateAverage(chosenSemester)
			console.log('i')
		})
		item.addEventListener("keypress", function(e) {
			if (e.key === "Enter") {
				e.preventDefault()
				updateAverage(chosenSemester)
				console.log('updatedk')
			}
		})
	}) /*this allows the user to update the average after each input change or an 'enter' key press*/
}
