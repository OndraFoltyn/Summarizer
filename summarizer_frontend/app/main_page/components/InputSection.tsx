import React from "react";
import { ApiKeyInput } from "./ApiKeyInput";
import { SummaryOptions } from "./SummaryOptions";

interface InputSectionProps {
  text: string;
  setText: (value: string) => void;
  keyText: string;
  setKeyText: (value: string) => void;
  showKey: boolean;
  setShowKey: React.Dispatch<React.SetStateAction<boolean>>;
  showHelp: boolean;
  setShowHelp: React.Dispatch<React.SetStateAction<boolean>>;
  length: string;
  setLength: (value: string) => void;
  style: string;
  setStyle: (value: string) => void;
  onSummarize: () => void;
  isLoading: boolean;
  onRunAgent: () => void;
  isAgentLoading: boolean;
}

export function InputSection({
  text,
  setText,
  keyText,
  setKeyText,
  showKey,
  setShowKey,
  showHelp,
  setShowHelp,
  length,
  setLength,
  style,
  setStyle,
  onSummarize,
  isLoading,
  onRunAgent,
  isAgentLoading,
}: InputSectionProps) {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <textarea
        className="w-full h-64 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder="Enter text to summarize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <ApiKeyInput
        keyText={keyText}
        setKeyText={setKeyText}
        showKey={showKey}
        setShowKey={setShowKey}
        showHelp={showHelp}
        setShowHelp={setShowHelp}
      />

      <SummaryOptions
        length={length}
        setLength={setLength}
        style={style}
        setStyle={setStyle}
      />

      <div className="flex flex-col sm:flex-row gap-4 mt-4 self-center">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-center"
          onClick={onSummarize}
          disabled={isLoading}
        >
          {isLoading ? "Summarizing..." : "Use LMM API"}
        </button>

        <button
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-center"
          onClick={onRunAgent}
          disabled={isAgentLoading}
        >
          {isAgentLoading ? "Running agent..." : "Use agent"}
        </button>
      </div>
    </div>
  );
}
