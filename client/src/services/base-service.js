import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class BaseService
{
  constructor(http) {
    this.isRequesting = false;

    if (http) {
      http.configure(config => {
        config.withInterceptor({
          request(request) {
            console.log('Intercepted request using method: ${request.method} with URL: ${request.url}');
            return request;
          },
          response(response) {
            switch (response.statusCode) {
            case 200:
              let responseData = JSON.parse(response.response);

              if (responseData.message) {
                // TODO: Add logging service
                alert(responseData.message);
              }

              return responseData.data;
            case 500:
              return response.textStatus;
            default:
              return response;
            }
          },
          error(error) {
            console.log('Error: ${error}');
          }
        });
      });

      this.http = http;
    }
  }
}
