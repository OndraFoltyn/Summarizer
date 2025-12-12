from pydantic import BaseModel, Field
from enum import Enum

# Enums for length and style options
class LengthOption(str, Enum):
    SHORT = "short"
    MEDIUM = "medium"
    LONG = "long"

class StyleType(str, Enum):
    BULLET = "bullet"
    PARAGRAPH = "paragraph"
    NUMBERED = "numbered"

# Request model for text summarization
class SummarizationRequest(BaseModel):
    text: str = Field(..., description="The text to be summarized.")
    length: LengthOption = Field(LengthOption.MEDIUM, description="The desired length of the summary.")
    style: StyleType = Field(StyleType.PARAGRAPH, description="The style of the summary.")

# Response metadata model 
class SummaryMetadata(BaseModel):
    word_count: int = Field(..., description="The word count of the summary.")
    length: str = Field(..., description="The length category of the summary.")
    style: str = Field(..., description="The style of the summary.")

# Response model for text summarization
class SummarizationResponse(BaseModel):
    summary: str = Field(..., description="The generated summary of the input text.")
    metadata: SummaryMetadata = Field(..., description="Metadata about the generated summary.")