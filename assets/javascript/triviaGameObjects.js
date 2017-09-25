//
//    Object Constructor Functions
//    BootCamp at UNC Homework Assignment 5 - Trivia Game
//    September 30, 2017
//    Bo Slott
//
//   -----------------------------------------------------


//
//    QuestionList Object Constructor Function
//
function Question(quesStr, corAnsrOpts, corAnsrIndex) {
  this.quesStr = quesStr;
  this.ansrOpts = corAnsrOpts;
  this.corAnsr = corAnsrOpts[corAnsrIndex];
  // this.shufQues = function() {
  //     this.corAnsrOpts.sort(function(a,b) {
  //       return 0.5 - Math.random();
  //     });
  };
}

var questionList = [];

var gameQuestion1 = new Question {"What is Bo's name", ["Bo", "George", "Not Bo", "Carl"], 0};
questionList.push(gameQuestion1);

var gameQuestion2 = new Question {"What is Bo's game", ["Potatoes", "Trivia", "Not Potatoes", "Logistics"], 1};
questionList.push(gameQuestion2);

var gameQuestion3 = new Question {"Who is Bo's dame", ["Carl", "George", "What's today?", "Not Carl"], 2};
questionList.push(gameQuestion3);

var gameQuestion4 = new Question {"What is Bo's fame", ["Judo", "Pasta", "Curling", "Grilling"], 3};
questionList.push(gameQuestion4);
