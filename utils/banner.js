// Program's information
const title = 'TEAM PROFILE GENERATOR'; 
const author = 'Marcin Tatarski';
const version = '1.0';
const date = '21/01/2024';
const description = 'A versatile Team Profile Generator.';
const repository = 'https://github.com/martindocs-bootcamp/mtatarski-team-profile-generator';

// Function to display a banner with program information
function banner ()  {
  console.log(    
    `
  ╔═════════════════════════════════════════════════════════════════════════════════════╗
  ║ ${title} v${version}                                                         ║
  ║ Author: ${author}                                                             ║
  ║ Date: ${date}                                                                    ║
  ║ Description: ${description}                                    ║
  ║ Repository: ${repository} ║  
  ║ License: MIT                                                                        ║
  ╚═════════════════════════════════════════════════════════════════════════════════════╝
    `
    );
};

module.exports = banner;