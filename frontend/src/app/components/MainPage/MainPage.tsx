'use client';
import { useState } from 'react';

import { Form } from '../Form/Form';
import { Result } from '../Result/Result';

import { snippetApiData } from '../../services/openAi-fetch';
import { Snippet } from '../../types/app-types';

export const MainPage = (): JSX.Element => {
  const [prompt, setPrompt] = useState('');
  const [snippet, setSnippet] = useState('This is a mock snippet for testing and stuff');
  const [keywords, setKeywords] = useState<Array<string>>(['javascript', 'mock', 'test']);
  const [hasResult, setHasResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.length > 32) return;

    try {
      if (prompt === '') return;
      if (!isLoading) {
        setIsLoading(true);
        const data = await snippetApiData(prompt);
        if (data) onResult(data);
        else setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onResult = (data: Snippet) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResult(true);
  }

  const onReset = () => {
    setPrompt('');
    setIsLoading(false);
    setHasResult(false);
  }

  return (
    <>
      {hasResult ? (
        <Result snippet={snippet} keywords={keywords} handleBack={onReset} prompt={prompt} />
      ) : (
        <Form prompt={prompt} setPrompt={setPrompt} handleSubmit={handleSubmit} isLoading={isLoading} />
      )}
    </>
  )
}
