import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Location} from '../models';
import {LocationRepository} from '../repositories';

export class LocationController {
  constructor(
    @repository(LocationRepository)
    public locationRepository: LocationRepository,
  ) {}

  @post('/locations', {
    responses: {
      '200': {
        description: 'Location model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Location),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {
            title: 'NewLocation',
            exclude: ['id'],
          }),
        },
      },
    })
    location: Location,
  ): Promise<Location> {
    console.log('POST /locations');
    return this.locationRepository.create(location);
  }

  @get('/locations/count', {
    responses: {
      '200': {
        description: 'Location model count',
        content: {
          'application/json': {},
        },
      },
    },
  })
  async count(@param.where(Location) where?: Where<Location>): Promise<Count> {
    console.log('GET /locations/count');
    return this.locationRepository.count(where);
  }

  @get('/locations', {
    responses: {
      '200': {
        description: 'Array of Location model instances',
        content: {
          'application/json': {},
        },
      },
    },
  })
  async find(
  ): Promise<Location[]> {
    console.log('GET /locations');
    return this.locationRepository.find();
  }

  @patch('/locations', {
    responses: {
      '200': {
        description: 'Location PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {partial: true}),
        },
      },
    })
    location: Location,
    @param.where(Location) where?: Where<Location>,
  ): Promise<Count> {
    console.log('PATCH /locations');
    return this.locationRepository.updateAll(location, where);
  }

  @get('/locations/{id}', {
    responses: {
      '200': {
        description: 'Location model instance',
        content: {
          'application/json': {},
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<Location> {
    console.log(`GET /locations/${id}`);
    return this.locationRepository.findById(id);
  }

  @patch('/locations/{id}', {
    responses: {
      '204': {
        description: 'Location PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {partial: true}),
        },
      },
    })
    location: Location,
  ): Promise<void> {
    console.log(`PATCH /locations/${id}`);
    await this.locationRepository.updateById(id, location);
  }

  @put('/locations/{id}', {
    responses: {
      '204': {
        description: 'Location PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() location: Location,
  ): Promise<void> {
    console.log(`PUT /locations/${id}`);
    await this.locationRepository.replaceById(id, location);
  }

  @del('/locations/{id}', {
    responses: {
      '204': {
        description: 'Location DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    console.log(`DELETE /locations/${id}`);
    await this.locationRepository.deleteById(id);
  }
}
