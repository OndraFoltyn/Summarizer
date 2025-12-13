import React from "react";

interface ApiKeyInputProps {
  keyText: string;
  setKeyText: (value: string) => void;
  showKey: boolean;
  setShowKey: React.Dispatch<React.SetStateAction<boolean>>;
  showHelp: boolean;
  setShowHelp: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ApiKeyInput({
  keyText,
  setKeyText,
  showKey,
  setShowKey,
  showHelp,
  setShowHelp,
}: ApiKeyInputProps) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium">
        Gemini API Key:
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 inline ml-1 cursor-pointer"
          onClick={() => setShowHelp(!showHelp)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </label>
      {showHelp && (
        <div className="mb-2 text-sm text-gray-900 bg-[#ded3ca] rounded-md text-center p-2">
          You can obtain your API key here:{" "}
          <a
            href="https://aistudio.google.com/app/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            https://aistudio.google.com/app/api-keys
          </a>
        </div>
      )}
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
  );
}
