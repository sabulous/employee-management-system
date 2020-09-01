import {DefaultCrudRepository} from '@loopback/repository';
import {TitleChange, TitleChangeRelations} from '../models';
import {PostgresDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TitleChangeRepository extends DefaultCrudRepository<
  TitleChange,
  typeof TitleChange.prototype.id,
  TitleChangeRelations
> {
  constructor(
    @inject('datasources.postgresDb') dataSource: PostgresDbDataSource,
  ) {
    super(TitleChange, dataSource);
  }
}
