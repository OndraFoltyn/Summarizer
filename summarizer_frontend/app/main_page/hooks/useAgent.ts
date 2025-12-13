import { useState } from "react";

export function useAgent() {
  const [result, setAgentResult] = useState("");
  const [isLoading, setAgentIsLoading] = useState(false);
  const [error, setAgentError] = useState("");

  const runAgent = async (
    text: string,
    length: string,
    style: string,
    apiKey: string
  ) => {
    if (!text || text.length < 10) {
      setAgentError(
        "Please enter at least 10 characters of text to summarize."
      );
      return;
    }
    if (!apiKey) {
      setAgentError("Please enter your Gemini API key.");
      return;
    }

    setAgentIsLoading(true);
    setAgentError("");
    setAgentResult("");

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
      setAgentResult(data.summary || data.output || "No summary returned.");
    } catch (error) {
      console.error("Error:", error);
      setAgentError(
        "An error occurred while running the agent. Please try again."
      );
    } finally {
      setAgentIsLoading(false);
    }
  };

  return { result, isLoading, error, runAgent };
}
