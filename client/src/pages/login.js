import {inject} from 'aurelia-framework';

import {I18N} from 'aurelia-i18n';
import {AuthService} from 'aurelia-auth';

@inject(I18N, AuthService)
export class Login {
  constructor(i18n, authService) {
    this.i18n = i18n;
    this.authService = authService;

    this.message = this.i18n.tr('login_message');
  }

  authenticate(name) {
    return this.authService.authenticate(name, false, null)
      .then((response)=>{
        console.log('auth response');
        console.log(response);
        window.localStorage.setItem('token_data', JSON.stringify(response));  // TODO: Don't hardcode me
        this.authService.setToken(response);
      });
  }
}
