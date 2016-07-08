
(function() {
  function Calculator(display) {
      this.display = display;
      this.operation = [];
  }

  Calculator.prototype.updateDisplay = function() {
      document.getElementById(this.display).innerText = this.operation.join(' ');
  };

  Calculator.prototype.addToLast = function(input) {
      this.operation[this.operation.length - 1] += input;
  };

  Calculator.prototype.getLastItem = function() {
      return this.operation[this.operation.length - 1];
  };

  Calculator.prototype.handleNumber = function(num) {
      if (isNaN(this.getLastItem())) {
          this.operation.push(num.toString());
      } else {
          this.addToLast(num.toString());
      }
      this.updateDisplay()
  };

  Calculator.prototype.handleOperator = function(operator) {
      if (!isNaN(this.getLastItem())) {
          if (operator === '.') {
              this.addToLast(operator);
          } else {
              this.operation.push(operator);
          }
          this.updateDisplay();
      }
  };

  Calculator.prototype.allClear = function(funcName) {
      this.operation = [];
      this.updateDisplay();
  };

  Calculator.prototype.clearEntry = function() {
      this.operation[this.operation.length - 1] = this.getLastItem().toString().slice(0, -1);
      if (this.getLastItem().length < 1) {
          this.operation.pop();
      }
      this.updateDisplay();
  };

  Calculator.prototype.getTotal = function() {
      if (isNaN(this.getLastItem())) {
          this.operation.pop();
      }
      var total = eval(this.operation.join(''));
      this.operation = [total];
      this.updateDisplay();
  };

  var myCalculator = new Calculator('display');

  document.getElementById('ac').addEventListener('click', function() {
      myCalculator.allClear();
  });

  document.getElementById('ce').addEventListener('click', function() {
      myCalculator.clearEntry();
  });

  document.getElementById('=').addEventListener('click', function() {
      myCalculator.getTotal();
  });
  

  var opCtrl = document.getElementsByClassName('operator');
  var numCtrl = document.getElementsByClassName('num');

  for (var i = 0; i < opCtrl.length; i++) {
      opCtrl[i].addEventListener('click', function() {
          myCalculator.handleOperator(this.getAttribute('id'));
      });
  }

  for (i = 0; i < numCtrl.length; i++) {
      numCtrl[i].addEventListener('click', function() {
          myCalculator.handleNumber(this.getAttribute('id'));
      });
  }

  window.onkeyup = function(e) {
    e.preventDefault();
    var key = e.keyCode ? e.keyCode : e.which;

    if (key >= 96 && key <= 105) {
      myCalculator.handleNumber(key - 96)
    } else if (key === 107) {
      myCalculator.handleOperator('+');
    } else if (key === 109) {
      myCalculator.handleOperator('-');
    } else if (key === 53) {
      myCalculator.handleOperator('%');
    } else if (key === 106) {
      myCalculator.handleOperator('*');
    } else if (key === 111) {
      myCalculator.handleOperator('/');
    } else if (key === 110) {
      myCalculator.handleOperator('.');
    } else if (key === 8) {
      myCalculator.clearEntry();
    } else if (key === 46) {
      myCalculator.allClear();
    } else if (key === 13) {
      myCalculator.getTotal();
    }
  }
})();
