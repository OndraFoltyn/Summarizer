from google import genai
from .config import GEMINI_MODEL
from loguru import logger
from typing import Optional
from google.genai.types import GenerateContentConfig
from .prompt_utils import SYSTEM_PROMPT

def get_gemini_client(api_key: Optional[str] = None):
    """
    Initializes and returns a Gemini LLM client.
    """
    if api_key is None:
        raise ValueError("API key for Gemini LLM is not provided.")

    try:
        client = genai.Client(api_key=api_key)
        logger.info("Gemini LLM client initialized successfully.")
        return client
    except Exception as e:
        logger.error(f"Failed to initialize Gemini LLM client: {e}")
        raise

async def generate_summary(prompt: str, api_key: Optional[str] = None):
    """
    Generate a summary using Gemini API.
    """
    try:
        gemini_client = get_gemini_client(api_key=api_key)
        
        if gemini_client is None:
            raise ValueError("Gemini client is not initialized.")
        
        logger.info(f"Using Gemini model: {GEMINI_MODEL} for summarization.")
        response = gemini_client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT
            )
        )
        return response.text or "No summary generated."
    except Exception:
        raise