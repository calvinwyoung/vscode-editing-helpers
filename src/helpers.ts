import { Position, Range, Selection, TextDocument } from 'vscode';

/**
 * Returns the the range representing all contiguous whitespace characters around the
 * given selection.
 */
export const findHorizontalWhitespaceRange = (
  textDocument: TextDocument,
  selection: Selection
): Range => {
  const activePosition = selection.active;
  const text = textDocument.lineAt(activePosition).text;
  let start, end;

  // `startIx` should end up being the index of the first whitespace character in the
  // line. This corresponds to the point right before the first whitespace character.
  for (start = activePosition.character - 1; start >= 0; start--) {
    if (text[start].match(/\S/)) {
      start++;
      break;
    }
  }
  start = Math.max(start, 0);

  // `endIx` should end up being the index of the first non-whitespace character. This
  // will correspond to the point right after the last whitespace character.
  for (end = activePosition.character; end < text.length; end++) {
    if (text[end].match(/\S/)) {
      break;
    }
  }

  return new Range(
    new Position(activePosition.line, start),
    new Position(activePosition.line, end)
  );
};
