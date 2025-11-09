import OpenAI from 'openai';

export const API_KEY = process.env.OPENROUTER_API_KEY

const openAIClient = new OpenAI({
  apiKey: API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export default openAIClient;