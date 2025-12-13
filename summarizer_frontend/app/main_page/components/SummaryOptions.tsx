import React from "react";
import { SUMMARY_LENGTHS, SUMMARY_STYLES } from "../constants";

interface SummaryOptionsProps {
  length: string;
  setLength: (value: string) => void;
  style: string;
  setStyle: (value: string) => void;
}

export function SummaryOptions({
  length,
  setLength,
  style,
  setStyle,
}: SummaryOptionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 self-center">
      <label className="flex items-center gap-2">
        <span className="text-sm font-medium">Length of summary:</span>
        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
        >
          {SUMMARY_LENGTHS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2">
        <span className="text-sm font-medium">Style of summary:</span>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
        >
          {SUMMARY_STYLES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
