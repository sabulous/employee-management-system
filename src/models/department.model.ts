import {belongsTo, Entity, model, property} from '@loopback/repository';
import {LocationWithRelations} from '../models';
import {Location} from './location.model';

@model({settings: {postgresql: {table: 'department'}}})
export class Department extends Entity {
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
    type: 'number',
  })
  managerId?: 'number';

  @belongsTo(() => Location)
  locationId: number;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  location?: LocationWithRelations;
}

export type DepartmentWithRelations = Department & DepartmentRelations;
