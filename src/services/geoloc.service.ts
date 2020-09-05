import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {GeolocDataSource} from '../datasources';

export interface GeolocService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getAddressFromAPI(
    lat: string,
    lon: string,
  ): Promise<any>;
}

export class GeolocProvider implements Provider<GeolocService> {
  constructor(
    // geoloc must match the name property in the datasource json file
    @inject('datasources.geoloc')
    protected dataSource: GeolocDataSource = new GeolocDataSource(),
  ) {}

  value(): Promise<GeolocService> {
    return getService(this.dataSource);
  }
}
