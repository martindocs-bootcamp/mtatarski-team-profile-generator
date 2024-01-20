class Employee {
  constructor(name, id, email){
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getRole() {
    return 'Employee';
  }

}

Employee.prototype.getName = function() {
  return this.name;
}

Employee.prototype.getId = function() {
  return this.id;
}

Employee.prototype.getEmail = function() {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const check = emailRegex.test(email);
  console.log(check)
  return this.email;
}

module.exports = Employee;
