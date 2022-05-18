import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPoem, clearPoems } from '../store/poems';

const InputForm = () => {
  const [poetryPrompt, setPoetryPrompt] = useState('');
  const [response, setResponse] = useState({});
  const [currentPoem, setCurrentPoem] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState(false);

  const dispatch = useDispatch();

  //Once I have the generated poem on local state I want to send one object with the prompt and the poem together to the store to be read by the PreviousPoems component to save redundant redux

  useEffect(() => {
    if (!!submittedStatus && currentPoem.length) {
      dispatch(addPoem({prompt: poetryPrompt, poem: currentPoem}));
      setSubmittedStatus(false);
    }
  }, [dispatch, currentPoem, poetryPrompt, submittedStatus]);

  //grabbing the poem off of the json response and addign it to local state
  useEffect(() => {
    if (Object.keys(response).length) {
      setCurrentPoem(response.choices[0].text);
    }
  }, [response, currentPoem, poetryPrompt]);

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

  const clearAllPoems = () => {
    dispatch(clearPoems())
  }

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
      <button onClick={() => clearAllPoems()}>Clear All Poems</button>
    </>
  );
};

export default InputForm;
