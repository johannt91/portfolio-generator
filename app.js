const inquirer = require('inquirer');
const { writeFile, copyFile } = require('./utils/generate-site.js'); //imports exported object from generate-site.js
const generatePage = require('./src/page-template.js');

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
            message: 'What is your name? (Required)',
            validate: nameInput => { //validate method receives an argument
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username (Required)',
            validate: userNameInput => { //validate method receives an argument
                if (userNameInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself',
            when: ({
                confirmAbout
            }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
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
    return inquirer.prompt([{
                type: 'input',
                name: 'name',
                message: 'What is the name of your project? (Required)',
                validate: projectNameInput => { //validate method receives an argument
                    if (projectNameInput) {
                        return true;
                    } else {
                        console.log('Please enter the name of your project!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of your project (Required)',
                validate: descriptionInput => { //validate method receives an argument
                    if (descriptionInput) {
                        return true;
                    } else {
                        console.log('Please add a description!');
                        return false;
                    }
                }
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
                message: 'Enter the GitHub link to your project. (Required)',
                validate: linkInput => { //validate method receives an argument
                    if (linkInput) {
                        return true;
                    } else {
                        console.log('Please enter a link to your project!');
                        return false;
                    }
                }
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
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });