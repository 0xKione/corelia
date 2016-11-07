import {I18N} from 'aurelia-i18n';
import {inject} from 'aurelia-framework';

@inject(I18N)
export class NoSelection {
  constructor(i18n) {
    this.i18n = i18n;

    this.message = this.i18n.tr('no_select_message');
  }
}
