import {inject} from 'aurelia-framework';

import {BaseService} from './base-service';
import {CustomHttpClient} from '../lib/custom-http-client';
import {Contact} from '../lib/models/contact';

@inject(CustomHttpClient)
export class ContactService extends BaseService
{
  constructor(httpClient) {
    super(httpClient);
  }

  getContactList() {
    return new Promise((resolve, reject) => {
      super.makeRequest('GET', '/api/contacts')
        .then(data => {
          let results = data.map(c => {
            return new Contact(c._id, c.firstName, c.lastName, c.email, c.phoneNumber);
          });
          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getContactDetails(contactId) {
    return new Promise((resolve, reject) => {
      super.makeRequest('GET', '/api/contacts/' + contactId)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
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
