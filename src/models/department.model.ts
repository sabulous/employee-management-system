import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {postgresql: {table: 'department'}},
})
export class Department extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'country',
      dataType: 'number',
      nullable: 'NO',
    },
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'name',
      dataType: 'string',
      nullable: 'NO',
    },
  })
  name: string;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'manager',
      dataType: 'number',
      nullable: 'YES',
    },
  })
  manager?: number;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'location',
      dataType: 'number',
      nullable: 'YES',
    },
  })
  location?: number;

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  // describe navigational properties here
}

export type DepartmentWithRelations = Department & DepartmentRelations;
