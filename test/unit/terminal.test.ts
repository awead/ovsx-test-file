import * as vscode from 'vscode';
import { executeTestFile } from '../../src/terminal';
import * as assert from 'assert';
import * as sinon from 'sinon';

describe('executeTestFile', () => {
  it('should show an error message if no activeTextEditor', () => {
    const spy = sinon.spy(vscode.window, 'showErrorMessage');
    const getActiveTextEditorStub = sinon.stub(vscode.window, 'activeTextEditor').get(() => undefined);

    executeTestFile({});

    assert.ok(spy.calledWith('No active file to test'));

    spy.restore();
    getActiveTextEditorStub.restore();
  });
});
