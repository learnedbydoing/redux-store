export class Store {
  //goals:
  //contain subsrcibers
  //manage reducers
  //contain the state

  private subscribers: Function[]; //function array
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any }; //object with string key and any content (array, object, string..)

  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers; //get internal access to reducers inside the store
    this.state = this.reduce(initialState, {}); // w/o any action reducer will just
  }

  get value() {
    return this.state; // console.log(store.value) => returns this.state
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
  }

  private reduce(state, action) {
    const newState = {};
    for (const prop in this.reducers) {
      //dynamically adding properties (=keys) of reducers object to newState obj.
      newState[prop] = this.reducers[prop](state[prop], action);
    }

    return newState;
  }
}
