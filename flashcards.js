var inquirer = require("inquirer");
var fs = require("fs");
var BasicCard = require("./basic-card.js");
var ClozeCard = require("./cloze-card.js");
var basicCards = [];
var clozeCards = [];

// New flashcard creation
function newCard() {
  inquirer.prompt([
    {
      name: "chooseCard",
      message: "\nWelcome to the Flashcards Generator!\nPress 1 to create basic flashcards\nPress 2 to create flashcards where you can fill in the blanks"
    }
  ]).then(function(answers){
    if (answers.chooseCard === "1") {
      basicCard();
    } else if (answers.chooseCard === "2") {
      clozeCard();
    }
  });
};

// Basic flashcard creation
function basicCard() {
  inquirer.prompt([
    {
      name: "front",
      message: "\nYou will now create a new basic flashcard.\nPlease enter a question you would like to put on the front of the flashcard:"
    },
    {
      name: "back",
      message: "\nThank you. Now enter the answer you would like to put on the back of the flashcard:"
    },
    {
      name: "choice",
      message: "\nYour flashcard has been created!\nPress 1 to create a new flashcard\nPress 2 to start going through the card deck"
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
  inquirer.prompt([
    {
      name: "text",
      message: "\nYou will now create a new fill-in-the-blank flashcard.\nPlease enter the full text you would like on the flashcard:"
    },
    {
      name: "cloze",
      message: "\nThank you. Now enter the part of the above text that goes in the blank:"
    },
    {
      name: "choice",
      message: "\nYour flashcard has been created\nPress 1 to create a new flashcard\nPress 2 to start going through the card deck"
    }
  ]).then(function(answers){
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
function startBasic() {
  for (i = 0; i < basicCards.length; i++) {
    console.log("\nQUESTION: " + basicCards[i].front);
    console.log("\nANSWER: " + basicCards[i].back);
  }
};

// Start going through the cloze-deleted flashcards
function startCloze() {
  for (i = 0; i < clozeCards.length; i++) {
    console.log("\nQUESTION: " + clozeCards[i].partial);
    console.log("\nANSWER: " + clozeCards[i].cloze);
  }
};

// Begin prompt
newCard();
