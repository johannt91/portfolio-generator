const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(userName, github);


// fs.writeFile('index.html', generatePage(userName, github), err => {
//     if(err) throw err;
//     console.log('Portfolio comlete! Check the index.html to see the output');
// });

const promptUser = () => {
    return inquirer.prompt([ //return stops the execution of the function and returns a value from the function
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself'
        }
    ]);
};


const promptProject = portfolioData => {
    //If there are no 'projects' array property, then create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
=================
Add a New Project
=================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply).',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData); //pushes projectData from inquirer into the portfolioData.projects array
        if (projectData.confirmAddProject) { //response is captured in answer object 'projectData' and verified by 'confirmAddProject' and checks to see if user wants to add another project
            return promptProject(portfolioData); //if user chooses to add another project, then call promptProject function. If portfolioData isn't included as an argument, a new 'projects' array will be initialized and the existing project data will be lost
        } else {
            return portfolioData; //if add another project is false, then return the object and display the stored data
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });