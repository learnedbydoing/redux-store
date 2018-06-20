import * as fromActions from './actions';

export const initialState = { //why defined in reducer? Shouldn't be defined somewhere else?
  loaded: false,
  loading: false,
  data: [{ label: 'Eat pizza', complete: false }]
};

export function reducer(
  state = initialState,
  action: { type: string; payload: any })
{
  switch (action.type) {

    case fromActions.ADD_TODO : {
      const todo = action.payload;
      const data = [...state.data, todo]; //representation of the new state

      //now we need to return the new state (it is object!)
      return {
        ...state, // merging the original state, including other properties (loaded, loading)
        data: data //create "data" property with value of `const data`, which holds our new todo collection
      };
    }

    case fromActions.REMOVE_TODO: {
      const data = state.data.filter( //filter returns new array without filtered items
        todo => todo.label !== action.payload.label
      );
      return {
        ...state, //spread original object (loaded, loading properties)
        data //replace data property with new content; shortcut for `data:data`
      };

    }
  }

  return state;
}
