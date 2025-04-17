import * as vscode from 'vscode';

interface RunOptions {
  path?: string;
  lineNumber?: number;
  commandText?: string;
}

export function executeTestFile(options: RunOptions): void {
  const terminal = vscode.window.createTerminal('Test Runner');
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('No active file to test');
    return;
  }

  const filePath = editor.document.uri.fsPath;
  const path = vscode.workspace.asRelativePath(options.path || filePath);
  terminal.show();
  terminal.sendText(`ls ${path}`);
}
