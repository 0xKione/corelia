import {BaseService} from './base-service';

import {Todo} from './../lib/models/todo';
import {HttpClient} from 'aurelia-http-client';


export class TodoService extends BaseService
{
  static inject() { return [HttpClient]; }

  constructor(http) {
    super(http);
  }

  getTodos() {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;

    return new Promise((resolve, reject) => {
      this.http.get('api/todos/')
        .then(data => {
          let results = data.map(t => {
            return new Todo(t._id, t.description, t.done);
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

  addTodo(description) {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;

    return new Promise((resolve, reject) => {
      this.http.post('api/todos/', { description: description, done: false })
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

  removeTodo(todo) {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;

    return new Promise((resolve, reject) => {
      this.http.delete('api/todos/' + todo.id)
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
