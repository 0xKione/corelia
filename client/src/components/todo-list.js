import {TodoService} from './../services/todo-service-mock';

export class TodoList {
  static inject() { return [TodoService]; }

  constructor(todoService) {
    this.todoService = todoService;
    this.newTodoDescription = '';
    this.todos = [];
  }

  created() {
    this.todoService.getTodos()
      .then(result => {
        this.todos = result;
      });
  }

  addTodo() {
    if (this.newTodoDescription) {
      this.todoService.addTodo(this.newTodoDescription)
        .then(result => {
          this.todos.push(result);
        });
      this.newTodoDescription = '';
    }
  }

  removeTodo(todo) {
    this.todoService.removeTodo(todo)
      .then(result => {
        let index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
      });
  }
}
