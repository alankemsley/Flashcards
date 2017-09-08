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
      message: "Press B for basic flashcards\nPress C for cloze-deleted flashcards"
    }
  ]).then(function(answers){
    if (answers.chooseCard === "b") {
      basicCard();
    } else if (answers.chooseCard === "c") {
      clozeCard();
    }
  });
};

// Basic flashcard creation
function basicCard() {
  inquirer.prompt([
    {
      name: "front",
      message: "Please enter text for the front of the flashcard:"
    },
    {
      name: "back",
      message: "Please enter text for the back of the flashcard:"
    },
    {
      name: "choice",
      message: "Flashcard has been created\nPress N to create a new flashcard\nPress S to start going through the card deck"
    }
  ]).then(function(answers) {
    var basic = new BasicCard(answers.front, answers.back);
    basicCards.push(basic);
    if (answers.choice === "n") {
      basicCard();
    } else if (answers.choice === "s") {
      startBasic();
    }
  });
};

// Cloze-deleted flashcard creation
function clozeCard() {
  inquirer.prompt([
    {
      name: "text",
      message: "Please enter full text for the flashcard:"
    },
    {
      name: "cloze",
      message: "Please enter the text that goes in the blank:"
    }
  ]).then(function(answers1) {
    if (!answers.text.inludes(answers1.cloze)) {
      inquirer.prompt([
        {
          name: "error",
          message: "Error: Entered text must be part of the full text of the flashcard\nPress C to redo this cloze-deleted flashcard"
        }
      ]).then(function(answers1) {
        clozeCard();
      })
    } else {
      inquirer.prompt([
        {
          name: "choice",
          message: "Flashcard has been created\nPress N to create a new flashcard\nPress S to start going through the card deck"
        }
      ]).then(function(answers2){
        var cloze = new ClozeCard(answers1.text, answers1.cloze);
        clozeCards.push(cloze);
        if (answers2.choice === "n") {
          clozeCard();
        } else if (answers2.choice === "s") {
          startCloze();
        }
      });
    }
  });
};

// Start going through the basic flashcards


// Start going through the cloze-deleted flashcards


// Begin prompt
newCard();
