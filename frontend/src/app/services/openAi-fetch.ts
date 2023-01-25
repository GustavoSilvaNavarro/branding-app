import axios from 'axios';

import { Snippet } from '../types/app-types';
import { env } from '../helpers/env';

export const snippetApiData = async (subject: string) => {
  try {
    const snippet = await axios.get(`${env.baseUrl}/prod/generate-ai-data?prompt=${subject}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });

    const result = snippet.data as unknown as Snippet;
    return result;
  } catch (err) {
    console.error(err);
  }
};
