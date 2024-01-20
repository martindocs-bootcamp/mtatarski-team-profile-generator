const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Function to validate the inputs 
function validation(input, validationType) {
  let value;

  switch (validationType) {
    case 'email':       
      value = input.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

      if(value === ''){
        return `Input cannot be empty.`;
      }else if(!emailRegex.test(value)){
        return `Input needs to be an valid email.`;
      }
    
      break;
    case 'string': 
      value = input.trim();

      if(value === ''){
        return `Input cannot be empty.`;
        /**
          ^ - asserts the start of the string.
          $ - asserts the end of the string.
          [a-z] - matches one or more letters.
          i - (case-insensitive)
          (^[a-z]]$), they ensure that the entire string matches the specified pattern.
         */
      }else if(!/^[a-zA-Z\s]+$/i.test(value)){      
        return `Input needs to be an string.`;
      } else if(value.length < 4){
        return `Input needs to be at least 5 characters.`;
      }

      break;
    case 'id':   
      value = parseInt(input); // returns NaN for non-numeric values
      
      if(value === '' || isNaN(value)){
        return `Input needs to be a number.`;      
      }else if(value < 1){
        return `Input needs to be at least 1 number.`;
      }          
      break;

    case 'officeNumber':
      // value = parseInt(input);
      value = input.trim();

      if(value === '' || isNaN(value)){
        return `Input needs to be a valid office number.`;      
      }else if(value.length < 5){
        return `Input needs to be at least 5 numbers.`;
      }          
      break;
  }

  return true;

}

// Function to get information about manager
function promptManagerInput(msg, valueType) {
  let promptMsg = msg;
  let validationType = valueType;

  // Handling for 'office' input
  if (msg === 'office') {
    promptMsg = 'office number';
    validationType = 'officeNumber'; 
  }

  return inquirer.prompt([
    {
      type: "input",
      message:`What is the team manager\'s ${promptMsg}?`,
      name: msg,
      validate: (input) => validation(input, validationType),
    }
  ]);
}

// Function to get information about the team members
function promptTeamInput(team) {
  const teamType = team.toLowerCase();

  return inquirer.prompt([
    {
      type: 'input',
      name: `name`,
      message: `What is your ${teamType}'s name?`, 
      validate: (input) => validation(input, 'string')     
    },
    {
      type: 'input',
      name: `id`,
      message: `What is your ${teamType}'s ID?`,
      validate: (input) => validation(input, 'id') 
    },
    {
      type: 'input',
      name: `email`,
      message: `What is your ${teamType}'s email`, 
      validate: (input) => validation(input, 'email')      
    },
    {
      type: 'input',
      name: `additionalDetails`,
      message: `What is your ${teamType}'s ${teamType === 'engineer' ? 'Github username' : 'school'}?`,
      validate: (input) => validation(input, 'string') 
    }

  ]);
}

// Function to repeat question for team members
async function promptRepeatInput() {
  const answers = {
    engineers: [],
    interns: [],
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
        answers['engineers'].push(engineer);
        break;
      case 'Intern':
        const intern = await promptTeamInput(teamType);
        answers['interns'].push(intern);          
        break;
      case 'Exit':
        exitFlag = false;
        break;      
    }    
  }
  return answers;
}

// Main function to ask questions
console.log("Please build your team");
async function askQuestions() {
  try {
    
    // Manager questions
    const managerName = await promptManagerInput("name", "string");
    const managerID = await promptManagerInput("id", "id");
    const managerEmail = await promptManagerInput("email", "email");
    const managerOfficeNumber = await promptManagerInput("office", "number");

    // Teams members questions
    const getTeam = await promptRepeatInput();
    
    // Manager object
    const manager = new Manager(
      managerName.name, 
      managerID.id, 
      managerEmail.email, 
      managerOfficeNumber.office
    );

    // Engineers object
    const engineers = getTeam.engineers.map((engineer) => {
      const{name, id, email, additionalDetails} = engineer;
      return new Engineer(name, id, email, additionalDetails);
    });

    // Interns object
    const inters = getTeam.interns.map((intern) => {
      const{name, id, email, additionalDetails} = intern;
      return new Intern(name, id, email, additionalDetails);
    });

    // Data for generating the team
    const team = render([manager, ...engineers, ...inters])
      
    // Create the OUTPUT folder if it doesn't exist
    if(!fs.existsSync(OUTPUT_DIR)){
      fs.mkdirSync(OUTPUT_DIR);
    }

    // Generate the HTML file
    fs.writeFileSync(outputPath, team);

    console.log("Generating the team...");
  

  }catch(error) {
    console.error('Error during question prompts:', error);
  }
}

askQuestions();


