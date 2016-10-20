import {BaseService} from './base-service';
import {Contact} from '../lib/models/contact';

let latency = 200;

let contacts = [{
  _id: '1',
  firstName: 'John',
  lastName: 'Tolkien',
  email: 'tolkien@inklings.com',
  phoneNumber: '867-5309'
}, {
  _id: '2',
  firstName: 'Clive',
  lastName: 'Lewis',
  email: 'lewis@inklings.com',
  phoneNumber: '867-5309'
}, {
  _id: '3',
  firstName: 'Owen',
  lastName: 'Barfield',
  email: 'barfield@inklings.com',
  phoneNumber: '867-5309'
}, {
  _id: '4',
  firstName: 'Charles',
  lastName: 'Williams',
  email: 'williams@inklings.com',
  phoneNumber: '867-5309'
}, {
  _id: '5',
  firstName: 'Roger',
  lastName: 'Green',
  email: 'green@inklings.com',
  phoneNumber: '867-5309'
}];

let id = contacts.length + 1;

export class ContactService extends BaseService {
  constructor() {
    super();
  }

  getContactList() {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = contacts.map(c => {
          return new Contact(c._id, c.firstName, c.lastName, c.email);
        });

        this.isRequesting = false;
        resolve(results);
      }, latency);
    });
  }

  getContactDetails(contactId) {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = contacts.filter(c => c._id === contactId)[0];
        found = JSON.parse(JSON.stringify(found));

        this.isRequesting = false;
        resolve(found);
      }, latency);
    });
  }

  saveContact(contact) {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(contact));
        let found = contacts.filter(c => c.id === instance.id)[0];

        if (found) {
          let index = contacts.indexOf(found);
          contacts[index] = instance;
        } else {
          instance._id = id++;
          contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
