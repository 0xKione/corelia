import {inject} from 'aurelia-framework';
import {FetchConfig, AuthorizeStep} from 'aurelia-auth';

import {ContactService} from './services/contact-service';

@inject(FetchConfig, ContactService)
export class App {
  constructor(fetchConfig, contactService) {
    this.router = null;
    this.fetchConfig = fetchConfig;
    this.contactService = contactService;
  }

  activate() {
    this.fetchConfig.configure();
  }

  configureRouter(config, router) {
    config.title = 'Contacts';

    config.addPipelineStep('authorize', AuthorizeStep);

    config.map([
      { route: ['', 'welcome'], moduleId: 'dist/pages/welcome', title: 'Welcome' },
      { route: 'contacts', name: 'contacts', moduleId: 'dist/pages/contacts', title: 'Contacts', auth: true },
      { route: 'contacts/:id', name: 'details', moduleId: 'dist/components/contact-detail', auth: true },
      { route: 'login', moduleId: 'dist/pages/login', title: 'Login', auth: false },
      { route: 'child-router',  name: 'child-router', moduleId: 'dist/components/child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
