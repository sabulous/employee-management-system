import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Department, Employee, EmployeeRelations} from '../models';
import {DepartmentRepository} from './department.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {
  /* eslint-disable-next-line */
  [x: string]: any;
  public readonly managerId: BelongsToAccessor<
    Employee,
    typeof Employee.prototype.id
  >;
  public readonly departmentId: BelongsToAccessor<
    Department,
    typeof Department.prototype.id
  >;

  constructor(
    @inject('datasources.postgresDb') dataSource: PostgresDbDataSource,

    @repository.getter('DepartmentRepository')
    departmentRepositoryGetter: Getter<DepartmentRepository>,
  ) {
    super(Employee, dataSource);

    // To break circular dependency, Getter.fromValue(this) is used.
    this.managerId = this._createBelongsToAccessorFor(
      'manager',
      Getter.fromValue(this),
    );
    this.registerInclusionResolver('manager', this.managerId.inclusionResolver);

    this.departmentId = this.createBelongsToAccessorFor(
      'department',
      departmentRepositoryGetter,
    );
    this.registerInclusionResolver(
      'department',
      this.departmentId.inclusionResolver,
    );
  }
}
