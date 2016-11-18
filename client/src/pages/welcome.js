import {inject} from 'aurelia-framework';

import {I18N} from 'aurelia-i18n';
import {AuthService} from 'aurelia-auth';

@inject(I18N, AuthService)
export class Welcome {
  constructor(i18n, authService) {
    this.i18n = i18n;
    this.authService = authService;
    this.user = {};

    this.message = this.i18n.tr('welcome_message');

    if (this.authService.isAuthenticated()) {
      let token = JSON.parse(window.localStorage.token_data);  // TODO: Don't hardcode me
      this.innerMessage = this.i18n.tr('signed_in_message');
      this.user = token.user;
    } else {
      this.innerMessage = this.i18n.tr('sign_in_message');
      this.user.username = 'Anonymous';
    }
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
