//
//    Object Constructor Functions
//    BootCamp at UNC Homework Assignment 5 - Trivia Game
//    September 30, 2017
//    Bo Slott
//
//   -----------------------------------------------------


//
//    Utilities Object Constructor Function
//
//      These are static functions
//
function Utilities () {
  this.shuffleArray = function(array) {
    var newArray = array;
    newArray.sort(function(a,b) {
      return 0.5-Math.random();
    });
    return newArray;
  };
  this.fullDisplay = function() {

  };
}

var utils = new Utilities();


//
//    QuestionList Object Constructor Function
//
function Question(quesStr, ansrOpts, corAnsrIndex) {
  this.quesStr = quesStr;
  this.ansrOpts = ansrOpts;
  this.corAnsr = ansrOpts[corAnsrIndex];

}

var questionList = [];

var gameQuestion1 = new Question ("What is Bo's name?", ["Bo", "George", "Not Bo", "Carl"], 0);
questionList.push(gameQuestion1);

var gameQuestion2 = new Question ("What is Bo's game?", ["Potatoes", "Trivia", "Not Potatoes", "Logistics"], 1);
questionList.push(gameQuestion2);

var gameQuestion3 = new Question ("Who is Bo's dame?", ["Carl", "George", "What's today?", "Not Carl"], 2);
questionList.push(gameQuestion3);

var gameQuestion4 = new Question ("What is Bo's fame?", ["Judo", "Pasta", "Curling", "Grilling"], 3);
questionList.push(gameQuestion4);


function TriviaGame(questions) {
  this.questions = questions; // An array of Question Objects
  this.userGuess = "";
  this.totCorAnsr = 0;
  this.totIncorAnsr = 0;
  this.curQues = 0;
  // this.shufQues = function() {
  //   this.questions.sort(function(a,b) {
  //     return 0.5-Math.random();
  //   });
  // };
  this.dispNxtQues = function() {

  };
  this.dispNxtQuesStr = function() {
    console.log(this.questions[0].quesStr);
    $("#liveQues").text(this.questions[0].quesStr);
  };
  this.dispNxtQuesAnsrOpts = function() {
    var labels = ["A: ", "B: ", "C: ", "D: "];
    var newUl = $("<ul></ul>");
    // var newRadio = $("<input />");
    // newRadio.html({
    //   "type":"radio",
    //   "name":"answerOptions",
    //   "value": this.questions[0].ansrOpts[j],
    // });
    for(var j=0; j<4; j++) {
      var newRadio = $("<input />");
      newRadio.attr({
        "type":"radio",
        "name":"answerOptions"
      });
      newRadio.addClass("radio-buttons");
      var newLi = $("<li></li>");
      newLi.html(newRadio);
      newLi.append(labels[j] + this.questions[0].ansrOpts[j]);
      newUl.append(newLi);
    }
    $("#liveAnsrOpts").append(newUl);

    $("#liveAnsrOpts").on("click", function() {
      this.userGuess = event.result;
      console.log("Guess = " + this.userGuess);
    });
  }
}

var game = new TriviaGame(questionList);

game.dispNxtQuesStr();
game.dispNxtQuesAnsrOpts();

for(var i=0; i<4; i++) {
  console.log(game.questions[0].ansrOpts[i]);
}

utils.shuffleArray(game.questions[0].ansrOpts);

for(var i=0; i<4; i++) {
  console.log(game.questions[0].ansrOpts[i]);
}
