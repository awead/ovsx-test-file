# Open VSX Test File Plugin

Finds and runs a test file from an associated source file.

## Compilation

Build the plugin to install to Windsurf:

```bash
npm install
npm run build
npm run vsce:package
windsurf --install-extension ovsx-test-file-0.0.1.vsix
```

## Development

```bash
npm install
npm run build
```

## References

Inspired by

- [Neotest](https://github.com/nvim-neotest/neotest)
- [Rails Run Specs](https://github.com/noku/rails-run-spec-vscode)
