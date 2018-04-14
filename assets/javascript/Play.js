// Onload - Check for user input
//    If button clicked - Start or Restart the Quiz 
//    If Answer option Selected - Check the answer if correct & then go to next question etc.

window.onload = function () {
	$(document).on('click', '.btn', startQuiz);
	$(document).on('click', '.option', checkAnswer);
};

// Object variable contains all the Questions & Options 
var questionBank = [
	{
		"Question": "What is the longest river in the United States?",
		"Options":
			[
				{
					"Text": "Colarado River",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				},
				{
					"Text": "Mississippi River",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				},
				{
					"Text": "Missouri River",
					"Value": "True",
					"Giffy": "assets/images/giphy2.gif",
				},
				{
					"Text": "Rio Grande River",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				}
			],
	},
	{
		"Question": "What state is bordered by Nebraska, Kansas, Oklahoma, New Mexico, Utah, and Wyoming?",
		"Options":
			[
				{
					"Text": "IDAHO",
					"Value": "False",
					"Giffy": "assets/images/giphy1A.gif",
				},
				{
					"Text": "MISSOURI",
					"Value": "False",
					"Giffy": "assets/images/giphy1A.gif",
				},
				{
					"Text": "TEXAS",
					"Value": "False",
					"Giffy": "assets/images/giphy1A.gif",
				},
				{
					"Text": "COLARADO",
					"Value": "True",
					"Giffy": "assets/images/giphy2A.gif",
				}
			],
	},
	{
		"Question": "Death Valley is located in what U.S. state?",
		"Options":
			[
				{
					"Text": "NEVADA",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				},
				{
					"Text": "UTAH",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				},
				{
					"Text": "CALIFORNIA",
					"Value": "True",
					"Giffy": "assets/images/giphy2.gif",
				},
				{
					"Text": "TEXAS",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				}
			],
	},
	{
		"Question": "What U.S. state boasts the following rivers: the Guadalupe, Trinity, Rio Grande, Brazos, and Colorado?",
		"Options":
			[
				{
					"Text": "CALIFORNIA",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				},
				{
					"Text": "OKLAHAMA",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				},
				{
					"Text": "TEXAS",
					"Value": "True",
					"Giffy": "assets/images/giphy2.gif",
				},
				{
					"Text": "COLARADO",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				}
			],
	},
	{
		"Question": "What is the smallest U.S. state?",
		"Options":
			[
				{
					"Text": "DELAWARE",
					"Value": "False",
					"Giffy": "assets/images/giphy1A.gif",
				},
				{
					"Text": "MARYLAND",
					"Value": "False",
					"Giffy": "assets/images/giphy1A.gif",
				},
				{
					"Text": "RHODE ISLAND",
					"Value": "False",
					"Giffy": "assets/images/giphy1A.gif",
				},
				{
					"Text": "MAINE",
					"Value": "True",
					"Giffy": "assets/images/giphy2A.gif",
				}
			],
	},
	{
		"Question": "What is the tallest mountain in the United States?",
		"Options":
			[
				{
					"Text": "Mount Hood",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				},
				{
					"Text": "Mount Rainer",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				},
				{
					"Text": "Mount McKinley",
					"Value": "True",
					"Giffy": "assets/images/giphy2.gif",
				},
				{
					"Text": "Mount Rushmore",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				}
			],
	},
	{
		"Question": "What is the largest city in US?",
		"Options":
			[
				{
					"Text": "Los Angeles",
					"Value": "False",
					"Giffy": "assets/images/giphy1A.gif",
				},
				{
					"Text": "New York",
					"Value": "True",
					"Giffy": "assets/images/giphy2A.gif",
				},
				{
					"Text": "Chicago",
					"Value": "False",
					"Giffy": "assets/images/giphy1A.gif",
				}
			],
	},
	{
		"Question": "What is the third largest city in US?",
		"Options":
			[
				{
					"Text": "Los Angeles",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				},
				{
					"Text": "Houston",
					"Value": "False",
					"Giffy": "assets/images/giphy1.gif",
				},
				{
					"Text": "Chicago",
					"Value": "True",
					"Giffy": "assets/images/giphy2.gif",
				}
			],
	}
]

//Counters used in Program
var timer = 31;
var totalQuestions = questionBank.length;
var curIndex = -1;
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;
var intervalID;


// Get the Object from Quesiton Bank array bsed on Question - THis function not used in the code - Just a reference//
function getObjByQuestion(obj, iQuestion) {
	return obj.filter(
		function (obj) {
			return obj.Question === iQuestion
		})
};

