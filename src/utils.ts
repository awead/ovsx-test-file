import * as vscode from 'vscode';

export async function getCurrentFunctionName(): Promise<string | undefined> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return undefined;
    }

    const document = editor.document;
    const position = editor.selection.active;

    // Get all symbols in the document
    const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
        'vscode.executeDocumentSymbolProvider',
        document.uri
    );

    if (!symbols) {
        return undefined;
    }

    // Find the innermost symbol containing the current position
    function findContainingSymbol(symbols: vscode.DocumentSymbol[]): vscode.DocumentSymbol | undefined {
        for (const symbol of symbols) {
            if (symbol.range.contains(position)) {
                // Check children first to get the most specific symbol
                const childSymbol = findContainingSymbol(symbol.children);
                if (childSymbol) {
                    return childSymbol;
                }
                // If no matching child found, return this symbol if it's a function/method
                if (symbol.kind === vscode.SymbolKind.Function || 
                    symbol.kind === vscode.SymbolKind.Method) {
                    return symbol;
                }
            }
        }
        return undefined;
    }

    const symbol = findContainingSymbol(symbols);
    return symbol?.name;
}
