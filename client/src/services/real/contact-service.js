import {BaseService} from './base-service';
import {HttpClient} from 'aurelia-http-client';

import {Contact} from '../lib/models/contact';

export class ContactService extends BaseService
{
  static inject() { return [HttpClient]; }

  constructor(http) {
    super(http);
  }

  getContactList() {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;

    return new Promise((resolve, reject) => {
      this.http.get('api/contacts/')
        .then(data => {
          let results = data.map(c => {
            return new Contact(c._id, c.firstName, c.lastName, c.email, c.phoneNumber);
          });

          this.isRequesting = false;
          resolve(results);
        })
        .catch(err => {
          this.isRequesting = false;
          reject(err);
        });
    });
  }

  getContactDetails(contactId) {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;

    return new Promise((resolve, reject) => {
      this.http.get('api/contacts/' + contactId)
        .then(data => {
          this.isRequesting = false;
          resolve(data);
        })
        .catch(err => {
          this.isRequesting = false;
          reject(err);
        });
    });
  }

  saveContact(contact) {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;

    return new Promise((resolve, reject) => {
      this.http.post('api/contacts/' + contact.id, contact)
        .then(data => {
          this.isRequesting = false;
          resolve(data);
        })
        .catch(err => {
          this.isRequesting = false;
          reject(err);
        });
    });
  }
}
