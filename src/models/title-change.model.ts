import {Entity, model, property} from '@loopback/repository';

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
    type: 'number',
    required: true,
  })
  employeeid: number;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'string',
  })
  endDate?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  departmentId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TitleChange>) {
    super(data);
  }
}

export interface TitleChangeRelations {
  // describe navigational properties here
}

export type TitleChangeWithRelations = TitleChange & TitleChangeRelations;
