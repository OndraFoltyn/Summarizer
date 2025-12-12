import React from "react";
import ReactMarkdown from "react-markdown";

export function MainPage() {
  const [text, setText] = React.useState("");
  const [length, setLength] = React.useState("medium");
  const [style, setStyle] = React.useState("bullet");
  const [keyText, setKeyText] = React.useState("");
  const [showKey, setShowKey] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSummarize = async () => {
    if (!text || text.length < 10) {
      setError("Please enter at least 10 characters of text to summarize.");
      return;
    }
    if (!keyText) {
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
          api_key: keyText,
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

  return (
    <main className="flex items-center justify-center pt-16 pb-4 bg-[#594838] min-h-screen">
      <div className="flex-1 flex flex-col items-center gap-8 max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-center">LLM Summarization</h1>

        <div className="flex flex-row gap-8 w-full">
          {/* Input Section */}
          <div className="flex-1 flex flex-col gap-6">
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Enter text to summarize..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">
                Gemini API Key:
              </label>
              <div className="flex">
                <input
                  type={showKey ? "text" : "password"}
                  value={keyText}
                  onChange={(e) => setKeyText(e.target.value)}
                  placeholder="Enter your Gemini API key here..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((prev) => !prev)}
                  className="px-3 py-2 bg-gray-600 text-white border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  title={showKey ? "Hide API Key" : "Show API Key"}
                >
                  {showKey ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 0 3.65 3.65M21 21l-3.228-3.228m-3.65-3.65L12 12m-3.228 3.228L3 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2">
                <span className="text-sm font-medium">Length of summary:</span>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </label>

              <label className="flex items-center gap-2">
                <span className="text-sm font-medium">Style of summary:</span>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value="bullet">Bullet Points</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="numbered">Numbered List</option>
                </select>
              </label>
            </div>

            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-center"
              onClick={handleSummarize}
              disabled={isLoading}
            >
              {isLoading ? "Summarizing..." : "Summarize"}
            </button>
          </div>

          {/* Output Section */}
          <div className="flex-1 flex flex-col gap-6">
            {error && (
              <div className="w-full p-4 border border-red-300 rounded-md bg-red-50 text-red-800">
                <p className="font-medium">{error}</p>
              </div>
            )}

            <div className="w-full p-4 border border-gray-300 rounded-md bg-[#ded3ca] shadow-sm flex-1">
              <h2 className="text-lg font-semibold mb-2 text-gray-900">
                Summary:
              </h2>
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed overflow-y-auto max-h-96">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
