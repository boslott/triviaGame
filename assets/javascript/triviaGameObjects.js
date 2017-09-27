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


var gameBoardAttrs = [{
    className:"question-display-row",
    spanId:"liveQues"
  },
  {
    className:"answer-options-display-row",
    spanId:"liveAnsrOpts"
  },
  {
    className:"buttons-display-row",
    spanId:"gamePlayBtns"
  }
];

var gameOverAttrs = [{
  className:"game-over-header-row",
  spanId:"gameOverHeader"
},
{
  className:"game-over-body-row",
  spanId:"gameOverBody"
},
{
  className:"game-over-btns-row",
  spanId:"gameOverBtns"
}];


function TriviaGame(questions) {
  this.questions = questions; // An array of Question Objects
  this.userGuess = "";
  this.totCorAnsr = 0;
  this.totIncorAnsr = 0;
  this.curQuesIndex = 0;
  this.clock = "";

  //
  //  TriviaGame Methods
  //
  this.gameOn = function(gameObj) {
    var gameObj = gameObj;
    // $("#gameBoardSwitch").show();
    // for(var i=0; i<this.questions.length; i++) {
        this.next(gameObj);


  };
  this.next = function(gameObj) {
    var gameObj = gameObj;
      gameObj.renderGameBoard(gameBoardAttrs);
      gameObj.dispNxtQues(gameObj);
      gameObj.questionResults(gameObj);
      gameObj.dispClock(8, gameObj);

  };

  this.renderGameBoard = function(attrObj) {
    // $("#liveQues").empty();
    // $("#liveAnsrOpts").empty();
    $("#gameBoardSwitch").empty();
    $(".ansrDisplay").empty();

    var gbRows = attrObj;

    for(var i=0; i<gbRows.length; i++) {
      var newRow = $("<div></div>");
      newRow.addClass("row").addClass(gbRows[1].className);

      var newSpan = $("<span></span>");
      newSpan.attr("id", gbRows[i].spanId);

      var newP = $("<p></p>");
      newP.append(newSpan);

      newRow.append(newP);

      $("#gameBoardSwitch").append(newRow);
    }
  };
  this.dispNxtQues = function(gameObj) {
    var gameObj = gameObj;
    gameObj.dispNxtQuesStr(gameObj);
    gameObj.dispNxtQuesAnsrOpts(gameObj);
    gameObj.dispAnsrSubmit(gameObj);
  };
  this.dispNxtQuesStr = function(gameObj) {
    var gameObj = gameObj
    $("#liveQues").text(gameObj.questions[gameObj.curQuesIndex].quesStr);
  };
  this.dispNxtQuesAnsrOpts = function(gameObj) {
    var gameObj = gameObj;
    var newUl = $("<ul></ul>");
    for(var i=0; i<4; i++) {
      var newRadio = $("<input />");
      newRadio.attr({
        "type":"radio",
        "name":"answerOptions",
        "value": this.questions[this.curQuesIndex].ansrOpts[i]
      });

      var newLi = $("<li></li>");
      newLi.html(newRadio);
      newLi.append(this.questions[this.curQuesIndex].ansrOpts[i]);

    newUl.append(newLi);
    }
    $("#liveAnsrOpts").append(newUl);

    $("#liveAnsrOpts").on("click", function() {
      var selectedVal = "";
      var selected = $("input[type='radio'][name='answerOptions']:checked");
      if (selected.length > 0) {
        gameObj.userGuess = selected.val();
      }
    });
  };
  this.dispAnsrSubmit = function(gameObj) {
    var gameObj = gameObj
    var btn = $("<button></button>");
    btn.attr("id","ansrSubBtn");
    btn.text("Click It Here");
    $("#gamePlayBtns").append(btn);
  };
  this.questionResults = function(gameObj) {
    var gameObj = gameObj;
    $("#ansrSubBtn").on("click", function() {
      if(gameObj.compareAnsr(gameObj)) {
        gameObj.quesRight(gameObj);
      } else {
        gameObj.quesWrong(gameObj);
      }
    });
  };
  this.compareAnsr = function(game) {
    var gameObj = game;
    if(gameObj.userGuess == gameObj.questions[gameObj.curQuesIndex].corAnsr) {
      return true;
    } else {
      return false;
    }
  };
  this.quesRight = function(gameObj) {
    var gameObj = gameObj;
    clearInterval(gameObj.clock);
    $("#timer").empty();
    gameObj.renderAnsrDisplay(gameObj);
    gameObj.ansrDispCorrect(gameObj);
    gameObj.totCorAnsr++;
    gameObj.curQuesIndex++;
    if(gameObj.curQuesIndex<gameObj.questions.length) {
      setTimeout(gameObj.next, 2000, gameObj);
    } else {
      setTimeout(gameObj.gameOver, 2000, gameObj);
    }
  };
  this.quesWrong = function(gameObj) {
    var gameObj = gameObj;
    clearInterval(gameObj.clock);
    $("#timer").empty();
    gameObj.renderAnsrDisplay(gameObj);
    gameObj.ansrDispIncorrect(gameObj);
    gameObj.totIncorAnsr++;
    gameObj.curQuesIndex++;
    if(gameObj.curQuesIndex<gameObj.questions.length) {
      setTimeout(gameObj.next, 2000, gameObj);
    } else {
      setTimeout(gameObj.gameOver, 2000, gameObj);
    }
  };
  this.renderAnsrDisplay = function() {
    $("#gameBoardSwitch").empty();

    var container = $("<div></div>");
    container.addClass("row ansrDisplay");

    var row1 = $("<div></div>");
    row1.addClass("row");

    var newSpan1 = $("<span></span>");
    newSpan1.attr("id","ansrDispHeader");

    var newP1 = $("<p></p>");
    newP1.append(newSpan1);

    row1.append(newP1);

    var row2 = $("<div></div>");
    row2.addClass("row");

    var newSpan2 = $("<span></span>");
    newSpan2.attr("id","ansrDispAnsr");

    var newP2 = $("<p></p>");
    newP2.append(newSpan2);

    row2.append(newP2);

    container.append(row1).append(row2);

    $("#gameBoard").append(container);
  };
  this.ansrDispCorrect = function(gameObj) {
    var gameObj = gameObj;
    $("#ansrDispHeader").text("Good Job You Oh You!");
    $("#ansrDispAnsr").text("The Answer is: " + gameObj.questions[gameObj.curQuesIndex].corAnsr);
  };
  this.ansrDispIncorrect = function(gameObj) {
    var gameObj = gameObj;
    $("#ansrDispHeader").text("Oh No! That's Completely and Utterly Wrong, You Poor Thing You");
    $("#ansrDispAnsr").text("The Answer is: " + gameObj.questions[gameObj.curQuesIndex].corAnsr);
  };
  this.gameOver = function(gameObj) {
    var gameObj = gameObj;
    clearInterval(gameObj.clock);
    $("#timer").empty();
    gameObj.renderGameBoard(gameOverAttrs);
    gameObj.renderGameOver(gameObj);
  };
  this.renderGameOver = function(gameObj) {
    var gameObj = gameObj;
    $("#gameOverHeader").text("Game Over");
    var newUl = $("<ul></ul>");
    var newLi = $("<li></li>").text("Total Correct: " + gameObj.totCorAnsr);
    newUl.append(newLi);
    var newLi2 = $("<li></li>").text("Total Incorrect: " + gameObj.totIncorAnsr);
    newUl.append(newLi2);
    $("#gameOverBody").html(newUl);
  };
  this.dispClock = function(quesTime, gameObj) {
    var quesTime = quesTime;
    var gameObj = gameObj;
    $("#timer").text(quesTime + " seconds left ...");
    quesTime--;
    gameObj.clock = setInterval(function(){
      $("#timer").text(quesTime + " seconds left ...");
      quesTime--;
    }, 1000);
  };
}

var game = new TriviaGame(questionList);

game.gameOn(game);
