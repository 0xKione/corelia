import {inject} from 'aurelia-framework';

import {I18N} from 'aurelia-i18n';
import {AuthService} from 'aurelia-auth';

@inject(I18N, AuthService)
export class Contacts {
  constructor(i18n, authService) {
    this.i18n = i18n;
    this.authService = authService;
    this.userName = 'User';

    this.message = this.i18n.tr('welcome_message');
    this.innerMessage = this.i18n.tr('sign_in_message');
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
