// creates the team
const generateTeam = team => {

    // creates the manager html
    const generateManager = manager => {
        return `
            <div class="col col-md-4 col-lg-3">
                <div class="card overflow-hidden h-100 shadow">
                    <div class="card-header bg-primary text-white">
                        <h2 class="card-title">${manager.getName()}</h2>
                        <h3><i class="fas fa-mug-hot me-2"></i>${manager.getRole()}</h3>
                    </div>
                    <div class="card-body text-bg-light">
                        <ul class="list-group">
                            <li class="list-group-item">ID: ${manager.getId()}</li>
                            <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                            <li class="list-group-item">Office number: ${manager.getOfficeNumber()}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    };

    // creates the html for engineers
    const generateEngineer = engineer => {
        return `
            <div class="col col-md-4 col-lg-3">
                <div class="card overflow-hidden h-100 shadow">
                    <div class="card-header bg-primary text-white">
                        <h2 class="card-title">${engineer.getName()}</h2>
                        <h3><i class="fas fa-glasses me-2"></i>${engineer.getRole()}</h3>
                    </div>
                    <div class="card-body text-bg-light">
                        <ul class="list-group">
                            <li class="list-group-item">ID: ${engineer.getId()}</li>
                            <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                            <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    };

    // creates the html for interns
    const generateIntern = intern => {
        return `
            <div class="col col-md-4 col-lg-3">
                <div class="card overflow-hidden h-100 shadow">
                    <div class="card-header bg-primary text-white">
                        <h2 class="card-title">${intern.getName()}</h2>
                        <h3><i class="fas fa-user-graduate me-2"></i>${intern.getRole()}</h3>
                    </div>
                    <div class="card-body text-bg-light">
                        <ul class="list-group">
                            <li class="list-group-item">ID: ${intern.getId()}</li>
                            <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                            <li class="list-group-item">School: ${intern.getSchool()}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    };

    const html = [];

    html.push(team
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => generateManager(manager))
    );
    html.push(team
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => generateEngineer(engineer))
        .join("")
    );
    html.push(team
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => generateIntern(intern))
        .join("")
    );

    return html.join("");

}

// exports function to generate entire page
module.exports = team => {

    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">   
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col mb-3 bg-danger text-white py-5">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container mt-3">
        <div class="row d-flex row-gap-4">            
            ${generateTeam(team)}            
        </div>
    </div>
</body>
</html>
    `;
};