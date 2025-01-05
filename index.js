#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to the custom configuration file (wprompt)
const configFilePath = path.join(process.cwd(), 'wprompt');


// ANSI color codes for terminal output
const colors = {
    reset: "\x1b[0m",
    blue: "\x1b[34m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    cyan: "\x1b[36m"
};

// Function to apply color
function colorize(color, text) {
    return color + text + colors.reset;
}

// Function to load and parse the 'wprompt' file
function loadWpromptConfig() {
    if (!fs.existsSync(configFilePath)) {
        console.error(colorize(colors.red, "wprompt file not found."));
        return null;
    }

    const fileContent = fs.readFileSync(configFilePath, 'utf-8');
    const commandBlocks = {};
    let currentCommand = null;
    let currentBlock = [];
    let logSetting = true;  // Default is to log execution messages

    // Split file content by sections separated by '---'
    const sections = fileContent.split('---').map(section => section.trim()).filter(section => section !== '');

    sections.forEach(section => {
        const lines = section.split('\n').map(line => line.trim()).filter(line => line !== '');

        if (lines.length > 0) {
            // Get the first line (which contains command and optional no_logs)
            const firstLine = lines[0];
            const commandMatch = firstLine.match(/^([\w-]+):\s*(no_logs)?$/);  // Updated regex to allow hyphen in command

            if (commandMatch) {
                const commandName = commandMatch[1].toLowerCase();  // Convert to lowercase
                const noLogsFlag = commandMatch[2] ? true : false;

                // Start a new command block
                currentCommand = commandName;
                logSetting = !noLogsFlag; // If no_logs is present, logging is disabled
                currentBlock = [];

                // Add actions for the current block (all lines after the first line)
                for (let i = 1; i < lines.length; i++) {
                    currentBlock.push(lines[i]);
                }

                // Store the actions and logging setting for the current command block
                commandBlocks[currentCommand] = { actions: currentBlock, logs: logSetting };
            }
        }
    });

    return commandBlocks;
}

// Handle arguments passed via CLI
const args = process.argv.slice(2);

// Check for version flag
if (args.includes('-h')) {
    console.log(colorize(colors.green, "W Prompt Usage Guide:"));
    console.log("w <command> : Executes the command defined in the wprompt file");
    console.log("w -h : Displays the usage guide for W Prompt");
    console.log("w -v : Displays information about W Prompt");
}
// Check for version flag
else if (args.includes('-v')) {
    console.log(colorize(colors.green, "W Prompt version 1.0.4 \n"));
    console.log("W Prompt is a CLI package to execute commands \ndefined in a custom configuration file.\n");
    console.log("Please visit https://github.com/extenv/WPrompt for more information.");
}
// Handle the case when no recognized command is found
else if (args.length > 0) {
    const userCommand = args[0].toLowerCase();  // Convert user input to lowercase
    const commandBlocks = loadWpromptConfig();

    if (commandBlocks && commandBlocks[userCommand]) {
        const { actions, logs } = commandBlocks[userCommand];

        // If logs are enabled, show the "Executing" messages
        if (logs) {
            console.log(colorize(colors.cyan, `Executing commands for: ${userCommand}`)); // Colored header
        }

        // Execute each line in the corresponding block for the command
        actions.forEach(command => {
            if (logs) {
                console.log(colorize(colors.green, `Executing: ${command}`)); // Colored "Executing" message
            }
            try {
                execSync(command, { stdio: 'inherit' });
            } catch (error) {
                console.error(colorize(colors.red, `Error executing: ${command}`)); // Colored error message
            }
        });
    } else {
        // Print a message if the command was not found
        console.log(colorize(colors.red, `'${userCommand}' prompt not found in wprompt file. \n`));
        console.log(`Please check the wprompt file in the current directory.`);
        console.log(`or 'w -h' for usage guide.`);
    }
} else {
    console.log("Please provide a command (e.g., w <command>)");
    console.log(`or 'w -h' for usage guide.`);
}
