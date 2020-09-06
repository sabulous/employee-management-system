import {bind, BindingScope, inject} from '@loopback/core';
import {FilterBuilder} from '@loopback/repository';
import {EmployeeRepository, TitleChangeRepository} from '../repositories';
import {EmployeeServiceInterface} from './generic.service.interface';

@bind({scope: BindingScope.TRANSIENT})
export class EmployeeService implements EmployeeServiceInterface {
  constructor(
    @inject('employee.repository')
    private employeeRepository: EmployeeRepository,
    @inject('title-change.repository')
    private titleChangeRepository: TitleChangeRepository,
  ) {}

  async getTitleChangesByEmployeeId(employeeId: number) {
    const filterBuilder = new FilterBuilder();
    const filter = filterBuilder
      .order(['id DESC'])
      .where({managerId: employeeId})
      .build();

    const titleChanges = (await this.titleChangeRepository.find(filter)).filter(
      tc => tc.employeeId === employeeId,
    );
    const employee = await this.employeeRepository.findById(employeeId);
    return {...employee, titleChanges};
  }
}
