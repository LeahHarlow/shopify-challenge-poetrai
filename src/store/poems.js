const ADD_POEM = 'ADD_POEM';
const CLEAR_POEMS = 'CLEAR_POEMS';
const CLEAR_SINGLE_POEM = 'CLEAR_SINGLE_POEM';

export const _addPoem = (promptAndPoem) => {
  return {
    type: ADD_POEM,
    promptAndPoem,
  };
};

export const _clearPoems = (poems) => {
  return {
    type: CLEAR_POEMS,
    poems,
  };
};

export const _clearSinglePoem = (poemKey) => {
  return {
    type: CLEAR_POEMS,
    poemKey,
  };
};

export const addPoem = (promptAndPoem) => {
  return (dispatch) => {
    dispatch(_addPoem(promptAndPoem));
  };
};

export const clearPoems = (poems) => {
  return (dispatch) => {
    dispatch(_clearPoems(poems));
  };
};

export const clearSinglePoem = (poemKey) => {
  return (dispatch) => {
    dispatch(_clearSinglePoem(poemKey));
  };
};

const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POEM:
      return [action.promptAndPoem, ...state];
    case CLEAR_POEMS:
      return (state = []);
      case CLEAR_SINGLE_POEM:
        return state.filter((poemKey) => poemKey !== action.poemKey);
    default:
      return state;
  }
};
