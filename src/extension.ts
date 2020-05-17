import { commands, ExtensionContext } from 'vscode';
import { collapseWhitespaces, duplicateLineAndComment, justOneSpace } from './commands';

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand('vscode-editing-helpers.justOneSpace', justOneSpace)
  );

  context.subscriptions.push(
    commands.registerCommand(
      'vscode-editing-helpers.collapseWhitespaces',
      collapseWhitespaces
    )
  );

  context.subscriptions.push(
    commands.registerCommand(
      'vscode-editing-helpers.duplicateLineAndComment',
      duplicateLineAndComment
    )
  );
}

// This method is called when your extension is deactivated.
export function deactivate() {}
