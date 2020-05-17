# VSCode Editing Helpers

This VS code extension provides some helper commands for editing text with VSCode. Many of
these commands are inspired by Emacs.

These commands can either be executed via the command pallete or assigned to custom
keyboard shortcuts. This extension doesn't provide any default keybindings of its own, and
prefers to stay agnostic in terms of how it's used.

## Commands

The following commands are provided. In all of the examples, we use the `|` character to
indicate the cursor position when the command is executed.

### Just One Space

Collapses contiguous whitespace characters around the cursor such that only one whitespace character remains.

Example input:

```
foo    |      bar
```

Example output:

```
foo |bar
```

### Collapse Whitespaces

Collapses all contiguous whitespace characters around the cursor such that no whitespace
characters remain.

Example input:

```
foo    |      bar
```

Example output:

```
foo|bar
```

### Duplicate Line and Comment

Copies the current line downward, and comments the original line.

Example input:

```javascript
const foo = 'bar';|
```

Example output:

```javascript
// const foo = 'bar';
const foo = 'bar';|
```
