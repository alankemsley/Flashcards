var inquirer = require("inquirer");
var fs = require("fs");
var BasicCard = require("./basic-card.js");
var ClozeCard = require("./cloze-card.js");
var basicCards = [];
var clozeCards = [];

// New flashcard creation
function newCard() {
  inquirer.prompt([{
    type: "list",
    name: "chooseCard",
    message: "\n***FLASHCARDS GENERATOR***\nWould you like to create BASIC FLASHCARDS or FILL-IN-THE-BLANK FLASHCARDS?\n",
    choices: ["BASIC FLASHCARDS", "FILL-IN-THE-BLANK FLASHCARDS"]
  }]).then(function(response) {
    if (response.chooseCard === "BASIC FLASHCARDS") {
      basicCard();
    } else if (response.chooseCard === "FILL-IN-THE-BLANK FLASHCARDS") {
      clozeCard();
    }
  });
};

// Basic flashcard creation
function basicCard() {
  inquirer.prompt([{
      name: "front",
      message: "\n***NEW BASIC FLASHCARD***\nSTEP 1: Please enter a QUESTION you would like to put on the FRONT of the flashcard:\n"
    },
    {
      name: "back",
      message: "\nSTEP 2: Please enter the ANSWER you would like to put on the BACK of the flashcard:\n"
    },
    {
      type: "list",
      name: "choice",
      message: "\n***FLASHCARD CREATED***\n\nWould you like to CREATE ANOTHER FLASHCARD or BEGIN REVISION?\n",
      choices: ["CREATE ANOTHER FLASHCARD", "BEGIN REVISION"]
    }
  ]).then(function(response) {
    var basic = new BasicCard(response.front, response.back);
    basicCards.push(basic);
    if (response.choice === "CREATE ANOTHER FLASHCARD") {
      basicCard();
    } else if (response.choice === "BEGIN REVISION") {
      startBasic();
    }
  });
};

// Cloze-deleted flashcard creation
function clozeCard() {
  inquirer.prompt([{
      name: "text",
      message: "\n***FILL-IN-THE-BLANK FLASHCARD***\nSTEP 1: Please enter the FULL TEXT you would like on the FRONT of the flashcard:\n"
    },
    {
      name: "cloze",
      message: "\nSTEP 2: Please enter the part of the above text that goes in the BLANK on the back of the flashcard:\n"
    },
    {
      type: "list",
      name: "choice",
      message: "\n***FLASHCARD CREATED***\n\nWould you like to CREATE ANOTHER FLASHCARD or BEGIN REVISION?\n",
      choices: ["CREATE ANOTHER FLASHCARD", "BEGIN REVISION"]
    }
  ]).then(function(response) {
    var cloze = new ClozeCard(response.text, response.cloze);
    clozeCards.push(cloze);
    if (response.choice === "CREATE ANOTHER FLASHCARD") {
      clozeCard();
    } else if (response.choice === "BEGIN REVISION") {
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
    console.log("\n--------------------------\n\nQUESTION: " + basicCards[counter].front);
    inquirer.prompt([{
      type: "rawlist",
      name: "getAnswer",
      message: "\n(Select FLIP CARD to flip the flashcard over)",
      choices: ["FLIP CARD"]
    }]).then(function(response) {
      if (response.getAnswer === "FLIP CARD") {
        console.log("\nANSWER: " + basicCards[counter].back + "\n\n--------------------------");
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
    console.log("\n--------------------------\n\nQUESTION: " + clozeCards[counter].partial);
    inquirer.prompt([{
      type: "rawlist",
      name: "getAnswer",
      message: "\n(Select FLIP CARD to flip the flashcard over)",
      choices: ["FLIP CARD"]
    }]).then(function(response) {
      if (response.getAnswer === "FLIP CARD") {
        console.log("\nANSWER: " + clozeCards[counter].cloze + "\n\n--------------------------");
        counter++;
        flipCloze();
      }
    });
  }
};

// Begin program
newCard();
