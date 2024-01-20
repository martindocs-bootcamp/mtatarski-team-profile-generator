// Custom Validation Rules
class Validation {
  constructor(input) {
    this.input = input.trim();
    this.results = [];
  }

  checkRule(rule, msg) {
    if(rule(this.input)){
      this.results.push(msg);
    }

    return this;
  }

  isEmpty() {
    return this.input === '';
  }

  isInvalidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(this.input);
  }

  isInvalidString() {
    const stringRegex = /^[a-z]+$/i;
    return !stringRegex.test(this.input);
  }

  isShortString(minLength) {
    return this.input.length < minLength;
  }

  isShortNumber(minLength) {
    const number = parseInt(this.input);
    return number < minLength;
  }

  isInvalidNumber() {
    const number = parseInt(this.input);
    return isNaN(number);
  }

  hasEnoughNumbers(minNumbers) {
    // matches any not a digit character that is not in the range 0 to 9.
    // and replace it with empty space
    const numCount = this.input.replace(/[^0-9]/g).trim().length;
    return numCount < minNumbers;
  }

  getResults() {
    return this.results;
  }
}

module.exports = Validation;