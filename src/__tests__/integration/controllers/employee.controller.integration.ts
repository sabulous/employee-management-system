import {expect} from '@loopback/testlab';
import {createStubInstance} from '@loopback/testlab/dist/sinon';
import sinon from 'sinon';
import {EmployeeBuilder} from '../../../builders/employee.builder';
import {EmployeeController} from '../../../controllers/employee.controller';
import {EmployeeRepository} from '../../../repositories';
import {EmployeeService} from '../../../services';
import {givenEmptyDatabase} from '../../helpers/database.helpers';

describe('EmployeeController (integration)', () => {
  before(givenEmptyDatabase);

  describe('ProductController', () => {
    let repository: EmployeeRepository;
    beforeEach(givenStubbedRepository);
    let service: EmployeeService;
    beforeEach(givenStubbedService);

    // unit tests
    describe('findById(id)', () => {
      it('retrieves employee by id', async () => {
        const controller = new EmployeeController(repository, service);

        const eb: EmployeeBuilder = new EmployeeBuilder();
        const employee = eb
          .id(1)
          .name('Sabri')
          .surname('Sahin')
          .email('sabsah@gmail.com')
          .phone('0505')
          .startdate('2020-09-02T16:45:56.615Z')
          .salary(10000)
          .title('Software Engineer')
          .managerId(4)
          .departmentId(1)
          .build();

        repository.stubs.findById.withArgs(1).resolves(employee);

        const details = await controller.findById(1);

        expect(details).to.containEql(employee);

        sinon.assert.calledWithMatch(repository.stubs.findById.withArgs(1));
      });
    });

    function givenStubbedRepository() {
      repository = createStubInstance(EmployeeRepository);
    }
    function givenStubbedService() {
      service = createStubInstance(EmployeeService);
    }
  });
});
