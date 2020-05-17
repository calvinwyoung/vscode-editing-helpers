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
export const duplicateLineAndComment = () => {
  commands.executeCommand('editor.action.addCommentLine');
  commands.executeCommand('editor.action.copyLinesDownAction');
  commands.executeCommand('editor.action.removeCommentLine');
};
