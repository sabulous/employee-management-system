import {inject} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Employee} from '../models';
import {EmployeeRepository} from '../repositories';
import {ManagerService} from '../services';

export class ManagerController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
    @inject('manager.service') private managerService: ManagerService,
  ) {}

  @get('/managers', {
    responses: {
      '200': {
        description: 'Array of Managers',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Employee, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Employee) filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    console.log('GET /managers');
    return (await this.employeeRepository.find(filter)).filter(
      emp => emp.title === 'Manager',
    );
  }

  @get('/hierarchy', {
    responses: {
      '200': {
        description: 'Array of Managers with Employees',
        content: {
          'application/json': {},
        },
      },
    },
  })
  async listEmployeesByManagers() {
    console.log('GET /hierarchy');
    return this.managerService.getHierarchy();
  }
}
