import {Entity, hasMany, model, property} from '@loopback/repository';
import {Employee} from './employee.model';

@model({settings: {postgresql: {table: 'department'}}})
export class Department extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  locationId?: number;

  @property({
    type: 'number',
  })
  managerId?: 'number';

  // Define well-known properties here

  @hasMany(() => Employee, {keyTo: 'departmentId'})
  employees?: Employee[];

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  // describe navigational properties here
}

export type DepartmentWithRelations = Department & DepartmentRelations;
