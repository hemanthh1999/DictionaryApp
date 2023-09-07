import React, { useState } from "react";

function App() {
  const [words, setWords] = useState();
  const [word, setWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const getDefinition = async () => {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      setWords(data[0]);
    };

    getDefinition();
    setWord("");
  };

  return (
    <>
      <section className="max-w-2xl mx-auto p-5">
        <h1 className="text-3xl text-slate-800 font-bold mb-8 text-center">
          Dictionary
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="search for the definition of a word"
            required
            className="py-2 px-4 border-b-2 border-blue-400 outline-none focus:border-blur-600 transition w-full text-xl lg:text-2xl"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white text-xl lg:text-2xl py-2 px-4 rounded shadow mt-4 hover:bg-blue-800 transition-all duration-200"
          >
            Definition
          </button>
        </form>
        {words && (
          <div className="mt-20">
            <h2 className="capitalize text-slate-700 font-bold text-5xl">
              {words.word}{" "}
              <span className="text-xl text-slate-500 inline-block ml-4">
                {words.phonetic}
              </span>
            </h2>
            <ul className="mt-8 flex flex-col gap-4">
              {words.phonetics.map((phonetic, index) => (
                <React.Fragment key={index}>
                  <li className="font-bold text-xl text-slate-500">
                    {phonetic.text}
                  </li>
                  <audio controls>
                    <source src={phonetic.audio} />
                  </audio>
                </React.Fragment>
              ))}
            </ul>
            <ol className="my-10 flex flex-col">
              {words.meanings.map((meaning, index) => (
                <div key={index} className="mt-8">
                  <li className="font-bold text-xl text-slate-500">
                    {meaning.partOfSpeech}
                  </li>

                  <>
                    {meaning.definitions.map((def, index) => (
                      <li
                        key={index}
                        className="text-xl lg:text-2xl mt-3"
                        style={{ color: "#333" }}
                      >
                        {def.definition}

                        {def.example && (
                          <small className="text-lg lg:text-xl block text-slate-400">
                            Example: {def.example}
                          </small>
                        )}
                      </li>
                    ))}
                  </>

                  <ul className="flex items-center justify-start flex-wrap gap-4 mt-4">
                    {meaning.synonyms.map((syn, index) => (
                      <li
                        key={index}
                        className="bg-slate-200 py-2 px-3 rounded shadow text-sm"
                      >
                        {syn}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ol>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
