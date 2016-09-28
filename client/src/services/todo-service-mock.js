import {BaseService} from './base-service';

import {Todo} from './../lib/models/todo';

let latency = 200;

let todos = [{
  _id: 1,
  description: 'Run NPM',
  done: true
}, {
  _id: 2,
  description: 'Run Bower',
  done: true
}, {
  _id: 3,
  description: 'Run Gulp',
  done: true
}, {
  _id: 4,
  description: 'Get this &$*#ing app working',
  done: false
}];

let id = todos.length + 1;

export class TodoService extends BaseService
{
  constructor() {
    super();
  }

  getTodos() {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        let results = todos.map(t => {
          return new Todo(t._id, t.description, t.done);
        });

        this.isRequesting = false;
        resolve(results);
      }, latency);
    });
  }

  addTodo(description) {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let instance = new Todo(id++, description, false);

        todos.push(instance);

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }

  removeTodo(todo) {
    if (this.isRequesting) {
      return;
    }

    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(todo));
        let found = this.todos.filter(t => t.id === instance.id)[0];

        if (found) {
          let index = todos.indexOf(found);
          todos.splice(index, 1);
          resolve(found);
        } else {
          reject('Unable to find Todo');
        }

        this.isRequesting = false;
      }, latency);
    });
  }
}
