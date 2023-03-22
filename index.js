const inquirer = require('inquirer');
const fs = require('fs')
const db = require('./db/connection');
// const Employee = require('./modals/Employee')
// const Engineer = require('./modals/Engineer')
// const Intern = require('./modals/Intern')
// const Manager = require('./modals/Manager')

// const employees = []
// const arrayHTML = []

// Create an array of questions for user input
function employeeTracker() {
    inquirer
    .prompt([
        {
        type: 'list', 
        name: 'prompt',
        message: "What would you like to do?",
        choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add Department', 'Add Employee',  'Update Employee Role',  'Quit']
        },
]).then((answers) => {
    if (answers.prompt === 'View All Employees') {
        db.query('SELECT * FROM employee', (err, results) => {
            if (err) throw err;
            console.table(results);
            employeeTracker();
        });
    } else if (answers.prompt === 'View All Roles') {
        db.query('SELECT * FROM role', (err, results) => {
            if (err) throw err;
            console.table(results);
            employeeTracker();
        });
    } else if (answers.prompt === 'View All Departments') {   
        db.query('SELECT * FROM department', (err, results) => {
            if (err) throw err;
            console.table(results);
            employeeTracker();
        });
    } else if (answers.prompt === 'Add Department') {
        inquirer.prompt([
            {
                type: 'input', 
                name: 'department',
                message: "What is the name of the department?",
            },
        ]).then((answers) => {
            db.query('INSERT INTO department SET ?', {name: answers.department}, (err, results) => {
                if (err) throw err;
                console.table(results);
                employeeTracker();
            });
        });
    } else if (answers.prompt === 'Add Role') {
        inquirer.prompt([
            {   
                type: 'input',
                name: 'role',
                message: "What is the name of the role?",
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary of the role?",
            },
            {
                type: 'input',
                name: 'departmentID',
                message: "What is the department ID of the role?",
                choices: () => {
                    const choices = [];
                    forEach(department => {
                        choices.push(department.id);
                    });
                    return choices;
                },
            },
        ]).then((answers) => {
            forEach(department => {
                if (department.id === answers.departmentID) {
                    answers.departmentID = department.id;
                }
            });
        });
        db.query('INSERT INTO role SET ?', {title: answers.role, salary: answers.salary, department_id: answers.departmentID}, (err, results) => {
            if (err) throw err;
            console.table(results);
            employeeTracker();
        });
    } else if (answers.prompt === 'Add Employee') {
        db.query('SELECT * FROM employee', (err, results) => {
            if (err) throw err;
            console.table(results);
            employeeTracker();
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is the first name of the employee?",
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is the last name of the employee?",
                },
                {
                    type: 'input',
                    name: 'role',
                    message: "What is the role of the employee?",
                    choices: () => {
                        const choices = [];
                        forEach(role => {
                            choices.push(role.id);
                        });
                        return choices;
                    },
                }, 
            ]).then((answers) => {
                forEach(role => {
                    if (role.id === answers.role) {
                        answers.roleID = role.id;
                    }
                });
            });

        })};
        
})} 


// function init() {
//     fs.writeFileSync('index.html', generateHTML(employees), (error) => {
//         return error
//             ? console.error(error)
//             : console.log("File written successfully");
//         }
// )}

    

// Function call to initialize app
employeeTracker();


