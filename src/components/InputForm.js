import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPoem, clearPoems } from '../store/poems';

const InputForm = () => {
  const [poetryPrompt, setPoetryPrompt] = useState('Write a poem about...');
  const [response, setResponse] = useState({});
  const [currentPoem, setCurrentPoem] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState(false);

  const dispatch = useDispatch();

  const previousPoems = useSelector((state) => {
    return state.promptsAndPoems || '';
  });

  //Once I have the generated poem on local state I want to send one object with the prompt and the poem together to the store to be read by the PreviousPoems component to save redundant redux. I only want that call to happen though once Ive hit submit, theres a fun little bug that will call dispatch everytime you back space if you dont include some kind of submitted status the way I wrote this
  useEffect(() => {
    if (!!submittedStatus && currentPoem.length) {
      dispatch(addPoem({ prompt: poetryPrompt, poem: currentPoem }));
      setSubmittedStatus(false);
      setCurrentPoem('');
    }
  }, [dispatch, currentPoem, poetryPrompt, submittedStatus]);

  //grabbing the poem off of the json response and adding it to local state
  useEffect(() => {
    if (Object.keys(response).length) {
      setCurrentPoem(response.choices[0].text);
    }
  }, [response]);

  //The request still worked when I made it with only the poetryPrompt but the results were better when I included this other information from the challenge doc so I set it up like this to keep the user from seeing it
  const prompt = {
    prompt: `${poetryPrompt}`,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  //Funtion to make the API call and set the returned JSON object on local state
  const writePoem = (data) => {
    console.log('writing Poem');
    fetch('https://api.openai.com/v1/engines/text-curie-001/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        mode: 'cors',
        authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        setResponse(json);
      });
    setSubmittedStatus(true);
  };

  //function to reset the redux store of poems to an empty array
  const clearAllPoems = () => {
    dispatch(clearPoems());
  };

  //control input and set the poetry prompt to local state
  const handleInputChange = (event) => {
    const poetryPrompt = event.target.value;
    setPoetryPrompt(poetryPrompt);
  };

  return (
    <>
      <form onSubmit={handleSubmit} id='poetry-prompt-container'>
        <input
          id='poetry-prompt'
          placeholder='Write a poem about...'
          value={poetryPrompt}
          onChange={handleInputChange}
        />
      </form>
      <button onClick={() => writePoem(prompt)}>Generate Poem</button>
      {previousPoems.length ? (
        <button onClick={() => clearAllPoems()}>Clear All Poems</button>
      ) : (
        ''
      )}
    </>
  );
};

export default InputForm;
