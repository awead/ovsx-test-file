import * as vscode from "vscode";
import * as terminal from "./terminal";
import * as utils from "./utils";

export function activate(context: vscode.ExtensionContext): void {

  console.log("Open VSX Test File plugin activated");

  // Execute the test file in the terminal
  context.subscriptions.push(vscode.commands.registerCommand("testFile.run", () => terminal.executeTestFile({})));

  // Execute the test file in the terminal from a specific line
  context.subscriptions.push(vscode.commands.registerCommand("testFile.runLine", async () => terminal.executeTestFile({
    lineNumber: vscode.window.activeTextEditor?.selection.active.line,
    currentFunction: (await utils.getCurrentFunctionName()) || undefined
  })));

  // Execute the previous test file in the terminal
  context.subscriptions.push(vscode.commands.registerCommand("testFile.runPrevious", () => terminal.executeLastTestFile()));
}

// This function is called when the extension is deactivated
export function deactivate(): void {}
