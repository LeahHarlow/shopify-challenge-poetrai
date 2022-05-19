import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSinglePoem } from '../store/poems';

const PreviousPoems = () => {
  //read previously made poems from the redux store
  const promptsAndPoems = useSelector((state) => {
    return state.promptsAndPoems || '';
  });

  const dispatch = useDispatch();

  //If there are no poems created yet prompt the user to generate their first poem, otherwise show the previous poems.
  return (
    <>
      {promptsAndPoems.length ? (
        <div id='response-containter'>
          {Object.keys(promptsAndPoems).map((poemKey) => (
            <div className='promptsAndPoems' key={poemKey}>
              <h3>Prompt:</h3>
              <div className='prompt'> {promptsAndPoems[poemKey].prompt}</div>
              <h3>Poem:</h3>
              <div className='poem'>{promptsAndPoems[poemKey].poem}</div>
              <button
                onClick={() =>
                  dispatch(clearSinglePoem(promptsAndPoems[poemKey].prompt))
                }
              >
                Clear Poem
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h2>Generate your first poem!</h2>
      )}
    </>
  );
};

export default PreviousPoems;
