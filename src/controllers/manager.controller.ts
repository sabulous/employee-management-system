import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Employee} from '../models';
import {EmployeeRepository} from '../repositories';

export class ManagerController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
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
    return (await this.employeeRepository.find(filter)).filter(
      emp => emp.title === 'Manager',
    );
  }
}
