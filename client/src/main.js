import 'fetch';
import Backend from 'i18next-xhr-backend';

import config from './authentication/config';

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
    })
    .plugin('aurelia-auth', (baseConfig) => {
      baseConfig.configure(config);
    });

  aurelia.start().then(() => aurelia.setRoot());
}
