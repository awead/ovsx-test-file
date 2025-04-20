import * as vscode from "vscode";
import * as terminal from "./terminal";

export function activate(context: vscode.ExtensionContext): void {

  console.log("Open VSX Test File plugin activated");

  context.subscriptions.push(vscode.commands.registerCommand("testFile.run", () => terminal.executeTestFile({})));
  context.subscriptions.push(vscode.commands.registerCommand("testFile.runPrevious", () => terminal.executeLastTestFile()));
}

// This function is called when the extension is deactivated
export function deactivate() {}
