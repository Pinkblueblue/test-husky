import inquirer from "inquirer";
import { exec } from "child_process";
/**
 * 1. commit type
 * 2. check your jira number
 * 3. if the jira number is wrong, input you jira number:(like: C171405-6765)
 * 4. input your commit message
 * 5. confirm your whole commit message, enter  or update
 */
const getCommitType = () => {
	return new Promise(async (resolve, reject) => {
		inquirer
			.prompt([
				{
					type: "list",
					name: "type",
					message: "select commit type in message",
					choices: ["fix", "test", "config", "feat"],
					default: "fix",
				},
			])
			.then((res) => {
				console.log(res);
				resolve(res.type);
			});
	});
};

const getJiraNumber = () => {
	return Promise.resolve("C171405B-2323");
};

const checkJiraNumber = async (jiraNumber) => {
	return new Promise(async (resolve, reject) => {
		inquirer
			.prompt([
				{
					type: "confirm",
					name: "isRight",
					message: `Is your jira number [${jiraNumber}]?`,
					default: true,
				},
			])
			.then((res) => {
				console.log(res);
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
					message: `Please input you jira number: `,
					validate: (value) => {
						if (!value.trim()) {
							return "jira number not be empty!";
						} else if (!/^(C|c)/.test(value.trim())) {
							return "jira number must start with 'C|c'";
						}
						return true;
					},
				},
			])
			.then((res) => {
				console.log(res);
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
				},
			])
			.then((res) => {
				console.log(res);
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
					message: `The hole message is ${message}, is it ok? `,
					default: true,
				},
			])
			.then((res) => {
				console.log(res);
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
					message: `Please press Enter to edit the commit message (Press Enter) `,
					default: wholeMessage,
					validate: (value) => {
						if (!value.trim()) {
							return "message not be empty!";
						}
						return true;
					},
				},
			])
			.then((res) => {
				console.log(res);
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

// gitCommit();

function execGitCommit(wholeMessage) {
	console.log(`exec "git commit -m '${wholeMessage}'"`);
	console.log(wholeMessage);

	// wholeMessage = wholeMessage.replace(/"/g, "");
	const command = `git commit -m "${wholeMessage.replace(/"/g, "")}"`;
	exec(command, (err, stdout, stderr) => {
		console.log(err, stdout, stderr);
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

execGitCommit(`"test"`);
