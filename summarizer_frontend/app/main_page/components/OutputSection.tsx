import React from "react";
import ReactMarkdown from "react-markdown";

interface OutputSectionProps {
  result: string;
  error: string;
}

export function OutputSection({ result, error }: OutputSectionProps) {
  return (
    <div className="flex-1 flex flex-col gap-6">
      {error && (
        <div className="w-full p-4 border border-red-300 rounded-md bg-red-50 text-red-800">
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="w-full p-4 border border-gray-300 rounded-md bg-[#ded3ca] shadow-sm flex-1">
        <h2 className="text-lg font-semibold mb-2 text-gray-900">Summary:</h2>
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed overflow-y-auto max-h-96">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
