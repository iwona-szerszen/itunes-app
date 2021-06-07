import { UPDATE_ARTIST, UPDATE_ALBUM, RESET } from './actions';

export const getStateRoot = (state) => state.selectedItem;

const initialState = {
  artist: {
    data: {
      artistId: 0,
    },
    albums: [],
  },
  album: {
    data: {
      collectionId: 0,
    },
    songs: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ARTIST:
      return { ...state, artist: { data: action.data, albums: action.albums } };
    case UPDATE_ALBUM:
      return { ...state, album: { data: action.data, songs: action.songs } };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
