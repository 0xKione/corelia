import {HttpClient} from 'aurelia-fetch-client';
import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';

import config from '../authentication/config';

@inject(AuthService)
export class CustomHttpClient extends HttpClient
{
  constructor(authService) {
    super();

    this.configure(httpConfig => {
      httpConfig
        .withBaseUrl(config.baseUrl)
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor(authService.tokenInterceptor)
        .withInterceptor({
          request(request) {
            console.log('Requesting ' + request.method + ' ' + request.url);
            return request;
          },
          response(response) {
            console.log('Recieved ' + response.status + ' ' + response.url);
            if (response.status >= 200 && response.status < 300) {
              return response.json();
            }

            let error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
        });
    });
  }
}
