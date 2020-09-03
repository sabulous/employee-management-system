import {bind, BindingScope, inject} from '@loopback/core';
import {EmployeeRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class DepartmentService {
  constructor(
    @inject('employee.repository')
    private employeeRepository: EmployeeRepository,
  ) {}

  async getEmployeeCountByDepartment(departmentId: number) {
    return (await this.employeeRepository.find()).filter(
      emp => emp.departmentId === departmentId,
    ).length;
  }
}
