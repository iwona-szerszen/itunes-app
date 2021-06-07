import CONSTANTS from '../../utils/CONSTANTS';
import { UPDATE_ENTITY, UPDATE_SEARCH_TEXT, UPDATE_RESULTS, START_WAITING, STOP_WAITING } from './actions';

export const getStateRoot = (state) => state.filters;

const initialState = {
  entity: CONSTANTS.ENTITY.ARTIST,
	searchText: '',
  results: [],
  isWaiting: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ENTITY:
      return { ...state, entity: action.entity };
    case UPDATE_SEARCH_TEXT:
      return { ...state, searchText: action.searchText };
    case UPDATE_RESULTS:
      return { ...state, results: action.results };
    case START_WAITING:
      return { ...state, isWaiting: true };
    case STOP_WAITING:
      return { ...state, isWaiting: false };
    default:
      return state;
  }
}

export default reducer;
