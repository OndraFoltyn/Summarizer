from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routes.models import SummarizationRequest, SummarizationResponse, SummaryMetadata
from routes.prompt_utils import create_prompt
from loguru import logger

logger.add("logs/backend.log", rotation="10 MB", retention="2 days", level="INFO")

app = FastAPI(
    title="Summarization API Service",
    description="An API service for text summarization using either LLM or AI agents.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

favicon_path = "static/favicon.ico"
@app.get("/favicon.ico", include_in_schema=False)   # The keyword include_in_schema=False included in the decorator hides the path operation from the schema used to autogenerate API docs
async def favicon():
    return JSONResponse(favicon_path)


@app.get("/")
async def read_root():
    return {"message": "Welcome to the LLM Summarization API. Use /docs for API documentation."}


@app.post("/summarize", response_model=SummarizationResponse)
async def summarize(request: SummarizationRequest):
    """
    Endpoint to summarize text based on the provided request parameters.
    - text: The text to summarize (min 10 characters).
    - length: Desired summary length (short, medium, long).
    - style: Summary format style (bullet, paragraph, numbered).
    """
    try:
        if len(request.text.strip()) < 10:
            logger.warning("Input text is too short.")
            return JSONResponse(status_code=400, content={"error": "Input text must be at least 10 characters long."})
            
        # Create prompt for summarization based on the request parameters
        prompt = create_prompt(
            request.text, 
            request.length, 
            request.style
        )
        logger.info(f"Generated prompt: {prompt}")

        

    except Exception as e:
        logger.error(f"An error occurred: {e}")
        return JSONResponse(status_code=500, content={"error": "Internal server error."})