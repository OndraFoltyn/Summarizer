import React from "react";
import { InputSection } from "./components/InputSection";
import { OutputSection } from "./components/OutputSection";
import { useSummarization } from "./hooks/useSummarization";
import { useAgent } from "./hooks/useAgent";

export function MainPage() {
  const [text, setText] = React.useState("");
  const [length, setLength] = React.useState("medium");
  const [style, setStyle] = React.useState("bullet");
  const [keyText, setKeyText] = React.useState("");
  const [showKey, setShowKey] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);

  const {
    result: result,
    isLoading: isLoading,
    error: error,
    summarize,
  } = useSummarization();

  const {
    result: agentResult,
    isLoading: isAgentLoading,
    error: agentError,
    runAgent,
  } = useAgent();

  const handleSummarize = () => {
    summarize(text, length, style, keyText);
  };

  const handleRunAgent = () => {
    runAgent(text, length, style, keyText);
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4 bg-[#594838] min-h-screen">
      <div className="flex-1 flex flex-col items-center gap-8 max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-center">LLM Summarization</h1>

        <div className="flex flex-row gap-8 w-full">
          <InputSection
            text={text}
            setText={setText}
            keyText={keyText}
            setKeyText={setKeyText}
            showKey={showKey}
            setShowKey={setShowKey}
            showHelp={showHelp}
            setShowHelp={setShowHelp}
            length={length}
            setLength={setLength}
            style={style}
            setStyle={setStyle}
            onSummarize={handleSummarize}
            isLoading={isLoading}
            onRunAgent={handleRunAgent}
            isAgentLoading={isAgentLoading}
          />

          <OutputSection result={result} error={error} />
        </div>
      </div>
    </main>
  );
}

export default MainPage;
