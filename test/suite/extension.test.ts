import * as assert from 'assert';
import * as vscode from 'vscode';
import { executeTestFile } from '../../src/terminal';
import * as sinon from 'sinon';

describe('Extension Test Suite', function () {
  this.timeout(10000); // 10 second timeout
  vscode.window.showInformationMessage('Start all tests.');

  it('Command exists', async () => {
    // Wait for the extension to be activated
    await vscode.extensions.getExtension('your-publisher-id.ovsx-test-file')?.activate();
    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes('testFile.run'));
  });

  context('when there is no activeTextEditor', () => {
    it('shows an error message', async () => {
      const spy = sinon.spy(vscode.window, 'showErrorMessage');
      const getActiveTextEditorStub = sinon.stub(vscode.window, 'activeTextEditor').get(() => undefined);

      await executeTestFile({});

      assert.ok(spy.calledWith('No active file to test'));

      spy.restore();
      getActiveTextEditorStub.restore();
    });
  });
});
