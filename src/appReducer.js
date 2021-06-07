import { combineReducers } from 'redux';
import filtersReducer from './page/filters/reducer';
import selectedItemReducer from './page/selectedItem/reducer';
import basketReducer from './page/basket/reducer';
import errorReducer from './page/error/reducer';

const reducers = {
  filters: filtersReducer,
  selectedItem: selectedItemReducer,
  basket: basketReducer,
  error: errorReducer,
};

export default combineReducers(reducers);