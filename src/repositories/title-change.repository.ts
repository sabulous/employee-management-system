import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Employee, TitleChange, TitleChangeRelations} from '../models';
import {EmployeeRepository} from './employee.repository';

export class TitleChangeRepository extends DefaultCrudRepository<
  TitleChange,
  typeof TitleChange.prototype.id,
  TitleChangeRelations
> {
  public readonly employeeId: BelongsToAccessor<
    Employee,
    typeof Employee.prototype.id
  >;

  constructor(
    @inject('datasources.postgresDb') dataSource: PostgresDbDataSource,
    @repository.getter('EmployeeRepository')
    employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(TitleChange, dataSource);

    this.employeeId = this.createBelongsToAccessorFor(
      'employee',
      employeeRepositoryGetter,
    );
    this.registerInclusionResolver(
      'employee',
      this.employeeId.inclusionResolver,
    );
  }
}