// Returns unique Option object from mutliple options Object when matched  the "Text" input property//
function getObjByText(obj, iText) {
	return obj.filter(
		function (obj) {
			return obj.Text === iText
		})
};

// Returns unique Option object from mutliple options Object when matched  the "Value" input property value//
function getObjByValue(obj, iValue) {
	return obj.filter(
		function (obj) {
			return obj.Value === iValue
		})
};



// Initial Quiz function to be executed when started or restarted over //
//rest previous DIVs if any to empty //
//reset the counters & start the index from 0 to fetch from Q1 through till end of question array //
//Execte fucntion to fetch next Question//
function startQuiz() {
	console.log("hi");
	$('.introContainer').empty();
	$('.countdownContainer').css("display", "block");
	$('.finalContainer').empty();
	curIndex = -1;
	correctCount = 0;
	incorrectCount = 0;
	unansweredCount = 0;
	getNextQuestion();
};


// This gets question from questionBank array & adds to html , increments index & sets the timer to 30 seconds and executes the countdown fucntion with 1sec interval//
// Also check if we reach end of array (i.e. questions) - If so display proper div & show restart button //
function getNextQuestion() {
	$('.resultContainer').empty()
	if (curIndex < totalQuestions - 1) {
		timer = 31
		curIndex++
		intervalID = setInterval(countDown, 1000);
		var newDiv = $('<div class="container">')
		var curQuestion = questionBank[curIndex]
		var eleQuestion = $('<p>').text("Q: " + questionBank[curIndex].Question)
		var eleOl = $('<ol type="A">')
		var eleList
		for (var j = 0; j < curQuestion.Options.length; j++) {
			eleList = $('<li class="option">').text(curQuestion.Options[j].Text)
			eleOl.append(eleList)
		}
		newDiv.append(eleQuestion).append(eleOl)
		$('.questionContainer').append($('<br>')).append(newDiv)
	} else {
		var newDiv = $('<div class="container">')
		var newh2 = $('<h2>').text("-- Here is how you did ---")
		var correctTag = $('<p>').text("Correct Answers: " + correctCount)
		var incorrectTag = $('<p>').text("Incorrect Answers: " + incorrectCount)
		var unansweredTag = $('<p>').text("Unanswered: " + unansweredCount)
		var newbtn = $('<button type="button" class="btn btn-warning">').text("Start Over?")
		newDiv.append(newh2).append(correctTag).append(incorrectTag).append(unansweredTag).append(newbtn)
		$('.finalContainer').append($('<br>')).append(newDiv)
		$('.countdownContainer').css("display", "none");
	}
};

// count down the timer value & send back the updated timer to html//
// Also check if time out reached and if so displays proper Div & Message & executes getnextQuestion fucntion//

function countDown() {
	timer--;
	$('#timer').text(timer)
	if (timer === 0) {
		clearInterval(intervalID)
		unansweredCount++
		var curObj = questionBank[curIndex].Options
		var correctOption = getObjByValue(curObj, "True")
		var newDiv = $('<div class="container">')
		var newh2 = $('<h2>').html("Time Out! The correct answer is: " + '<span id="green">' + correctOption[0].Text + '</span>')
		var newimg = $('<img class="img-responsive imgbox" src="' + "assets/images/timeout.gif" + '">')
		newDiv.append(newh2).append(newimg)
		$('.resultContainer').append($('<br>')).append(newDiv)
		$('.questionContainer').empty()
		setTimeout(getNextQuestion, 4000)
	}
};

// this is called when user selects the option button, check if the current selection value is correct or not. This is by storing the True or False for all options as object properties //
// if answer is correct , display the div tag with proper message as well GIF (GIF stored as property for each option object) //
function checkAnswer() {
	clearInterval(intervalID)
	var curObj = questionBank[curIndex].Options
	var curOption = getObjByText(curObj, $(this).text())
	var newDiv = $('<div class="container">')
	if (curOption[0].Value === "True") {
		correctCount++
		var newh2 = $('<h2>').text("Correct !!!");
	} else {
		incorrectCount++
		var correctOption = getObjByValue(curObj, "True")
		var newh2 = $('<h2>').html("Wrong! The correct answer is: " + '<span id="green">' + correctOption[0].Text + '</span>')
	}
	var newimg = $('<img class="img-responsive imgbox" src="' + curOption[0].Giffy + '">')
	newDiv.append(newh2).append(newimg)
	$('.resultContainer').append($('<br>')).append(newDiv)
	$('.questionContainer').empty()
	setTimeout(getNextQuestion, 4000)
};