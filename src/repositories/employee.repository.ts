import {DefaultCrudRepository} from '@loopback/repository';
import {Employee, EmployeeRelations} from '../models';
import {PostgresDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {
  constructor(
    @inject('datasources.postgresDb') dataSource: PostgresDbDataSource,
  ) {
    super(Employee, dataSource);
  }
}
