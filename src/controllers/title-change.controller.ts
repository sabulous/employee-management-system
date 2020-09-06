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
import {TitleChange} from '../models';
import {TitleChangeRepository} from '../repositories';

export class TitleChangeController {
  constructor(
    @repository(TitleChangeRepository)
    public titleChangeRepository: TitleChangeRepository,
  ) {}

  @post('/title-changes', {
    responses: {
      '200': {
        description: 'TitleChange model instance',
        content: {'application/json': {schema: getModelSchemaRef(TitleChange)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleChange, {
            title: 'NewTitleChange',
            exclude: ['id'],
          }),
        },
      },
    })
    titleChange: TitleChange,
  ): Promise<TitleChange> {
    console.log(`POST /title-changes`);
    return this.titleChangeRepository.create(titleChange);
  }

  @get('/title-changes/count', {
    responses: {
      '200': {
        description: 'TitleChange model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TitleChange) where?: Where<TitleChange>,
  ): Promise<Count> {
    console.log('GET /title-changes/count');
    return this.titleChangeRepository.count(where);
  }

  @get('/title-changes', {
    responses: {
      '200': {
        description: 'Array of TitleChange model instances',
        content: {
          'application/json': {},
        },
      },
    },
  })
  async find(
  ): Promise<TitleChange[]> {
    console.log('GET /title-changes');
    return this.titleChangeRepository.find();
  }

  @patch('/title-changes', {
    responses: {
      '200': {
        description: 'TitleChange PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleChange, {partial: true}),
        },
      },
    })
    titleChange: TitleChange,
    @param.where(TitleChange) where?: Where<TitleChange>,
  ): Promise<Count> {
    console.log('PATCH /title-changes');
    return this.titleChangeRepository.updateAll(titleChange, where);
  }

  @get('/title-changes/{id}', {
    responses: {
      '200': {
        description: 'TitleChange model instance',
        content: {
          'application/json': {},
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<TitleChange> {
    console.log(`GET /title-changes/${id}`);
    return this.titleChangeRepository.findById(id);
  }

  @patch('/title-changes/{id}', {
    responses: {
      '204': {
        description: 'TitleChange PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleChange, {partial: true}),
        },
      },
    })
    titleChange: TitleChange,
  ): Promise<void> {
    console.log(`PATCH /title-changes/${id}`);
    await this.titleChangeRepository.updateById(id, titleChange);
  }

  @put('/title-changes/{id}', {
    responses: {
      '204': {
        description: 'TitleChange PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() titleChange: TitleChange,
  ): Promise<void> {
    console.log(`PUT /title-changes/${id}`);
    await this.titleChangeRepository.replaceById(id, titleChange);
  }

  @del('/title-changes/{id}', {
    responses: {
      '204': {
        description: 'TitleChange DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    console.log(`DELETE /title-changes/${id}`);
    await this.titleChangeRepository.deleteById(id);
  }
}
