import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Employee, EmployeeWithRelations} from './employee.model';

@model({
  settings: {postgresql: {table: 'title-change'}},
})
export class TitleChange extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
  })
  endDate?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'number',
  })
  departmentId: number;

  @belongsTo(() => Employee, {name: 'employee'})
  employeeId: number;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TitleChange>) {
    super(data);
  }
}

export interface TitleChangeRelations {
  employee?: EmployeeWithRelations;
}

export type TitleChangeWithRelations = TitleChange & TitleChangeRelations;
