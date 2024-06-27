import inquirer from "inquirer";
import { exec } from "child_process";
import chalk from "chalk";

let index = 1;
/**
 * 1. commit type
 * 2. check your jira number
 * 3. if the jira number is wrong, input you jira number:(like: C171405-6765)
 * 4. input your commit message
 * 5. confirm your whole commit message, enter  or update
 *
 * 这个应该要强制，用方括号包起来，来获取jira号，
 * 获取git branch中的jira号，如果用户确认了jira号，那就用等号做判断
 * 如果用户手输了jira号，就用branch name includes来判断
 */
const getCommitType = () => {
	return new Promise(async (resolve, reject) => {
		inquirer
			.prompt([
				{
					type: "list",
					name: "type",
					message: "select commit type in message:",
					choices: ["fix", "test", "config", "feat"],
					default: "fix",
					prefix: index++ + ")",
				},
			])
			.then((res) => {
				// console.log(res.type);
				resolve(res.type);
			});
	});
};

const getJiraNumber = () => {
	return Promise.resolve("C99999");
};

const checkJiraNumber = async (jiraNumber) => {
	return new Promise(async (resolve, reject) => {
		inquirer
			.prompt([
				{
					type: "confirm",
					name: "isRight",
					message: `Is your jira number [${chalk.green(jiraNumber)}]?`,
					default: true,
					prefix: index++ + ")",
				},
			])
			.then((res) => {
				// console.log(res);
				resolve(res.isRight);
			});
	});
};

const inputJiraNumber = async () => {
	return new Promise(async (resolve, reject) => {
		inquirer
			.prompt([
				{
					type: "input",
					name: "jiraNumber",
					message: `Please input you jira number:`,
					validate: (value) => {
						if (!value.trim()) {
							return "jira number not be empty!";
						} else if (!/^(C|c)/.test(value.trim())) {
							return "jira number must start with 'C|c'";
						}
						return true;
					},
					prefix: index++ + ")",
				},
			])
			.then((res) => {
				// console.log(res);
				resolve(res.jiraNumber);
			})
			.catch(() => {
				console.log("error");
				reject(null);
			});
	});
};

const inputMessage = () => {
	return new Promise(async (resolve, reject) => {
		inquirer
			.prompt([
				{
					type: "input",
					name: "message",
					message: `Please input commit message: `,
					validate: (value) => {
						if (!value.trim()) {
							return "message not be empty!";
						}
						return true;
					},
					prefix: index++ + ")",
				},
			])
			.then((res) => {
				// console.log(res);
				resolve(res.message);
			});
	});
};

const confirmMessage = (message) => {
	return new Promise(async (resolve, reject) => {
		inquirer
			.prompt([
				{
					type: "confirm",
					name: "isMessageOk",
					message: `The whole message is '${chalk.green(message)}', is it ok?`,
					default: true,
					prefix: index++ + ")",
				},
			])
			.then((res) => {
				// console.log(res);
				resolve(res.isMessageOk);
			});
	});
};

const editMessage = (wholeMessage) => {
	return new Promise(async (resolve, reject) => {
		inquirer
			.prompt([
				{
					type: "editor",
					name: "updateMessage",
					message: `Let's edit the commit message:`,
					default: wholeMessage,
					validate: (value) => {
						if (!value.trim()) {
							return "message not be empty!";
						}
						return true;
					},
					prefix: index++ + ")",
				},
			])
			.then((res) => {
				// console.log(res);
				resolve(res.updateMessage);
			});
	});
};

async function gitCommit() {
	try {
		const type = await getCommitType();
		let jiraNumber = await getJiraNumber();
		const isRight = await checkJiraNumber(jiraNumber);
		if (isRight == false) {
			jiraNumber = await inputJiraNumber();
		}
		let message = await inputMessage();
		let wholeMessage = `${type}: [${jiraNumber}] ${message}`;

		const isMessageOk = await confirmMessage(wholeMessage);
		if (!isMessageOk) {
			wholeMessage = await editMessage(wholeMessage);
		}

		execGitCommit(wholeMessage);
	} catch (error) {
		console.error(error);
	}
}

function execGitCommit(wholeMessage) {
	console.log("\n\n", chalk.blue("RUN >>"), chalk.green(`git commit -m '${wholeMessage}'`), "\n\n");
	const command = `git commit -m "${wholeMessage.replace(/"/g, "")}"`;
	exec(command, (err, stdout, stderr) => {
		if (err) {
			console.error(err);
			return;
		}
		if (stderr) {
			console.error(stderr);
			return;
		}
		console.log(stdout);
	});
}

gitCommit();
