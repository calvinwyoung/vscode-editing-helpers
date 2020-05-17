import * as vscode from 'vscode';
import { collapseWhitespaces, justOneSpace } from './commands';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'vscode-collapse-whitespaces.justOneSpace',
      justOneSpace
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'vscode-collapse-whitespaces.collapseWhitespaces',
      collapseWhitespaces
    )
  );
}

// This method is called when your extension is deactivated.
export function deactivate() {}
