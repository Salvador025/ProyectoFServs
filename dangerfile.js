import { danger, fail, message, warn } from "danger";

const modifiedMD = danger.git.modified_files.join("- ");
message(`Changed·Files·in·this·PR:·\n·-·${modifiedMD}`);

// Function to check the commit message format according to Conventional Commits.
function checkCommitMessageFormat(commit) {
	const lines = commit.message.split("\n");
	const [title, emptyLine, ...description] = lines;

	// Regex to validate Conventional Commits format
	const ccFormatRegex =
		/^(feat|fix|docs|style|refactor|test|chore|perf|build|ci|revert)(\(\w+\))?:\s/;
	const maxLength = 200;

	// Check if commit is a merge commit
	if (title.includes("Merge pull request")) {
		return;
	}
	// Check if commit message contains ignore pattern
	if (title.match(/\(#\d+\)/)) {
		return;
	}

	// Check if commit is a merge commit
	if (title.includes("Merge pull request")) {
		return;
	}
	// Check if commit message contains ignore pattern
	if (title.match(/\(#\d+\)/)) {
		return;
	}

	// Check 1: Validate Conventional Commit format
	if (!ccFormatRegex.test(title)) {
		fail(
			`Commit title does not follow Conventional Commits format: "${title}"`,
		);
	}

	// Check 2: Validate title length
	if (title.length > maxLength) {
		fail(`Commit title exceeds ${maxLength} characters: "${title}"`);
	}

	// Check 2: Empty line between title and description (if description exists)
	if (description.length > 0 && emptyLine !== "") {
		fail("Commit description does not have an empty line after title.");
	}

	//   Check 3: Description has at least 5 characters
	if (description.length > 1 && description[1].trim().length < 5) {
		warn("Commit description is less than 5 characters.");
	}

	// Check 4: Each line in the description does not have more than 80 characters
	description.forEach((line, index) => {
		if (line.length > 80) {
			warn(
				`Line ${
					index + 1
				} in commit description exceeds 72 characters: "${line.substring(
					0,
					69,
				)}..."`,
			);
		}
	});
}

// Iterate over each commit to check the message format
danger.git.commits.forEach(checkCommitMessageFormat);
