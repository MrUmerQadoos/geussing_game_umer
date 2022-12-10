#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
// let sleep = (ms=2000)=>{
// return new Promise((resolve, reject) => {
//     setTimeout(resolve,ms)
// })
// }
let sleep = (ms = 2000) => new Promise((res, rej) => setTimeout(res, ms));
async function welcome() {
    let rainbow = chalkAnimation.rainbow('Let Start The game ');
    await sleep();
    rainbow.stop();
}
async function guessinggame() {
    let palyerlife = 4;
    let sccore = 0;
    let play = true;
    while (play) {
        let randomnumber = Math.floor(Math.random() * 9 + 1);
        do {
            palyerlife--;
            console.log(chalk.redBright(`player life,s left ${palyerlife}`));
            var answer = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'usernumber',
                    message: 'Enter any number from 1 to 10',
                },
            ]);
            if (answer.usernumber == randomnumber) {
                console.log(chalk.green('congrats you put correct number '));
                sccore += 10;
                console.log(chalk.yellow(`your score is ${sccore}`));
                play = true;
            }
            else if (answer.usernumber > randomnumber) {
                console.log(chalk.blue(`your number ${answer.usernumber} is greater then guess number`));
                play = false;
            }
            else if (answer.usernumber < randomnumber) {
                console.log(chalk.blue(`your number ${answer.usernumber} is less then guess number `));
                play = false;
            }
        } while (palyerlife > 1 &&
            answer.usernumber !== randomnumber &&
            play == false);
        {
            if (palyerlife > 0 && play == true && answer.usernumber == randomnumber) {
                palyerlife = 4;
            }
            else if (play == false && answer.usernumber == randomnumber) {
                play = true;
            }
            else if (palyerlife < 2) {
                console.log(chalk.bgBlueBright('GAME OVER'));
            }
        }
    }
}
async function startagain() {
    do {
        console.clear();
        await welcome();
        await guessinggame();
        var again = await inquirer.prompt([
            {
                type: 'input',
                name: 'restart',
                message: 'Do you want to countinous? Press y or n: ',
            },
        ]);
    } while (again.restart == 'Y' || again.restart == 'y');
}
startagain();
