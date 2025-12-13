import { useState } from "react";

export function useSummarization() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const summarize = async (
    text: string,
    length: string,
    style: string,
    apiKey: string
  ) => {
    if (!text || text.length < 10) {
      setError("Please enter at least 10 characters of text to summarize.");
      return;
    }
    if (!apiKey) {
      setError("Please enter your Gemini API key.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          length,
          style,
          api_key: apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.summary || data.output || "No summary returned.");
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while summarizing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { result, isLoading, error, summarize };
}
