import {inject} from 'aurelia-framework';

import {CustomHttpClient} from '../lib/custom-http-client';

@inject(CustomHttpClient)
export class BaseService
{
  constructor(httpClient) {
    this.isRequesting = false;

    this.http = httpClient;
  }

  makeRequest(method, endpoint, params) {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;

    let fetchData = {
      method: method
    };

    if (params) {
      fetchData.body = JSON.stringify(params);
    }

    return this.http.fetch(endpoint, fetchData)
      .then((response) => {
        this.isRequesting = false;
        return response.data;
      })
      .catch((error) => {
        this.isRequesting = false;
        throw error;
      });
  }
}
