import { ADD_ITEM } from './actions';

export const getStateRoot = (state) => state.basket;

const initialState = {
  items: [],
  ids: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.item], ids: [...state.ids, action.item.id] };
    default:
      return state;
  }
}

export default reducer;