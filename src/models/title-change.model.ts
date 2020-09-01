import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {postgresql: {table: 'title-change'}, strict: false},
})
export class TitleChange extends Entity {
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
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'start_date',
      dataType: 'string',
      nullable: 'NO',
    },
  })
  startDate: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'end_date',
      dataType: 'string',
      nullable: 'YES',
    },
  })
  endDate?: string;

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
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'department',
      dataType: 'string',
      nullable: 'NO',
    },
  })
  department: string;

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
