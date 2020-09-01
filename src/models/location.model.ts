import {Model, model, property} from '@loopback/repository';

@model()
export class Location extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
  })
  postcode?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
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
