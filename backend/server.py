from fastapi import FastAPI, HTTPException
from appbot import generate_branding_snippet, generate_keywords

app = FastAPI()

MAX_INPUT_LENGTH = 20

def validate_input_length(prompt: str):
  if len(prompt) >= MAX_INPUT_LENGTH:
    raise HTTPException(status_code=400, detail=f'Input must be under {MAX_INPUT_LENGTH}')

@app.get("/generate-snippet")
async def get_branding_snippet(prompt: str):
  validate_input_length(prompt)

  snippet = generate_branding_snippet(prompt)
  return { "snippet_message": snippet }

@app.get("/generate-keywords")
async def get_keywords(prompt: str):
  validate_input_length(prompt)

  keywords = generate_keywords(prompt)
  return { "keywords": keywords }

@app.get("/generate-ai-data")
async def retrieve_bot_ai_info(prompt: str):
  validate_input_length(prompt)
  snippet = generate_branding_snippet(prompt)
  keywords = generate_keywords(prompt)
  return { "keywords": keywords, "snippet": snippet }