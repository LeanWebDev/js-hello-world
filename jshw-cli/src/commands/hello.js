const { Command, flags } = require("@oclif/command");

class HelloCommand extends Command {
  async run() {
    const { flags } = this.parse(HelloCommand);
    const name = flags.name || "world";
    let obj = JSON.stringify(
      { a: 1, b: 2, c: 3, d: { a: 1, b: 2, c: 3 } },
      null,
      2
    );
    this.log(`hello ${name} from ./src/commands/hello.js`);
    this.log(obj);
  }
}

HelloCommand.description = `Describe the command here
...
Extra documentation goes here
`;

HelloCommand.flags = {
  name: flags.string({ char: "n", description: "name to print" }),
};

module.exports = HelloCommand;
