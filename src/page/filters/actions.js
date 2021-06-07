import { batch } from 'react-redux';
import { searchEntityItems } from '../../utils/helpers';
import { reset } from '../selectedItem/actions';
import { showModal } from '../error/actions';
import { getStateRoot } from './reducer';

export const UPDATE_ENTITY = 'FILTERS_UPDATE_ENTITY';
export const UPDATE_SEARCH_TEXT = 'FILTERS_UPDATE_SEARCH_TEXT';
export const UPDATE_RESULTS = 'FILTERS_UPDATE_RESULTS';
export const START_WAITING = 'FILTERS_START_WAITING';
export const STOP_WAITING = 'FILTERS_STOP_WAITING';

export const updateEntity = (entity) => ({
	type: UPDATE_ENTITY,
	entity,
});

export const updateSearchText = (searchText) => ({
	type: UPDATE_SEARCH_TEXT,
	searchText,
});

export const updateResults = (results) => ({
	type: UPDATE_RESULTS,
	results,
});

export const startWaiting = () => ({
	type: START_WAITING,
});

export const stopWaiting = () => ({
	type: STOP_WAITING,
});

export const fetchResults = (searchText, entity) => {
  return async (dispatch) => {
		dispatch(startWaiting());
    try {
      const response = await searchEntityItems(searchText, entity);
      const { results } = await response.json();
      dispatch(updateResults(results));
    } catch(err) {
      console.error(err);
			dispatch(showModal());
    } finally {
			dispatch(stopWaiting());
		}
  }
}

export const setEntity = (entity) => {
	return (dispatch, getState) => {
		const searchText = getStateRoot(getState()).searchText;
		batch(() => {
			dispatch(updateEntity(entity));
			dispatch(reset());
			dispatch(updateResults([]));
			if (searchText) {
				return dispatch(fetchResults(searchText, entity));
			}
		});
	}
}

export const setSearchText = (searchText) => {
	return (dispatch, getState) => {
		const entity = getStateRoot(getState()).entity;
		batch(() => {
			dispatch(updateSearchText(searchText));
			if (searchText) {
				return dispatch(fetchResults(searchText, entity));
			}
			dispatch(updateResults([]));
			dispatch(reset());
		});
	}
}
