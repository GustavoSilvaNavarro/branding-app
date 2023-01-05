import os
import openai
import argparse
import re

MAX_INPUT_LENGTH = 20

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument("--input", "-i", type=str, required=True)
  args = parser.parse_args()

  user_input: str = args.input

  if check_length_input(user_input):
    print(f'User Input: {user_input}')

    generate_branding_snippet(user_input)
    generate_keywords(user_input)
  else:
    raise ValueError(f'Input length is too long. Must be under {MAX_INPUT_LENGTH}')

def check_length_input(input: str) -> bool:
  return len(input) <= MAX_INPUT_LENGTH

def generate_keywords(prompt: str):
  # Load your API key from an environment variable or secret management service
  openai.api_key = os.getenv('OPENAI_API_KEY')
  enriched_prompt = f'Generate related branding keywords for {prompt}: '
  response = openai.Completion.create(model="text-davinci-003", prompt=enriched_prompt, temperature=0, max_tokens=32)

  keyword_text: str = response['choices'][0]['text'].strip().replace(" \n", ",") # extract text from object and removing white extra spaces start and end
  keywords_filtered = re.sub("[0-9]. ", "", keyword_text)
  keyword_arr = re.split(",|;", keywords_filtered)
  keyword_arr = [k.lower() for k in keyword_arr]

  print(f'Keyword Result: {keyword_arr}')
  return keyword_arr

def generate_branding_snippet(prompt: str) -> str:
  # Load your API key from an environment variable or secret management service
  openai.api_key = os.getenv('OPENAI_API_KEY')
  enriched_prompt = f'Generate upbeat branding snippet for {prompt}: '
  response = openai.Completion.create(model="text-davinci-003", prompt=enriched_prompt, temperature=0, max_tokens=32)

  branding_text: str = response['choices'][0]['text'].strip()[1:] # extract text from object and removing white extra spaces start and end
  last_character = branding_text[-1];

  if last_character not in { ".", "?", "!" }:
    branding_text += '...' # adding ellipsis to truncated statements

  print(f'Result Branding: {branding_text}')
  return branding_text

if __name__ == "__main__":
  main()