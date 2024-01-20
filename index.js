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

function promptManagerInput(msg, varType) {
  return inquirer.prompt([
    {
      type: "input",
      message:`What is the team manager\'s ${msg}?`,
      name: varType,
    }
  ]);
}

function promptTeamInput(team) {
  const teamType = team.toLowerCase();

  return inquirer.prompt([
    {
      type: 'input',
      name: `name`,
      message: `What is your ${teamType}'s name?`,      
    },
    {
      type: 'input',
      name: `id`,
      message: `What is your ${teamType}'s ID?`,
    },
    {
      type: 'input',
      name: `email`,
      message: `What is your ${teamType}'s email`,      
    },
    {
      type: 'input',
      name: `additionalDetails`,
      message: `What is your ${teamType}'s ${teamType === 'engineer' ? 'Github username' : 'school'}?`,
    }

  ]);
}

async function promptRepeatInput() {
  const answers = {
    engineer: [],
    intern: [],
  };

  let exitFlag = true;

  while (exitFlag) {
    const options = await inquirer.prompt([
      {
        type: 'list',
        name: 'teamMember',
        message: 'Which type of team member would you like to add?',
        choices: ["Engineer", "Intern", "Exit"],
      }
    ]);

    const teamType = options.teamMember;
    switch(teamType) {
      case 'Engineer':
        const engineer = await promptTeamInput(teamType);
        answers['engineer'].push(engineer);
        break;
      case 'Intern':
        const intern = await promptTeamInput(teamType);
        answers['intern'].push(intern);          
        break;
      case 'Exit':
        exitFlag = false;
        break;      
    }    
  }
  return answers
}

console.log("Please build your team");

async function askQuestions() {
  try {
    
    // Manager questions
    const managerName = await promptManagerInput("name", "managerName");
    const managerID = await promptManagerInput("id", "managerID");
    const managerEmail = await promptManagerInput("email", "managerEmail");
    const managerOfficeNumber = await promptManagerInput("office number", "managerOfficeNumber");

    const list = await promptRepeatInput();

    const allAnswers = {
      ...managerName,
      ...managerID,
      ...managerEmail,
      ...managerOfficeNumber,
      ...list,
    }

    console.log(allAnswers);

  }catch(error) {
    console.error('Error during question prompts:', error);
  }
}

askQuestions();


