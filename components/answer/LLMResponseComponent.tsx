// 1. Define the 'LLMResponseComponentProps' interface with properties for 'llmResponse', 'currentLlmResponse', and 'index'
interface LLMResponseComponentProps {
  llmResponse: string;
  currentLlmResponse: string;
  index: number;
  //   isToEditLlmResponse: boolean;
  editLlmResponse: (ind: number, updatedResponse: string) => void;
}

// 2. Import the 'Markdown' component from 'react-markdown'
import Markdown from "react-markdown";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";

// 3. Define the 'StreamingComponent' functional component that renders the 'currentLlmResponse'
const StreamingComponent = ({
  currentLlmResponse,
}: {
  currentLlmResponse: string;
}) => {
  return (
    <>
      {currentLlmResponse && (
        <div className="dark:bg-slate-800 bg-white shadow-lg rounded-lg p-4 mt-4">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold flex-grow dark:text-white text-black">
              Answer
            </h2>
            <img src="./groq.png" alt="groq logo" className="w-6 h-6" />
          </div>
          <div className="dark:text-gray-300 text-gray-800">
            {currentLlmResponse}
          </div>
        </div>
      )}
    </>
  );
};

// 4. Define the 'LLMResponseComponent' functional component that takes 'llmResponse', 'currentLlmResponse', and 'index' as props
const LLMResponseComponent = ({
  llmResponse,
  currentLlmResponse,
  index,
  //   isToEditLlmResponse,
  editLlmResponse,
}: LLMResponseComponentProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copyLlmResponse, setCopyLlmResponse] = useState<string>(llmResponse);
  // set up the is to edit the response
  const [isToEditLlmResponse, setIsToEditLlmResponse] = useState(false);

  // set up the llmResponse
  useEffect(() => {
    setCopyLlmResponse(llmResponse);
  }, [llmResponse]);

  // 5. Check if 'llmResponse' is not empty
  const hasLlmResponse = copyLlmResponse && copyLlmResponse.trim().length > 0;

  const calculateRowCount = () => {
    // Count the number of newline characters in the text
    const lines = copyLlmResponse.split("\n");
    // Set a minimum row count of 3
    const rowCount = Math.max(lines.length, 3);
    return rowCount;
  };

  return (
    <>
      {hasLlmResponse ? (
        // 6. If 'llmResponse' is not empty, render a div with the 'Markdown' component
        <div className="dark:bg-slate-800 bg-white shadow-lg rounded-lg p-4 mt-4">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-semibold flex-grow dark:text-white text-black">
              Response
            </h2>
          </div>
          <div className="dark:text-gray-300 text-gray-800 markdown-container">
            {isToEditLlmResponse ? (
              <div className="mb-4 h-full">
                <Textarea
                  ref={textareaRef}
                  className="min-h-96 w-full text-slate-600 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded px-3.5 py-2.5 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-y"
                  onChange={(e) => setCopyLlmResponse(e.currentTarget.value)}
                  value={copyLlmResponse}
                  rows={calculateRowCount()}
                />
              </div>
            ) : (
              <Markdown>{copyLlmResponse}</Markdown>
            )}
            <div className="flex justify-between">
              <div className="flex items-center justify-start">
                <img
                  src="./powered-by-groq.svg"
                  alt="powered by groq"
                  className="mt-2 h-6"
                />
              </div>
              <div className="flex items-center justify-end">
                {isToEditLlmResponse && (
                  <button
                    type="button"
                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 motion-reduce:transition-none dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                    onClick={() => {
                      setCopyLlmResponse(llmResponse);
                      setIsToEditLlmResponse(!isToEditLlmResponse);
                    }}>
                    Discard
                  </button>
                )}
                <button
                  //   disabled
                  type="button"
                  className={`inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong ${isToEditLlmResponse && "ml-3"}`}
                  onClick={() => {
                    if (isToEditLlmResponse)
                      editLlmResponse(index, copyLlmResponse);
                    setIsToEditLlmResponse(!isToEditLlmResponse);
                  }}>
                  {isToEditLlmResponse ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 7. If 'llmResponse' is empty, render the 'StreamingComponent' with 'currentLlmResponse'
        <StreamingComponent currentLlmResponse={currentLlmResponse} />
      )}
    </>
  );
};

export default LLMResponseComponent;
