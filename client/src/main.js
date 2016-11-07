//import {I18N} from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-i18n', (instance) => {
      instance.i18next.use(Backend);

      return instance.setup({
        backend: {
          loadPath: './locales/en/translation.json'
        },
        lng: 'en',
        attributes: ['t', 'i18n'],
        fallbackLng: 'en',
        debug: false
      });
    });

  aurelia.start().then(() => aurelia.setRoot());
}
