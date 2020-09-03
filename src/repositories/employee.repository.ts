import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Employee, EmployeeRelations} from '../models';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {
  public readonly managerId: BelongsToAccessor<
    Employee,
    typeof Employee.prototype.id
  >;
  constructor(
    @inject('datasources.postgresDb') dataSource: PostgresDbDataSource,
    @repository.getter('EmployeeRepository')
    managerRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Employee, dataSource);
    this.managerId = this.createBelongsToAccessorFor(
      'manager',
      managerRepositoryGetter,
    );
  }
}
