import { batch } from 'react-redux'
import CONSTANTS from '../../utils/CONSTANTS';
import { lookupSelectedEntityItem } from '../../utils/helpers';
import { updateResults } from '../filters/actions';
import { showModal } from '../error/actions';

export const UPDATE_ARTIST = 'SELECTED_ITEM_UPDATE_ARTIST';
export const UPDATE_ALBUM = 'SELECTED_ITEM_UPDATE_ALBUM';
export const RESET = 'SELECTED_ITEM_RESET';

export const updateArtist = (data, albums) => ({
	type: UPDATE_ARTIST,
	data,
  albums,
});

export const updateAlbum = (data, songs) => ({
  type: UPDATE_ALBUM,
  data,
  songs,
});

export const reset = () => ({
	type: RESET,
});

export const fetchArtist = (artistId) => {
  return async (dispatch) => {
    try {
      const uniqueNamedAlbums = [];
      const response = await lookupSelectedEntityItem(artistId, CONSTANTS.ENTITY.ALBUM);
      const { results } = await response.json();
      const data = results.find((item) => item.wrapperType === CONSTANTS.WRAPPER_TYPE.ARTIST);
      const albums = results.filter((item) => item.wrapperType === CONSTANTS.WRAPPER_TYPE.COLLECTION && item.trackCount > 1);
      albums.forEach((album) => {
        if (!uniqueNamedAlbums.find((item) => item.collectionName === album.collectionName)) {
          uniqueNamedAlbums.push(album);
        }
      });
      batch(() => {
        dispatch(updateArtist(data, uniqueNamedAlbums));
        dispatch(updateResults([]));
      });
    } catch(err) {
      console.error(err);
			dispatch(showModal());
    }
  }
}

export const fetchAlbum = (collectionId) => {
  return async (dispatch) => {
    try {
      const response = await lookupSelectedEntityItem(collectionId, CONSTANTS.ENTITY.SONG);
      const { results } = await response.json();
      const data = results.find((item) => item.wrapperType === CONSTANTS.WRAPPER_TYPE.COLLECTION);
      const songs = results.filter((item) => item.wrapperType === CONSTANTS.WRAPPER_TYPE.TRACK);
      batch(() => {
        dispatch(updateAlbum(data, songs));
        dispatch(updateResults([]));
      });
    } catch(err) {
      console.error(err);
			dispatch(showModal());
    }
  }
}