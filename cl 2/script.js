class ScientificCalculator {
    constructor() {
        this.expression = '';
        this.result = '0';
        this.mode = 'deg';
        this.history = [];
        this.maxHistory = 50;
        this.init();
    }

    init() {
        this.expressionEl = document.getElementById('expression');
        this.resultEl = document.getElementById('result');
        this.historyList = document.getElementById('historyList');
        this.historyPanel = document.getElementById('historyPanel');
        this.historyDot = document.getElementById('historyDot');
        this.historyClearBtn = document.getElementById('historyClear');

        this.bindEvents();
        this.loadHistory();
        this.updateDisplay();
        this.bindKeyboard();
    }

    bindEvents() {
        // All calculator keys
        document.querySelectorAll('.key').forEach(key => {
            key.addEventListener('click', (e) => {
                const action = key.dataset.action;
                if (action) this.handleAction(action);
                this.animateKey(key);
            });
        });

        // Mode toggle
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.mode = btn.dataset.mode;
            });
        });

        // History
        this.historyDot.addEventListener('click', () => this.toggleHistory());
        this.historyClearBtn.addEventListener('click', () => this.clearHistory());
    }

    bindKeyboard() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            e.preventDefault();

            const keyMap = {
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
                '.': '.', '+': '+', '-': '-', '*': '*', '/': '/',
                'Enter': 'equals', 'Backspace': 'backspace', 'Delete': 'clear',
                'Escape': 'clear', '(': 'openParen', ')': 'closeParen',
                '%': 'percent', '^': 'xpow2'
            };

            const action = keyMap[key];
            if (action) {
                this.handleAction(action);
                this.highlightKey(action);
            }
        });
    }

    handleAction(action) {
        const handlers = {
            clear: () => this.clear(),
            backspace: () => this.backspace(),
            percent: () => this.percent(),
            negate: () => this.negate(),
            equals: () => this.calculate(),
            sin: () => this.scientificOp('sin'),
            cos: () => this.scientificOp('cos'),
            tan: () => this.scientificOp('tan'),
            asin: () => this.scientificOp('asin'),
            acos: () => this.scientificOp('acos'),
            atan: () => this.scientificOp('atan'),
            log: () => this.scientificOp('log'),
            ln: () => this.scientificOp('ln'),
            sqrt: () => this.scientificOp('sqrt'),
            pow10: () => this.scientificOp('pow10'),
            powE: () => this.scientificOp('powE'),
            xpow2: () => this.scientificOp('xpow2'),
            factorial: () => this.scientificOp('factorial'),
            abs: () => this.scientificOp('abs'),
            pi: () => this.appendValue('π'),
            e: () => this.appendValue('e'),
            openParen: () => this.appendValue('('),
            closeParen: () => this.appendValue(')'),
        };

        if (handlers[action]) {
            handlers[action]();
        } else if (['+', '-', '*', '/'].includes(action)) {
            this.appendOperator(action);
        } else if (!isNaN(action) || action === '.') {
            this.appendValue(action);
        }
    }

    appendValue(value) {
        if (this.result === 'Error') return;
        this.expression += value;
        this.updateDisplay();
    }

    appendOperator(op) {
        if (this.result === 'Error') return;
        const lastChar = this.expression.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            this.expression = this.expression.slice(0, -1);
        }
        this.expression += op;
        this.updateDisplay();
    }

    scientificOp(func) {
        if (this.result === 'Error') return;
        try {
            let value = parseFloat(this.result);
            if (isNaN(value)) value = 0;

            let result;
            switch (func) {
                case 'sin':
                    result = this.mode === 'deg' ? Math.sin(this.toRadians(value)) : Math.sin(value);
                    break;
                case 'cos':
                    result = this.mode === 'deg' ? Math.cos(this.toRadians(value)) : Math.cos(value);
                    break;
                case 'tan':
                    result = this.mode === 'deg' ? Math.tan(this.toRadians(value)) : Math.tan(value);
                    break;
                case 'asin':
                    result = Math.asin(value);
                    if (this.mode === 'deg') result = this.toDegrees(result);
                    break;
                case 'acos':
                    result = Math.acos(value);
                    if (this.mode === 'deg') result = this.toDegrees(result);
                    break;
                case 'atan':
                    result = Math.atan(value);
                    if (this.mode === 'deg') result = this.toDegrees(result);
                    break;
                case 'log':
                    result = Math.log10(value);
                    break;
                case 'ln':
                    result = Math.log(value);
                    break;
                case 'sqrt':
                    result = Math.sqrt(value);
                    break;
                case 'pow10':
                    result = Math.pow(10, value);
                    break;
                case 'powE':
                    result = Math.exp(value);
                    break;
                case 'xpow2':
                    result = Math.pow(value, 2);
                    break;
                case 'factorial':
                    result = this.factorial(value);
                    break;
                case 'abs':
                    result = Math.abs(value);
                    break;
            }

            const formattedResult = this.formatNumber(result);
            this.addHistory(`${func}(${this.formatNumber(value)})`, formattedResult);
            this.expression = formattedResult;
            this.result = formattedResult;
            this.updateDisplay();
        } catch (e) {
            this.showError();
        }
    }

    calculate() {
        if (this.result === 'Error') return;
        try {
            let expr = this.expression
                .replace(/π/g, Math.PI.toString())
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-');

            if (!expr || expr === '') return;

            const result = this.safeEval(expr);
            const formattedResult = this.formatNumber(result);
            this.addHistory(this.expression, formattedResult);
            this.expression = formattedResult;
            this.result = formattedResult;
            this.updateDisplay();
        } catch (e) {
            this.showError();
        }
    }

    safeEval(expr) {
        // Only allow safe mathematical characters
        const sanitized = expr.replace(/[^0-9+\-*/().%eE\s]/g, '');
        const result = Function('"use strict"; return (' + sanitized + ')')();
        if (!isFinite(result)) throw new Error('Invalid result');
        return result;
    }

    factorial(n) {
        if (n < 0) throw new Error('Negative factorial');
        if (n === 0 || n === 1) return 1;
        if (n > 170) throw new Error('Too large');
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    formatNumber(num) {
        if (Math.abs(num) < 1e-10) return '0';
        if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
            return num.toExponential(10);
        }
        return parseFloat(num.toPrecision(12)).toString();
    }

    backspace() {
        if (this.result === 'Error') {
            this.clear();
            return;
        }
        this.expression = this.expression.slice(0, -1);
        this.evaluateLive();
        this.updateDisplay();
    }

    clear() {
        this.expression = '';
        this.result = '0';
        this.updateDisplay();
    }

    percent() {
        try {
            const value = parseFloat(this.result) / 100;
            this.result = this.formatNumber(value);
            this.expression = this.result;
            this.updateDisplay();
        } catch (e) {
            this.showError();
        }
    }

    negate() {
        try {
            if (this.expression) {
                if (this.expression.startsWith('-')) {
                    this.expression = this.expression.substring(1);
                } else {
                    this.expression = '-' + this.expression;
                }
                this.evaluateLive();
                this.updateDisplay();
            }
        } catch (e) {
            this.showError();
        }
    }

    evaluateLive() {
        try {
            if (this.expression) {
                let expr = this.expression
                    .replace(/π/g, Math.PI.toString())
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/−/g, '-');
                const result = this.safeEval(expr);
                this.result = this.formatNumber(result);
            } else {
                this.result = '0';
            }
        } catch (e) {
            // Don't show error for live evaluation
        }
    }

    showError() {
        this.result = 'Error';
        this.resultEl.classList.add('error');
        setTimeout(() => {
            this.resultEl.classList.remove('error');
        }, 1000);
        this.updateDisplay();
    }

    updateDisplay() {
        this.expressionEl.textContent = this.expression || '';
        this.resultEl.textContent = this.result || '0';
        if (this.result === 'Error') {
            this.resultEl.classList.add('error');
        } else {
            this.resultEl.classList.remove('error');
        }
    }

    addHistory(expr, result) {
        this.history.unshift({ expression: expr, result, timestamp: Date.now() });
        if (this.history.length > this.maxHistory) {
            this.history = this.history.slice(0, this.maxHistory);
        }
        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<div class="history-empty">No calculations yet</div>';
            return;
        }
        this.historyList.innerHTML = this.history.map(item => `
            <div class="history-item" onclick="calculator.useHistory('${item.expression.replace(/'/g, "\\'")}', '${item.result}')">
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
            </div>
        `).join('');
    }

    useHistory(expr, result) {
        this.expression = expr;
        this.result = result;
        this.updateDisplay();
        this.toggleHistory();
    }

    toggleHistory() {
        const panel = this.historyPanel;
        panel.style.display = panel.style.display === 'none' || !panel.style.display ? 'block' : 'none';
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.renderHistory();
    }

    saveHistory() {
        try {
            localStorage.setItem('calcHistory', JSON.stringify(this.history));
        } catch (e) {
            // localStorage full or unavailable
        }
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('calcHistory');
            if (saved) {
                this.history = JSON.parse(saved);
                this.renderHistory();
            }
        } catch (e) {
            this.history = [];
        }
    }

    animateKey(key) {
        key.style.transform = 'scale(0.95)';
        setTimeout(() => {
            key.style.transform = '';
        }, 100);
    }

    highlightKey(action) {
        const key = document.querySelector(`[data-action="${action}"]`);
        if (key) {
            key.classList.add('key-pressed');
            setTimeout(() => key.classList.remove('key-pressed'), 150);
        }
    }
}

// Initialize calculator
const calculator = new ScientificCalculator();
window.calculator = calculator;