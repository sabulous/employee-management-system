import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {EmployeeRepository, TitleChangeRepository} from './repositories';
import {MySequence} from './sequence';
import {ManagerService, SalaryService} from './services';
import {DepartmentService} from './services/department.service';
import {EmployeeService} from './services/employee.service';

export {ApplicationConfig};

export class EmployeeManagementSystemApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    /*
    When a binding is created via .toClass(), Context will create
    a new instance of the class when resolving the value of this binding,
    injecting constructor arguments and property values as configured via
    @inject decorator.
    */

    // service bindings
    this.bind('employee.service').toClass(EmployeeService);
    this.bind('manager.service').toClass(ManagerService);
    this.bind('department.service').toClass(DepartmentService);
    this.bind('salary.service').toClass(SalaryService);

    // repository bindings
    this.bind('employee.repository').toClass(EmployeeRepository);
    this.bind('title-change.repository').toClass(TitleChangeRepository);
  }
}
