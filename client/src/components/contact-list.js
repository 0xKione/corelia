import {EventAggregator} from 'aurelia-event-aggregator';
import {ContactService} from '../services/contact-service';
import {ContactUpdated, ContactViewed} from '../lib/contact-events';
import {inject} from 'aurelia-framework';

@inject(ContactService, EventAggregator)
export class ContactList {
  constructor(contactService, eventAggregator) {
    this.contactService = contactService;
    this.eventAggregator = eventAggregator;
    this.contacts = [];

    eventAggregator.subscribe(ContactViewed, msg => this.select(msg.contact));
    eventAggregator.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      let found = this.contacts.find(c => c.id === id);
      Object.assign(found, msg.contact);
    });
  }

  created() {
    this.contactService.getContactList()
      .then(results => this.contacts = results);
  }

  select(contact) {
    this.selectedId = contact.id;
    return true;    // Perform the default action
  }
}
