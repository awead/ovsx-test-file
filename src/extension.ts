import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('testFile.run', async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage('No active editor.');
      return;
    }

    const activeFile = vscode.workspace.asRelativePath(editor.document.uri.fsPath);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
