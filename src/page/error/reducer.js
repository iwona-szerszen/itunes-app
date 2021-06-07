import { SHOW_MODAL, HIDE_MODAL} from './actions';

export const getStateRoot = (state) => state.error;

const initialState = {
  isModalVisible: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, isModalVisible: true };
    case HIDE_MODAL:
      return { ...state, isModalVisible: false };
    default:
      return state;
  }
}

export default reducer;