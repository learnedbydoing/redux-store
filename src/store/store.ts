export class Store {
  //goals:
  //contain subsrcibers
  //manage reducers
  //contain the state

  private subscribers: Function[]; //function array
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any}  //object with string key and any content (array, object, string..)

  constructor(reducers = {}, initialState = {}) {
    this.state = initialState;
  }

  get value() {
    return this.state; // console.log(store.value) => returns this.state
  }
  dispatch(action) {
    this.state = {
      ...this.state,
      todos: [...this.state.todos, action.payload]
    };
    console.log(this.state);
  }
}



