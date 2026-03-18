import { describe, expect, it, vi } from 'vitest';
import type { TextDocument, Selection as VscodeSelection } from 'vscode';

// Use vi.hoisted so mock classes are available when vi.mock factory runs
// (vi.mock is hoisted above imports).
const { Position, Range } = vi.hoisted(() => {
  class Position {
    constructor(
      public line: number,
      public character: number
    ) {}
  }

  class Range {
    constructor(
      public start: Position,
      public end: Position
    ) {}
  }

  return { Position, Range };
});

vi.mock('vscode', () => ({ Position, Range }));

import { findHorizontalWhitespaceRange } from './helpers';

function makeSelection(active: InstanceType<typeof Position>): VscodeSelection {
  return { active } as VscodeSelection;
}

function makeDocument(lines: string[]): TextDocument {
  return {
    lineAt: (lineOrPos: number | InstanceType<typeof Position>) => ({
      text: lines[typeof lineOrPos === 'number' ? lineOrPos : lineOrPos.line],
    }),
  } as TextDocument;
}

describe('findHorizontalWhitespaceRange', () => {
  it('finds whitespace around cursor in the middle of a gap', () => {
    const doc = makeDocument(['foo    bar']);
    const sel = makeSelection(new Position(0, 5));
    const range = findHorizontalWhitespaceRange(doc, sel);
    expect(range.start.character).toBe(3);
    expect(range.end.character).toBe(7);
  });

  it('returns zero-width range when cursor is on non-whitespace', () => {
    const doc = makeDocument(['foobar']);
    const sel = makeSelection(new Position(0, 3));
    const range = findHorizontalWhitespaceRange(doc, sel);
    expect(range.start.character).toBe(3);
    expect(range.end.character).toBe(3);
  });

  it('handles whitespace at the start of a line', () => {
    const doc = makeDocument(['   foo']);
    const sel = makeSelection(new Position(0, 1));
    const range = findHorizontalWhitespaceRange(doc, sel);
    expect(range.start.character).toBe(0);
    expect(range.end.character).toBe(3);
  });

  it('handles whitespace at the end of a line', () => {
    const doc = makeDocument(['foo   ']);
    const sel = makeSelection(new Position(0, 4));
    const range = findHorizontalWhitespaceRange(doc, sel);
    expect(range.start.character).toBe(3);
    expect(range.end.character).toBe(6);
  });

  it('handles cursor at the left edge of a whitespace gap', () => {
    const doc = makeDocument(['foo  bar']);
    const sel = makeSelection(new Position(0, 3));
    const range = findHorizontalWhitespaceRange(doc, sel);
    expect(range.start.character).toBe(3);
    expect(range.end.character).toBe(5);
  });
});
