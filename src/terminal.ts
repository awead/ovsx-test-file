import * as vscode from 'vscode';

interface RunOptions {
  path?: string;
  lineNumber?: number;
  commandText?: string;
}

const SPEC_TERMINAL_NAME = 'Test Runner';

let lastCommandText: string;
let activeTerminals: {[index: string]: vscode.Terminal} = {};

export function executeTestFile(options: RunOptions): void {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('No active file to test');
    return;
  }

  const path = vscode.workspace.asRelativePath(options.path || editor.document.uri.fsPath);
  executeInTerminal(path, options);
}

export function executeLastTestFile(): void {
  if (lastCommandText) {
    const specTerminal = getOrCreateTerminal(SPEC_TERMINAL_NAME);
    specTerminal.sendText(lastCommandText);
  }
}

//
// Private functions
//


function executeInTerminal(path: string, options: RunOptions): void {
  const specTerminal = getOrCreateTerminal(SPEC_TERMINAL_NAME);
  const execute = () => executeCommand(specTerminal, path, options);

  if (shouldClearTerminal()) {
    vscode.commands.executeCommand("workbench.action.terminal.clear").then(execute);
  } else {
    execute();
  }
}

function getOrCreateTerminal(prefix: string): vscode.Terminal {
  const terminalName = getTerminalName(prefix);

  if (activeTerminals[terminalName]) {
    return activeTerminals[terminalName];
  } else {
    const terminal = vscode.window.createTerminal(terminalName);
    activeTerminals[terminalName] = terminal;
    return terminal;
  }
}

function getTerminalName(prefix: string): string {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return prefix;
  }
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
  return [prefix, workspaceFolder?.name || 'workspace'].join(" ");
}

function executeCommand(specTerminal: vscode.Terminal, fileName: string, options: RunOptions): void {
  specTerminal.show(shouldFocusTerminal());

  let lineNumberText = options.lineNumber ? `:${options.lineNumber}` : "",
    commandText = options.commandText || `${getExecutable()} ${fileName}${lineNumberText}`;

  console.log("Executing command:", commandText);

  specTerminal.sendText(commandText);

  lastCommandText = commandText;
}

function shouldClearTerminal(): boolean {
  const clearTerminal = vscode.workspace.getConfiguration("ovsx-test-file").get<boolean>("clearTerminal");
  return clearTerminal !== false;
}

function shouldFocusTerminal(): boolean {
  const focusTerminal = vscode.workspace.getConfiguration("ovsx-test-file").get<boolean>("focusTerminal");
  return focusTerminal !== false;
}

function getExecutable(): string | undefined {
  const doc = vscode.window.activeTextEditor?.document;
  const config = vscode.workspace.getConfiguration('ovsx-test-file', doc);
  return config.get<string | undefined>("executable");
}
