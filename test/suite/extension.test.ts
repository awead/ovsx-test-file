import * as assert from 'assert';
import * as vscode from 'vscode';

describe('Extension Test Suite', function() {
  this.timeout(10000); // 10 second timeout
  vscode.window.showInformationMessage('Start all tests.');

  it('Command exists', async () => {
    // Wait for the extension to be activated
    await vscode.extensions.getExtension('your-publisher-id.ovsx-test-file')?.activate();
    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes('testFile.run'));
  });

});
