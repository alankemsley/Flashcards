var inquirer = require("inquirer");
var fs = require("fs");
var BasicCard = require("./basic-card.js");
var ClozeCard = require("./cloze-card.js");
var basicCards = [];
var clozeCards = [];

// New flashcard creation
function newCard() {
  inquirer.prompt([{
    name: "chooseCard",
    message: "\nWelcome to the Flashcards Generator!\nPress 1 to create basic flashcards\nPress 2 to create flashcards where you can fill in the blanks\n"
  }]).then(function(answers) {
    if (answers.chooseCard === "1") {
      basicCard();
    } else if (answers.chooseCard === "2") {
      clozeCard();
    }
  });
};

// Basic flashcard creation
function basicCard() {
  inquirer.prompt([{
      name: "front",
      message: "\nYou will now create a new basic flashcard.\nPlease enter a question you would like to put on the front of the flashcard:\n"
    },
    {
      name: "back",
      message: "\nThank you. Now enter the answer you would like to put on the back of the flashcard:\n"
    },
    {
      name: "choice",
      message: "\nYour flashcard has been created!\nPress 1 to create a new flashcard\nPress 2 to start going through the card deck\n"
    }
  ]).then(function(answers) {
    var basic = new BasicCard(answers.front, answers.back);
    basicCards.push(basic);
    if (answers.choice === "1") {
      basicCard();
    } else if (answers.choice === "2") {
      startBasic();
    }
  });
};

// Cloze-deleted flashcard creation
function clozeCard() {
  inquirer.prompt([{
      name: "text",
      message: "\nYou will now create a new fill-in-the-blank flashcard.\nPlease enter the full text you would like on the flashcard:\n"
    },
    {
      name: "cloze",
      message: "\nThank you. Now enter the part of the above text that goes in the blank:\n"
    },
    {
      name: "choice",
      message: "\nYour flashcard has been created\nPress 1 to create a new flashcard\nPress 2 to start going through the card deck\n"
    }
  ]).then(function(answers) {
    var cloze = new ClozeCard(answers.text, answers.cloze);
    clozeCards.push(cloze);
    if (answers.choice === "1") {
      clozeCard();
    } else if (answers.choice === "2") {
      startCloze();
    }
  });
};

// Start going through the basic flashcards
var startBasic = function() {
  numberOfBasicCards = basicCards.length;
  counter = 0;
  flipBasic();
}

var flipBasic = function() {
  if (counter < numberOfBasicCards) {
    console.log(basicCards[counter].front);
    inquirer.prompt([{
      type: "list",
      name: "getAnswer",
      message: "Would you like to flip the flashcard over?",
      choices: ["yes", "no"]
    }]).then(function(answers) {
      if (answers.getAnswer === "yes") {
        console.log(basicCards[counter].back);
        counter++;
        flipBasic();
      }
    });
  }
};

// Start going through the cloze-deleted flashcards
var startCloze = function() {
  numberOfClozeCards = clozeCards.length;
  counter = 0;
  flipCloze();
}

var flipCloze = function() {
  if (counter < numberOfClozeCards) {
    console.log(clozeCards[counter].partial);
    inquirer.prompt([{
      type: "list",
      name: "getAnswer",
      message: "Would you like to flip the flashcard over?",
      choices: ["yes", "no"]
    }]).then(function(answers) {
      if (answers.getAnswer === "yes") {
        console.log(clozeCards[counter].cloze);
        counter++;
        flipCloze();
      }
    });
  }
};

// Begin prompt
newCard();
