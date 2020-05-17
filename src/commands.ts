import * as vscode from 'vscode';

/**
 * Collapses horizontal whitespaces on either side of the cursor so there's only one
 * space character between the joined components.
 */
export const justOneSpace = () => {
  vscode.window.showInformationMessage('Executing justOneSpace');
};

/**
 * Collapses all horizontal whitespaces on either side of the cursor.
 */
export const collapseWhitespaces = () => {
  vscode.window.showInformationMessage('Executing collapseWhitespaces');
};
