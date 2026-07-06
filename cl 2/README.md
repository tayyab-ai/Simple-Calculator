# 🔬 Scientific Calculator

A professional, feature-rich scientific calculator built with HTML, CSS, and vanilla JavaScript. Features a sleek dark theme UI with smooth animations and comprehensive mathematical functions.

![Calculator Preview](preview.png)

## ✨ Features

### 🧮 Mathematical Functions
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Trigonometric**: sin, cos, tan (and inverse functions)
- **Logarithmic**: log (base-10), ln (natural log)
- **Exponential**: 10ˣ, eˣ, x², √
- **Advanced**: Factorial (n!), absolute value, percentage
- **Constants**: π (pi), e (Euler's number)
- **Parentheses**: Full support for complex expressions

### 🎨 UI/UX
- **Premium Dark Theme** with gradient backgrounds and subtle animations
- **Responsive Design** - works perfectly on desktop and mobile
- **Smooth Animations** on key presses and transitions
- **Glow Effects** on the display and equals button
- **Live Expression Display** - see your input and result simultaneously
- **Keyboard Support** - full physical keyboard integration
- **Angle Modes**: Toggle between DEG, RAD, and GRAD

### 📜 History
- **Calculation History** panel accessible via the blue dot
- **Persistent Storage** using localStorage
- **Click to Reuse** any previous calculation
- **Clear All** option to reset history

### ⌨️ Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `0-9` | Numbers |
| `+`, `-`, `*`, `/` | Operators |
| `Enter` | Calculate (=) |
| `Backspace` | Delete last character |
| `Delete` / `Escape` | Clear all (AC) |
| `.` | Decimal point |
| `(` `)` | Parentheses |
| `%` | Percentage |
| `^` | Square (x²) |

## 🚀 Getting Started

### Live Demo
Simply open `index.html` in any modern web browser. No build tools or dependencies required!

### Local Setup
```bash
# Clone the repositorygit clone https://github.com/Tayyab/scientific-calculator.git

# Navigate to the project folder
cd scientific-calculator

# Open in browser
# Option 1: Double-click index.html
# Option 2: Use a local server
python -m http.server 8000
# Then visit http://localhost:8000