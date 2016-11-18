export class ChildRouter {
  heading = 'Child Router';

  configureRouter(config, router) {
    config.map([
      { route: 'contacts', name: 'contacts', moduleId: 'dist/pages/contacts', title: 'Contacts', auth: true },
      { route: 'contacts/:id', name: 'details', moduleId: 'dist/components/contact-detail', auth: true },
      { route: 'child-router',  name: 'child-router', moduleId: 'dist/components/child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
