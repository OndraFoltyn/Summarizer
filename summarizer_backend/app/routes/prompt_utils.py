# project/summarizer_backend/app/routes/prompt_utils.py

# Define length and style specifications
LENGTH_SPECS = {
    "short": "in 100-200 words or less",
    "medium": "in 200-400 words",
    "long": "in 400-600 words"
}

STYLE_SPECS = {
    "bullet": "Format the summary as bullet points with clear and concise statements.",
    "paragraph": "Format the summary as well-structured paragraphs with smooth transitions.",
    "numbered": "Format the summary as a numbered list with detailed points."
}

# Create prompt based on request parameters for the LLM
SYSTEM_PROMPT = (
    "You are an expert text summarization AI. "
    "Your task is to generate concise and informative summaries based on user specifications. "
    "Make sure to always follow the length and style requirements provided."
)

def create_prompt(text: str, length: str, style: str) -> str:
    """Generate a prompt for the LLM based on the input text, desired length, and style."""
    length_spec = LENGTH_SPECS.get(length, LENGTH_SPECS["medium"])
    style_spec = STYLE_SPECS.get(style, STYLE_SPECS["paragraph"])
    
    prompt = (
        f"{SYSTEM_PROMPT}\n\n"
        f"Please summarize the following text {length_spec}.\n"
        f"{style_spec}\n\n"
        f"Text to summarize:\n{text}\n"
    )
    return prompt