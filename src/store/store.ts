export class Store {
  //goals:
  //contain subsrcibers
  //manage reducers
  //contain the state

  private subscribers: Function[]; //function array
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any }; //object with string key and any content (array, object, string..)

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers; //get internal access to reducers inside the store
    this.state = this.reduce(initialState, {}); // w/o any action reducer will just load the initialState
  }

  get value() {
    return this.state; // console.log(store.value) => returns this.state
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    this.notify(); //get data initially after subscribing
    return () => {
      this.subscribers = this.subscribers.filter(subscriber => subscriber !== fn); //???
    }
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
    this.notify(); //notify after state has been updated
  }

  private notify() {
    //loop through subscribers list and pass them the new state
    this.subscribers.forEach(fn => fn(this.value)); //this.value is this.state
  }

  private reduce(state, action) {
    const newState = {};
    for (const prop in this.reducers) {
      //dynamically adding properties (=keys) of reducers object to newState obj.
      newState[prop] = this.reducers[prop](state[prop], action); //not getting this fully yet
    }

    return newState;
  }
}
