import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {GeolocService} from '../services';

export class GeolocController {
  constructor(
    @inject('geoloc.service') protected geolocService: GeolocService,
  ) {}

  // gets latitude and longitude and returns {city, country, postcode, address}
  @get('/address')
  async getAddressFromAPI(
    @param.query.string('lat') lat: string,
    @param.query.string('lon') lon: string,
  ): Promise<any> {
    console.log('GET /address');
    const response = await this.geolocService.getAddressFromAPI(lat, lon);
    return {
      city: response[0].city || 'N/A',
      country: response[0].country || 'N/A',
      postcode: response[0].postal || 'N/A',
      address: response[0].staddress || 'N/A',
    };
  }
}
