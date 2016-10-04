import {EventAggregator} from 'aurelia-event-aggregator';
import {ContactService} from '../services/contact-service-mock';
import {ContactUpdated, ContactViewed} from '../lib/contact-events';
import {inject} from 'aurelia-framework';

let areEqual = function(obj1, obj2) {
  return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
};

@inject(ContactService, EventAggregator)
export class ContactDetail {
  constructor(contactService, eventAggregator) {
    this.contactService = contactService;
    this.eventAggregator = eventAggregator;
    this.routeConfig = null;
  }

  activate(params, routerConfig) {
    this.routerConfig = routerConfig;

    return this.contactService.getContactDetails(params.id)
      .then(result => {
        this.contact = result;
        this.routerConfig.navModel.setTitle(result.firstName);
        this.originalContact = JSON.parse(JSON.stringify(result));
        this.eventAggregator.publish(new ContactViewed(this.contact));
      });
  }

  get canSave() {
    return this.contact.firstName && this.contact.lastName && !this.contactService.isRequesting;
  }

  save() {
    this.contactService.saveContact(this.contact)
      .then(result => {
        this.contact = result;
        this.routerConfig.navModel.setTitle(result.firstName);
        this.originalContact = JSON.parse(JSON.stringify(result));
        this.eventAggregator.publish(new ContactUpdated(this.contact));
      });
  }

  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)) {
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if (!result) {
        this.eventAggregator.publish(new ContactViewed(this.contact));
      }

      return result;
    }

    return true;
  }
}
