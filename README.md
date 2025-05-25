# 🧪 Thry — Thrylo Labs CLI

The **Thry CLI** is your gateway to powerful developer utilities built by [Thrylo Labs](https://github.com/ThryloLabs). It serves as a modular orchestrator for installing, running, and managing tools like `dstat`, `tsnap`, and others — all under a single command: `thry`.

![npm](https://img.shields.io/npm/v/@thrylolabs/thry)
![license](https://img.shields.io/badge/license-MIT-blue)
![downloads](https://img.shields.io/npm/dm/@thrylolabs/thry)

---

## 🚀 Features

- 📦 One-liner installs for Thrylo utilities
- ⚙️ Auto-discovery and dynamic command registration
- 🧰 Modular architecture for managing utilities
- 🌐 Integration with the npm registry for live tool listing
- 📤 Supports `install`, `uninstall`, `update`, `update-all`, `list`, and `available`

---

## 📦 Installation

```bash
npm install -g @thrylolabs/thry
```

---

## 🧑‍💻 Usage

```bash
thry [command] [...args]
```

### Global Commands

| Command           | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `install <pkg>`   | Install a utility (e.g. `thry install dstat`)             |
| `uninstall <pkg>` | Uninstall a utility                                       |
| `update <pkg>`    | Update a specific utility                                 |
| `update-all`      | Update all installed Thrylo utilities                     |
| `list`            | List installed Thrylo utilities                           |
| `available`       | List all available Thrylo utilities from npm              |
| `<utility>`       | Run any installed utility dynamically (e.g. `thry dstat`) |

---

## 🌿 Examples

```bash
# Install a utility
thry install dstat

# Run it (after installation)
thry dstat .

# Update it
thry update dstat

# View installed utilities
thry list

# See what else is available
thry available
```

---

## 📁 What is a Thrylo Utility?

A utility is any standalone CLI tool published under the `@thrylolabs` namespace on npm. Each can be installed independently and invoked via `thry <utility>`.

Examples:

- [`@thrylolabs/dstat`](https://www.npmjs.com/package/@thrylolabs/dstat) – Directory stats and structure tool
- `@thrylolabs/tsnap` – (Coming soon) Terminal snapshots
- `@thrylolabs/mdgen` – (Coming soon) Markdown generator from codebases

---

## 🛠 Built With

- [Commander.js](https://github.com/tj/commander.js)
- [execa](https://github.com/sindresorhus/execa)
- [chalk](https://github.com/chalk/chalk)
- Node.js + ECMAScript Modules (ESM)

---

## 📄 License

MIT © [Thrylo Labs](https://github.com/ThryloLabs)
