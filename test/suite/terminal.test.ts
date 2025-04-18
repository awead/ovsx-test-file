import * as vscode from 'vscode';
import { executeTestFile } from '../../src/terminal';
import * as assert from 'assert';
import * as sinon from 'sinon';

describe('executeTestFile', () => {
  context('when there is no activeTextEditor', () => {
    it('shows an error message', () => {
      const spy = sinon.spy(vscode.window, 'showErrorMessage');
      const getActiveTextEditorStub = sinon.stub(vscode.window, 'activeTextEditor').get(() => undefined);

      executeTestFile({});

      assert.ok(spy.calledWith('No active file to test'));

      spy.restore();
      getActiveTextEditorStub.restore();
    });
  });

  context('when there is an activeTextEditor', () => {
    it('executes the terminal command', () => {
      const spy = sinon.spy(vscode.window, 'showErrorMessage');
      const mockTextEditor = { document: { uri: { fsPath: 'test' } } }
      const getActiveTextEditorStub = sinon.stub( vscode.window, 'activeTextEditor').get(() => mockTextEditor);

      // Stub createTerminal and spy on sendText
      const sendTextStub = sinon.stub();
      const showStub = sinon.stub();
      const terminalStub = { sendText: sendTextStub, show: showStub };
      const createTerminalStub = sinon.stub(vscode.window, 'createTerminal').returns(terminalStub as any);

      executeTestFile({});

      assert.ok(sendTextStub.calledWith('ls test'));

      spy.restore();
      getActiveTextEditorStub.restore();
      createTerminalStub.restore();
    });
  });
});

