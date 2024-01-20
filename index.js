const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

function promptInput(msg, varType) {
  return inquirer.prompt([
    {
      type: "input",
      message:`What is the team manager\'s ${msg}?`,
      name: varType,
    }
  ]);
}

console.log("Please build your team");

async function askQuestions() {
  try {
    
    // Manager questions
    const managerName = await promptInput("name", "managerName");
    const managerID = await promptInput("id", "managerID");
    const managerEmail = await promptInput("email", "managerEmail");
    const managerOfficeNumber = await promptInput("office number", "managerOfficeNumber");

    const allAnswers = {
      ...managerName,
      ...managerID,
      ...managerEmail,
      ...managerOfficeNumber,
    }

    console.log(allAnswers);

  }catch(error) {
    console.error('Error during question prompts:', error);
  }
}

askQuestions();


