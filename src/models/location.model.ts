import {Model, model, property} from '@loopback/repository';

@model({
  settings: {postgresql: {table: 'location'}},
})
export class Location extends Model {
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
      columnName: 'address',
      dataType: 'string',
      nullable: 'NO',
    },
  })
  address: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'postcode',
      dataType: 'string',
      nullable: 'YES',
    },
  })
  postcode?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'city',
      dataType: 'string',
      nullable: 'YES',
    },
  })
  city?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'country',
      dataType: 'string',
      nullable: 'YES',
    },
  })
  country?: string;

  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;
