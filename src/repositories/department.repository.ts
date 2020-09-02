import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Department, DepartmentRelations, Employee} from '../models';
import {EmployeeRepository} from './employee.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {
  public readonly employees: HasManyRepositoryFactory<
    Employee,
    typeof Department.prototype.id
  >;
  constructor(
    @inject('datasources.postgresDb') dataSource: PostgresDbDataSource,

    // use Dependency Injection to receive a getter function for obtaining an instance of the target repository (for hasMany)
    @repository.getter('EmployeeRepository')
    employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Department, dataSource);

    // create a HasManyRepository factory
    this.employees = this.createHasManyRepositoryFactoryFor(
      'employees',
      employeeRepositoryGetter,
    );

    // register inclusion resolver to complete hasMany relation
    this.registerInclusionResolver(
      'employees',
      this.employees.inclusionResolver,
    );
  }
}
