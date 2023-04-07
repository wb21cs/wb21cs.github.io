let inputFields = document.querySelectorAll('input')
let inputArea = document.querySelectorAll('.input-area')
let subjectAverageList = [] // this array stores the average value of each subject
let rowLength = 4
let chosenSemester = 0	/*it's self-descriptive, i declared it to
						allow us access one of the subarrays
						inside the 'semesters' array.
						in the future updates, i'll make a selection
						feature to choose which semester's
						average should be calculated*/

let semesters = [	/* this is an array containing
					all necessary information about
					the semesters in ESI-SBA
					for now it only has 1CP-S1*/

	[	// semeseter = S1 1CP
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
	]
]





updateAverage() /* this updates the average once in case if the
				grid is already filled automatically*/

inputFields.forEach((item) => {
	item.addEventListener("input", updateAverage)
	item.addEventListener("keypress", function(e) {
		if (e.key === "Enter") {
			e.preventDefault()
			updateAverage()
		}
	})
}) /*this allows the user to update the average after each input
	change or an 'enter' key press*/

function updateAverage(e) {

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
	} // this create an array containing the average of each subject


	let totalAverage = 0
	let sumFactors = 0
	for (let i = 0; i < subjectAverageList.length; i++) {
		totalAverage += subjectAverageList[i]*semesters[chosenSemester][i].subjectFactor
		sumFactors += semesters[chosenSemester][i].subjectFactor
	} // this calculates the sum of all averages with their weight factor

	totalAverage = totalAverage / sumFactors
	document.querySelector('.average-value').innerText = totalAverage.toFixed(2)
}

