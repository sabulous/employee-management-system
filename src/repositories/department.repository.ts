import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {PostgresDbDataSource} from '../datasources';
import {Department, DepartmentRelations, Location} from '../models';
import {LocationRepository} from './location.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {
  public readonly locationId: BelongsToAccessor<
    Location,
    typeof Location.prototype.id
  >;
  constructor(
    @inject('datasources.postgresDb') dataSource: PostgresDbDataSource,
    @repository.getter('LocationRepository')
    locationRepositoryGetter: Getter<LocationRepository>,
  ) {
    super(Department, dataSource);

    this.locationId = this.createBelongsToAccessorFor(
      'location',
      locationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'location',
      this.locationId.inclusionResolver,
    );
  }
}
