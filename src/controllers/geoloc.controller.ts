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
    @param.query.string('latitude') latitude: string,
    @param.query.string('longitude') longitude: string,
    /* eslint-disable-next-line */
  ): Promise<any> {
    console.log('GET /address');
    const response = await this.geolocService.getAddressFromAPI(
      latitude,
      longitude,
    );

    let cityName;
    if (
      response[0].localityInfo.administrative &&
      response[0].localityInfo.administrative.length > 2
    ) {
      cityName = response[0].localityInfo.administrative[2].isoName;
    }

    return {
      city: cityName || response[0].city || 'N/A',
      country: response[0].countryName || 'N/A',
      postcode: response[0].postcode || 'N/A',
      address: response[0].principalSubdivision || 'N/A',
    };
  }
}
