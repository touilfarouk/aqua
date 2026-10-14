# Aqua Quasar Highlight

One-click setup for Vue directive / attribute coloring inside Quasar **no-build**
projects, where components are plain `.js` files with `/*html*/` template literals.

Installing this extension pack:

1. Installs [`simonhe.vscode-highlight-text`](https://marketplace.visualstudio.com/items?itemName=simonhe.vscode-highlight-text)
   and [`tobermory.es6-string-html`](https://marketplace.visualstudio.com/items?itemName=tobermory.es6-string-html).
2. Contributes the highlight rules as defaults via `configurationDefaults`.

The distributable file is **`aqua-quasar-highlight-1.0.0.vsix`**, hosted in the
`aqua` repo at `https://github.com/touilfarouk/aqua/tree/main/tools/aqua-quasar-highlight`.

## Install (one click)

Open a terminal (PowerShell, or the VS Code integrated terminal with `` Ctrl+` ``)
and run one of these:

**A. With the full path (works from anywhere):**

```powershell
code --install-extension "C:\Users\ASUS\aqua-quasar-highlight\aqua-quasar-highlight-1.0.0.vsix"
```

**B. From inside the folder (shortest form):**

```powershell
cd C:\Users\ASUS\aqua-quasar-highlight
code --install-extension aqua-quasar-highlight-1.0.0.vsix
```

> Quote the path if it contains spaces. Form B only works because the `.vsix` is in
> the current directory.

### Mouse-only alternative

In VS Code open the **Extensions** view, click the `...` (Views and More Actions)
menu at the top, choose **Install from VSIX…**, and pick the `.vsix` file.

## Prerequisite: the `code` command

Check it exists:

```powershell
code --version
```

- Prints a version → you're good.
- *"not recognized"* → enable it once in VS Code with
  `Ctrl+Shift+P` → **Shell Command: Install 'code' command in PATH**,
  or call it by full path instead:

```powershell
& "$env:LOCALAPPDATA\Programs\Microsoft VS Code\bin\code.cmd" --install-extension "C:\Users\ASUS\aqua-quasar-highlight\aqua-quasar-highlight-1.0.0.vsix"
```

## After installing

1. Reload VS Code: `Ctrl+Shift+P` → **Developer: Reload Window**
   (needed the first time so the defaults and bundled extensions activate).
2. Verify it is installed:

```powershell
code --list-extensions | Select-String aqua
```

Expected output:

```
aqua.aqua-quasar-highlight
```

## Install it on another machine

The `.vsix` is also hosted in the `aqua` repo:
`https://github.com/touilfarouk/aqua/blob/main/tools/aqua-quasar-highlight/aqua-quasar-highlight-1.0.0.vsix`

**If the repo is public:**

```powershell
iwr "https://github.com/touilfarouk/aqua/raw/main/tools/aqua-quasar-highlight/aqua-quasar-highlight-1.0.0.vsix" -OutFile "$env:TEMP\aqua-quasar-highlight-1.0.0.vsix"
code --install-extension "$env:TEMP\aqua-quasar-highlight-1.0.0.vsix"
```

**If the repo is private** (raw links need auth), clone over SSH and install from disk:

```powershell
git clone --depth 1 git@github.com:touilfarouk/aqua.git
code --install-extension ".\aqua\tools\aqua-quasar-highlight\aqua-quasar-highlight-1.0.0.vsix"
```

Then **Developer: Reload Window**.

No `.vscode` folder or settings editing is required on the target machine.

## Useful commands

| Goal                       | Command                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| (re)install / update       | `code --install-extension "<path>.vsix" --force`                        |
| Install just the extensions | `code --install-extension simonhe.vscode-highlight-text tobermory.es6-string-html` |
| Uninstall the pack          | `code --uninstall-extension aqua.aqua-quasar-highlight`                 |

## Notes

- Rules are contributed as *defaults*. If you define `vscode-highlight-text.rules`
  in your own User or workspace settings, that value wins.
- The defaults apply to all `javascript` / `typescript` files while the pack is
  installed.
- Uninstalling the pack removes the injected defaults; the two real extensions stay.
