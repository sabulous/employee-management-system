import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {postgresql: {table: 'employee'}},
})
export class Employee extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'id',
      dataType: 'number',
      nullable: 'NO',
    },
  })
  id?: number;

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
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'surname',
      dataType: 'string',
      nullable: 'NO',
    },
  })
  surname: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'email',
      dataType: 'string',
      nullable: 'NO',
    },
  })
  email: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'phone',
      dataType: 'string',
      nullable: 'YES',
    },
  })
  phone?: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'start_date',
      dataType: 'string',
      nullable: 'NO',
    },
  })
  startdate: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'salary',
      dataType: 'number',
      nullable: 'NO',
    },
  })
  salary: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'title',
      dataType: 'string',
      nullable: 'NO',
    },
  })
  title: string;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'manager',
      dataType: 'number',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  manager?: number;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'department',
      dataType: 'number',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  department?: number;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
