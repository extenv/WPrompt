# W Prompt

W Prompt is a CLI package designed to execute custom-defined commands through a `.wprompt` configuration file.

## Installation

1. Make sure Node.js is installed.

2. Install the package:

- To install locally:

```bash
npm install w-prompt
```

- To install globally:

```bash
npm install -g w-prompt
```

## `.wprompt` File Format

The `.wprompt` file is used to define commands to be executed. Its basic format is:

```plaintext
command_name: [no_logs]

action1

action2

---
```

### Format Elements

1. **`command_name:`**

   - The name of the command to be executed, e.g., `mantap` or `greet`.

   - The name is **case-insensitive**.

2. **`[no_logs]`** _(optional)_

   - If specified after the command name, execution logs (e.g., "Executing commands for:") will be hidden.

   - If omitted, logs will be displayed by default.

3. **`action1, action2, ...`**

   - A list of commands to be executed by the CLI, written one per line.

   - These can be any terminal commands, such as `echo`, `w -v`, or `npm install`.

4. **`---`**

   - A separator between command blocks. Each block begins with a new command name.

### Example `.wprompt` File

```plaintext
tEsT-123: no_logs

echo "This is Testing!"

echo "Running without logs."

---

greet:

echo "Hello, World!"

echo "Welcome to W Prompt!"

---

git:
git add .
git commit -m "Wprompt Commit"
git push -u origin main
---
```

#### Example Explanation

- **Block `tEsT-123`**

  - Includes the `no_logs` option, so execution logs will not be displayed.

  - The output will be:
    ```
    This is Testing!
    Running without logs.
    ```

- **Block `greet`**

  - Does not use the `no_logs` option, so execution logs will be displayed:
    ```
    Executing commands for: greet
    Executing: echo "Hello, World!"
    Hello, World!
    Executing: echo "Welcome to W Prompt!"
    Welcome to W Prompt!
    ```

## How to Use

1. Create a `.wprompt` file in your working directory.

2. Add commands following the format.

3. Run the CLI:

   - To execute a command from the .WPrompt file:

     ```bash
     w <command_name>
     ```

   - To view information about W Prompt:

     ```bash
     w -v
     ```

   - To display the help guide:
     ```bash
     w -h
     ```

## Error Handling

- If the `.wprompt` file is not found:

  ```
  .wprompt file not found.
  ```

- If the command is not found:
  ```
  <command_name> Prompt Not Found
  ```
