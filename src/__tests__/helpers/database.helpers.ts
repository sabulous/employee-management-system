import {
  DepartmentRepository,
  EmployeeRepository,
  LocationRepository,
  TitleChangeRepository,
} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';

export async function givenEmptyDatabase() {
  const employeeRepository = new EmployeeRepository(
    testdb,
    async () => departmentRepository,
  );

  const departmentRepository = new DepartmentRepository(
    testdb,
    async () => locationRepository,
  );

  const locationRepository = new LocationRepository(testdb);

  const titleChangeRepository = new TitleChangeRepository(
    testdb,
    async () => employeeRepository,
  );

  await employeeRepository.deleteAll();
  await departmentRepository.deleteAll();
  await locationRepository.deleteAll();
  await titleChangeRepository.deleteAll();
}
