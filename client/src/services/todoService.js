export class ContactService
{
  constructor() {
    this.isRequesting = false;
  }

  getTodos() {
    this.isRequesting = true;
  }
}
