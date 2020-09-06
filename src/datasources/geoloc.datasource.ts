import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'geoloc',
  connector: 'rest',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'https://api.bigdatacloud.net/data/reverse-geocode-client',
        query: {
          latitude: '{latitude}',
          longitude: '{longitude}',
          localityLanguage: 'en',
        },
        responsePath: '$',
      },
      functions: {
        getAddressFromAPI: ['latitude', 'longitude'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class GeolocDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'geoloc';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.geoloc', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
