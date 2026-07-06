# Cortex Calc — Scientific Calculator

A clean, instrument-panel styled scientific calculator built for the web. Fully responsive, keyboard-friendly, and dependency-free — just HTML, CSS, and vanilla JavaScript.

![Made with HTML, CSS, JS](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-ffb238)
![No dependencies](https://img.shields.io/badge/dependencies-none-1b1f27)
![License](https://img.shields.io/badge/license-MIT-8a8f9c)

## ✨ Features

- **Full scientific function set** — sin, cos, tan and their inverses, natural & base-10 log, exponentials, square/cube roots, powers, factorial, and reciprocal
- **DEG / RAD toggle** for trigonometric calculations
- **Memory functions** — MC, MR, M+, M− with a live memory indicator
- **Expression-based input** — build full expressions with parentheses instead of single-step entry
- **Answer recall (`Ans`)** to chain calculations
- **Keyboard support** — type directly using your keyboard (numbers, operators, Enter, Backspace, Escape)
- **Custom recursive-descent parser** — no unsafe `eval()`, evaluates expressions with correct operator precedence and associativity
- **Premium, distinctive UI** — dark instrument-panel theme with a glowing LED-style display, built to stand out from generic calculator templates
- **Fully responsive** — scientific and standard panels stack cleanly on mobile
- **Accessible** — visible keyboard focus states and `prefers-reduced-motion` support

## 🖥️ Live Preview

Open `index.html` in any modern browser — no build step, no installation, no dependencies.

## 📁 Project Structure

```
├── index.html      # Markup / structure
├── style.css       # Instrument-panel theme & layout
├── script.js       # Parser, evaluator, and UI logic
└── README.md       # You're here
```

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   ```
2. Open `index.html` in your browser — that's it.

You can also deploy it instantly with **GitHub Pages**:
`Settings → Pages → Deploy from branch → main`

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `0-9` | Enter digits |
| `+ - * /` | Basic operators |
| `^` | Power |
| `%` | Percent |
| `( )` | Parentheses |
| `Enter` | Evaluate (`=`) |
| `Backspace` | Delete last character |
| `Escape` | Clear (`AC`) |

## 🛠️ Tech

- **HTML5** — semantic structure
- **CSS3** — custom properties, CSS Grid, responsive design
- **Vanilla JavaScript** — hand-written recursive-descent expression parser (no external math libraries)

## 📄 License

This project is open source under the [MIT License](https://opensource.org/licenses/MIT).

---

Develop by Tayyab
