import {DefaultCrudRepository} from '@loopback/repository';
import {Department, DepartmentRelations} from '../models';
import {PostgresDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {
  constructor(
    @inject('datasources.postgresDb') dataSource: PostgresDbDataSource,
  ) {
    super(Department, dataSource);
  }
}
