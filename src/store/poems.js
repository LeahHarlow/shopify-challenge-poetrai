const ADD_POEM = 'ADD_POEM';
const CLEAR_POEMS = 'CLEAR_POEMS';
const CLEAR_SINGLE_POEM = 'CLEAR_SINGLE_POEM';

export const _addPoem = (promptsAndPoems) => {
  return {
    type: ADD_POEM,
    promptsAndPoems,
  };
};

export const _clearPoems = (poems) => {
  return {
    type: CLEAR_POEMS,
    poems,
  };
};

export const _clearSinglePoem = (prompt) => {
  return {
    type: CLEAR_SINGLE_POEM,
    prompt,
  };
};

export const addPoem = (promptsAndPoems) => {
  return (dispatch) => {
    dispatch(_addPoem(promptsAndPoems));
  };
};

export const clearPoems = (poems) => {
  return (dispatch) => {
    dispatch(_clearPoems(poems));
  };
};

export const clearSinglePoem = (prompt) => {
  return (dispatch) => {
    dispatch(_clearSinglePoem(prompt));
  };
};

const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POEM:
      return [action.promptsAndPoems, ...state];
    case CLEAR_POEMS:
      return (state = []);
    case CLEAR_SINGLE_POEM:
      return state.filter((promptsAndPoems) => promptsAndPoems.prompt !== action.prompt);
    default:
      return state;
  }
};
