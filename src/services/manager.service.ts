import {bind, BindingScope, inject} from '@loopback/core';
import {FilterBuilder} from '@loopback/repository';
import {EmployeeRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class ManagerService {
  constructor(
    @inject('employee.repository')
    private employeeRepository: EmployeeRepository,
  ) {}

  async getManagers() {
    const filterBuilder = new FilterBuilder();
    const filter = filterBuilder
      .fields('id', 'name', 'title')
      .order(['id ASC'])
      .build();

    return (await this.employeeRepository.find(filter)).filter(
      emp => emp.title === 'Manager',
    );
  }

  async getEmployeesByManagerId(managerId: number) {
    const filterBuilder = new FilterBuilder();
    const filter = filterBuilder
      .fields('id', 'name')
      .order(['id ASC'])
      .where({managerId: managerId})
      .build();

    console.log(this.employeeRepository.find(filter));

    return await this.employeeRepository.find(filter);
  }

  async getHierarchy() {
    let managers = (await this.getManagers()).map(m => ({
      managerId: m.id,
      managerName: m.name,
    }));
    let hierarchy = [];
    for (let m of managers) {
      console.log('SERVICE manager id:', m);
      let employees = (await this.getEmployeesByManagerId(m.managerId)).map(
        e => ({
          name: e.name,
        }),
      );
      hierarchy.push({[m.managerName]: employees});
    }
    return hierarchy;
  }
}
