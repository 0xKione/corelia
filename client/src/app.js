import {ContactService} from './services/contact-service';
import {inject} from 'aurelia-framework';

@inject(ContactService)
export class App {
  constructor(contactService) {
    this.router = null;
    this.contactService = contactService;
  }

  configureRouter(config, router) {
    config.title = 'Contacts';

    config.map([
      { route: '', moduleId: 'dist/pages/no-selection', title: 'Select Contact' },
      { route: 'contacts/:id', moduleId: 'dist/pages/contact-detail', name: 'contacts' }
    ]);

    this.router = router;
  }
}
