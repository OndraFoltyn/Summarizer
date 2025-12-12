from dotenv import load_dotenv
import os 

# Load environment variables
load_dotenv()

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash-lite")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")