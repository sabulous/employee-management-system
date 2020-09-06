import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Department} from '../models';
import {DepartmentRepository} from '../repositories';
import {SalaryService} from '../services';

export class DepartmentController {
  constructor(
    @repository(DepartmentRepository)
    public departmentRepository: DepartmentRepository,
    @inject('salary.service')
    private salaryService: SalaryService,
  ) {}

  @post('/departments', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: {'application/json': {schema: getModelSchemaRef(Department)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {
            title: 'NewDepartment',
            exclude: ['id'],
          }),
        },
      },
    })
    department: Omit<Department, 'id'>,
  ): Promise<Department> {
    console.log('POST /departments');
    return this.departmentRepository.create(department);
  }

  @get('/departments/count', {
    responses: {
      '200': {
        description: 'Department model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Department) where?: Where<Department>,
  ): Promise<Count> {
    console.log('GET /departments/count');
    return this.departmentRepository.count(where);
  }

  @get('/departments/{id}/averageSalary', {
    responses: {
      '200': {
        description: 'Department model count',
        content: {'application/json': {}},
      },
    },
  })
  async averageSalary(@param.path.number('id') id: number): Promise<number> {
    console.log(`GET /departments/${id}/averageSalary`);
    return this.salaryService.getAverageSalaryByDepartment(id);
  }

  @get('/departments', {
    responses: {
      '200': {
        description: 'Array of Department model instances',
        content: {
          'application/json': {},
        },
      },
    },
  })
  async find(
  ): Promise<Department[]> {
    console.log('GET /departments');
    return this.departmentRepository.find();
  }

  @patch('/departments', {
    responses: {
      '200': {
        description: 'Department PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {partial: true}),
        },
      },
    })
    department: Department,
    @param.where(Department) where?: Where<Department>,
  ): Promise<Count> {
    console.log('PATCH /departments');
    return this.departmentRepository.updateAll(department, where);
  }

  @get('/departments/{id}', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: {
          'application/json': {},
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<Department> {
    console.log(`GET /departments/${id}`);
    return this.departmentRepository.findById(id);
  }

  @patch('/departments/{id}', {
    responses: {
      '204': {
        description: 'Department PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {partial: true}),
        },
      },
    })
    department: Department,
  ): Promise<void> {
    console.log(`PATCH /departments/${id}`);
    await this.departmentRepository.updateById(id, department);
  }

  @put('/departments/{id}', {
    responses: {
      '204': {
        description: 'Department PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() department: Department,
  ): Promise<void> {
    console.log(`PUT /departments/${id}`);
    await this.departmentRepository.replaceById(id, department);
  }

  @del('/departments/{id}', {
    responses: {
      '204': {
        description: 'Department DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    console.log(`DELETE /departments/${id}`);
    await this.departmentRepository.deleteById(id);
  }
}
