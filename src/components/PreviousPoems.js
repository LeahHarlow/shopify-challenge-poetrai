import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSinglePoem } from '../store/poems';

const PreviousPoems = () => {
  //read previously made poems from the redux store
  const promptAndPoem = useSelector((state) => {
    return state.promptAndPoem || '';
  });

  const dispatch = useDispatch();

  //If there are no poems created yet prompt the user to generate their first poem, otherwise show the previous poems.
  return (
    <>
      {promptAndPoem.length ? (
        <div id='response-containter'>
          {Object.keys(promptAndPoem).map((poemKey) => (
            <div className='promptAndPoem' key={poemKey}>
              <h3>Prompt:</h3>
              {/* {console.log('PROMPT AND POEM',promptAndPoem)}
              {console.log('PROMPTANDPOEM[POEMKEY].PROMPT',promptAndPoem[poemKey].prompt)}
              {console.log('PROMPTANDPOEM[POEMKEY].POEM',promptAndPoem[poemKey].poem)} */}
              <div className='prompt'> {promptAndPoem[poemKey].prompt}</div>
              <h3>Poem:</h3>
              <div className='poem'>{promptAndPoem[poemKey].poem}</div>
              <button onClick={() => dispatch(clearSinglePoem(prompt))}>
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
