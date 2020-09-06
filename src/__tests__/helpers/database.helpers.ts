import {
  DepartmentRepository,
  EmployeeRepository,
  LocationRepository,
  TitleChangeRepository,
} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';

export async function givenEmptyDatabase() {
  let employeeRepository: EmployeeRepository;
  let departmentRepository: DepartmentRepository;
  let locationRepository: LocationRepository;
  let titleChangeRepository: TitleChangeRepository;

  employeeRepository = new EmployeeRepository(
    testdb,
    async () => departmentRepository,
  );

  departmentRepository = new DepartmentRepository(
    testdb,
    async () => locationRepository,
  );

  locationRepository = new LocationRepository(testdb);

  titleChangeRepository = new TitleChangeRepository(
    testdb,
    async () => employeeRepository,
  );

  await employeeRepository.deleteAll();
  await departmentRepository.deleteAll();
  await locationRepository.deleteAll();
  await titleChangeRepository.deleteAll();
}
