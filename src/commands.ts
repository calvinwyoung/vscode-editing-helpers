import { commands, window } from 'vscode';
import { findHorizontalWhitespaceRange } from './helpers';

/**
 * Collapses horizontal whitespaces on either side of the cursor so there's only one
 * space character between the joined components.
 */
export const justOneSpace = () => {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  const whitespaceRanges = editor.selections.map((selection) =>
    findHorizontalWhitespaceRange(editor.document, selection)
  );

  return editor.edit((editorBuilder) => {
    whitespaceRanges.forEach((range) => {
      editorBuilder.insert(range.start, ' ');
      editorBuilder.delete(range);
    });
  });
};

/**
 * Collapses all horizontal whitespaces on either side of the cursor.
 */
export const collapseWhitespaces = () => {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  const whitespaceRanges = editor.selections.map((selection) =>
    findHorizontalWhitespaceRange(editor.document, selection)
  );

  return editor.edit((editorBuilder) => {
    whitespaceRanges.forEach((range) => {
      editorBuilder.delete(range);
    });
  });
};

/**
 * Duplicates the current line, and comments the original.
 */
export const duplicateLineAndComment = async () => {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  await commands.executeCommand('editor.action.copyLinesDownAction');
  await commands.executeCommand('cursorMove', { to: 'up', by: 'line', select: false });
  await commands.executeCommand('editor.action.addCommentLine');
  await commands.executeCommand('cursorMove', { to: 'down', by: 'line', select: false });
};
