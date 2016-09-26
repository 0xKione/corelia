let latency = 1000;

let todos = [{
  id: 1,
  description: 'Run NPM',
  done: true
}, {
  id: 2,
  description: 'Run Bower',
  done: true
}, {
  id: 3,
  description: 'Run Gulp',
  done: true
}, {
  id: 4,
  description: 'Get this &$*#ing app working',
  done: false
}];

export class TodoService
{
  constructor() {
    this.isRequesting = false;
  }

  getTodos() {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        let results = todos.map(t => {
          return {
            id: t.id,
            description: t.description,
            done: t.done
          };
        });

        this.isRequesting = false;
        resolve(results);
      }, latency);
    });
  }
}
