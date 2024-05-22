import { useState } from "react";
import { requestToGroqAi } from "./utils/grog";
import { MarkdownRenderer } from "./utils/markdown";
import "./App.css";
import Loading from "./components/loading";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitClick = async () => {
    setIsSubmitting(true);
    try {
      const ai = await requestToGroqAi(inputValue);
      setData(ai);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="flex flex-col justify-center gap-8 max-w-xl w-full mx-auto">
      <h1 className="font-bold w-full mx-auto">Grok Ai | React js</h1>
      <form className="flex flex-col gap-3 w-full">
        <input
          type="text"
          placeholder="Masukan perintah..."
          className="py-4 px-6 rounded-md bg-transparent border-2 border-indigo-800 font-semibold"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmitClick();
            }
          }}
        />
        <button
          type="button"
          onClick={handleSubmitClick}
          disabled={isSubmitting}
          className={`bg-indigo-500 font-semibold ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isSubmitting ? <Loading /> : "Kirim"}
        </button>
      </form>
      <div className="max-w-xl text-start bg-black/5 p-4 text-xl rounded-md">
        {data ? (
          <MarkdownRenderer>{data}</MarkdownRenderer>
        ) : // <SyntaxHighlighter>{data}</SyntaxHighlighter>
        null}
      </div>
    </main>
  );
}

export default App;
