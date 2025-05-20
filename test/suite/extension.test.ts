import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import { executeTestFile } from '../../src/terminal';
import * as sinon from 'sinon';

describe('Extension Test Suite', function () {
  this.timeout(10000); // 10 second timeout
  vscode.window.showInformationMessage('Start all tests.');

  it('has a complete set of tests', async () => {
    // Wait for the extension to be activated
    await vscode.extensions.getExtension('your-publisher-id.ovsx-test-file')?.activate();
    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes('testFile.run'));
    assert.ok(commands.includes('testFile.runLine'));
  });

  context('when testing the entire file', () => {

    context('if there is no activeTextEditor', () => {

      it('shows an error message', async () => {
        const spy = sinon.spy(vscode.window, 'showErrorMessage');
        const getActiveTextEditorStub = sinon.stub(vscode.window, 'activeTextEditor').get(() => undefined);

        executeTestFile({});

        assert.ok(spy.calledWith('No active file to test'));

        spy.restore();
        getActiveTextEditorStub.restore();
      });

    });

    context('if there is an activeTextEditor', () => {

      it('executes the command in the terminal', async () => {
        const createTerminalSpy = sinon.spy(vscode.window, 'createTerminal');

        // Track if the getter was accessed by using a counter
        let getterAccessCount = 0;
        const expectedEditorStub = {
          document: {
            uri: vscode.Uri.file(path.join(__dirname, 'fixtures', 'sample-project', 'src', 'main.test.ts')),
            fsPath: path.join(__dirname, 'fixtures', 'sample-project', 'src', 'main.test.ts')
          }
        };

        const getActiveTextEditorStub = sinon.stub(vscode.window, 'activeTextEditor').get(() => {
          getterAccessCount++;
          return expectedEditorStub;
        });

        executeTestFile({});

        assert.ok(getterAccessCount > 0, 'Expected activeTextEditor getter to be accessed');
        assert.ok(createTerminalSpy.called, 'Expected terminal to be created');

        createTerminalSpy.restore();
        getActiveTextEditorStub.restore();
      });

    });

  });

  context('when testing a single line or function', () => {

    it('TBD', () => {
    });

  });

});
