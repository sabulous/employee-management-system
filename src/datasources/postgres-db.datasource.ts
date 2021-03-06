import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'postgresDb',
  connector: 'postgresql',
  url: 'postgres://postgres:somestrongpassword@db:5432/emsdb',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'somestrongpassword',
  database: 'emsdb',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostgresDbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postgresDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postgresDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
