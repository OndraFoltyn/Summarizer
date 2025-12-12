# Backend for summarization tool

This folder contains the structure of created backend for this simple application.

## 1. Folder structure

```bash
.
└── summarizer_backend
    ├── app
        ├── __init__.py
        ├── logs
        ├── main.py
        ├── routes
        │   ├── config.py
        │   ├── llm_client.py
        │   ├── models.py
        │   └── prompt_utils.py
        └── static
            └── favicon.ico
    ├── .env
    ├── .gitignore
    ├── Dockerfile
    └── README.md
```

---

## 2. API Endpoints Description

### Root

- **Description**: Provides basic information about the API and available endpoints.

```curl
curl -X 'GET' \
  'http://127.0.0.1:8000/' \
  -H 'accept: application/json'
```

- **Response**:

```json
{
  "message": "Welcome to the LLM Summarization API. Use /docs for API documentation.",
  "endpoints": {
    "POST /summarize": "Generate a summary of the provided text.",
    "GET /health": "Check the health status of the API."
  }
}
```

---

### Health check

- **Description**: Returns the current health status of the API.

```curl
curl -X 'GET' \
  'http://127.0.0.1:8000/health' \
  -H 'accept: application/json'
```

- **Response**:

```json
{
  "status": "healthy",
  "api": "running"
}
```

---

### Summary generation

- **Description**: Generate a summary of the provided text according to the specified length, style and optional focus.

```curl
curl -X 'POST' \
  'http://127.0.0.1:8000/summarize' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "text": "AI Companies Are....",
  "length": "short",
  "style": "bullet",
  "api_key": "<gemini_api_key>"
}'
```

- **Request Parameters**:

  - `text` (string, required): Text to summarize,
  - `length` (string, optional): short,
  - `style` (string, optional): bullet,
  - `api_key` (string): <gemini_api_key>

- **Example Request**:

```json
{
  "text": "Text to summarize...",
  "length": "short",
  "style": "bullet",
  "api_key": "<gemini_api_key>"
}
```

- **Example response**:

```json
{
  "summary": "Generated summary...",
  "metadata": {
    "word_count": 123,
    "length": "short",
    "style": "bullet"
  }
}
```

---

## 3. Prompt Design

- The model's behavior and instructions for generating summaries are defined using a **system prompt**:

```python
SYSTEM_PROMPT = (
    "You are an expert at creating accurate and well-structured summaries of text. "
    "Make sure to always follow the formatting instructions precisely."
)
```

- The summary prompt is **dynamically generated** based on request parameters (`text`, `length`, `style`) to ensure that the output matches the user's requirements:

  - **Length** (specifies the detail of the summary):
    - _**short**_ (100-200 words),
    - _**medium**_ (200-400 words),
    - _**long**_ (400-600 words);
  - **Style** (specifies the formatting of the summary):
    - **_bullet_** (summary as bullet points),
    - **_paragraph_** (summary as well-structured paragraphs),
    - **_numbered_** (summary as a numbered list).

- The final user prompt is generated based on the parameters of the request and instructs the model to provide a summary that:

  - clearly captures the **main ideas** and **key information**,
  - adheres to the required **format** and **style**,
  - is **understandable**, **well-structured**, and **faithful** to the original meaning.

- The **_final design_** of generated prompt based on the specified parameters could look like this:

```txt
You are an expert text summarization AI. Your task is to generate concise and informative summaries based on user specifications. Make sure to always follow the length and style requirements provided.

Please summarize the following text in 100-200 words or less.
Format the summary as well-structured paragraphs with smooth transitions.

Make sure the summary:
- Captures the main ideas and key information
- Is well-organized and easy to read
- Maintains the original meaning and context
- Is appropriate for the requested length and style.

Text to summarize:
...
```

---
