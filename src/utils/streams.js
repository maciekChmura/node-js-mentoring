'use strict';

const program = require('commander');



// actions
const reverse = (str) => {
  console.log(str.split('').reverse().join(''));
};

function transform(str) { /* ... */ }
function outputFile(filePath) { /* ... */ }
function convertFromFile(filePath) { /* ... */ }
function convertToFile(filePath) { /* ... */ }



program
  .version('0.1.0', '-v --version')
  .option('-r --reverse <str>', 'reverse a string')
  .parse(process.argv);

/* 
program
  .command('reverse <str>', 'reverse a string')
  .action((str) => {
    reverse(str);
  });
 */

if (program.reverse) {
  reverse(program.reverse);
}

if (process.argv.length < 3) {
  console.log('please specify some arguments:');
  program.help();
}

// program.on('command:*', () => {
//   console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
//   process.exit(1);
// });



// END
// program.parse(process.argv);
