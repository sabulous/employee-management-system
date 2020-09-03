import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Department, DepartmentWithRelations} from './department.model';

@model({
  settings: {postgresql: {table: 'employee'}},
})
export class Employee extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'date',
    required: true,
  })
  startdate: string;

  @property({
    type: 'number',
    required: true,
  })
  salary: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @belongsTo(() => Employee, {name: 'manager'})
  managerId: number;

  @belongsTo(() => Department)
  departmentId: number;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  department?: DepartmentWithRelations;
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
