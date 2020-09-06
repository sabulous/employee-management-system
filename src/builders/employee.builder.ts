import {Employee} from '../models/employee.model';

export class EmployeeBuilder {
  private employee: Employee;

  constructor() {
    this.employee = new Employee();
  }

  build(): Employee {
    return this.employee;
  }

  id(id: number): EmployeeBuilder {
    this.employee.id = id;
    return this;
  }

  name(name: string): EmployeeBuilder {
    this.employee.name = name;
    return this;
  }

  surname(surname: string): EmployeeBuilder {
    this.employee.surname = surname;
    return this;
  }

  email(email: string): EmployeeBuilder {
    this.employee.email = email;
    return this;
  }

  phone(phone: string): EmployeeBuilder {
    this.employee.phone = phone;
    return this;
  }

  startdate(startdate: string): EmployeeBuilder {
    this.employee.startdate = startdate;
    return this;
  }

  salary(salary: number): EmployeeBuilder {
    this.employee.salary = salary;
    return this;
  }

  title(title: string): EmployeeBuilder {
    this.employee.title = title;
    return this;
  }

  managerId(managerId: number): EmployeeBuilder {
    this.employee.managerId = managerId;
    return this;
  }

  departmentId(departmentId: number): EmployeeBuilder {
    this.employee.departmentId = departmentId;
    return this;
  }
}
