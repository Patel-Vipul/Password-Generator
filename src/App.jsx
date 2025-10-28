import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isAlphabet, setIsAlphabet] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  const [password, setPassword] = useState("");

  const [copied, setCopied] = useState("--");
  const [check, setCheck] = useState("--");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";

    if (isAlphabet)
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumber) str += "0123456789";
    if (isSymbol) str += "!@#$%^&*()-+=`~{}[]?:;";

    if (!isAlphabet && !isNumber && !isSymbol) {
      setCheck("Please, Check at least one checkbox");
      setTimeout(() => {
        setCheck("--");
      }, 1000);
    }

    if (!str) return; //Prevents errors if no checkbox selected

    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }
    setPassword(pass);
  }, [length, isAlphabet, isNumber, isSymbol, setPassword]);

  const copyToClipboard = useCallback(() => {
    if (password !== "") {
      passwordref.current?.select();
      //passwordref.current?.select(); // use to highlight the selected
      window.navigator.clipboard.writeText(password);

      setCopied("Copied!");
      setTimeout(() => {
        setCopied("--");
      }, 1000);
    } else {
      setCopied("Nothing to Copy!");
      setTimeout(() => {
        setCopied("--");
      }, 1000);
    }
  }, [password]);

  const passwordref = useRef(null);

  useEffect(() => {
    passwordGenerator();
  }, [length,isAlphabet, isNumber, isSymbol]);

  return (
    <>
      <script>{`
        .pointer{
              transition: 0.3s ease-in-out;
          }

          .pointer:hover{
              cursor: pointer;
              transform: scale(102%);
          }

          .pointer:active{
              transform: translateY(1px);
          }

          @keyframes fadeIn {
              0%{opacity: 0;}
              100%{opacity: 1;}
          }
      `}</script>
      
      <div className="min-h-screen w-full bg-[#242424] flex justify-center items-center p-4">
        <div className="bg-white w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] p-6 sm:p-8 rounded-2xl shadow shadow-white animate-[fadeIn_1s_ease-in]">
          
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-5">
            Password Generator
          </h1>

          {/* Input + Copy Button */}
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-2 sm:gap-0 mb-3">
            <input
              type="text"
              className="w-full sm:w-[75%] border-2 p-3 rounded-2xl sm:rounded-l-2xl sm:rounded-r-none text-center sm:text-left"
              readOnly
              onClick={() => passwordGenerator()}
              placeholder="Generate Password"
              value={password}
              ref={passwordref}
            />
            <button
              onClick={copyToClipboard}
              className="w-full sm:w-[25%] border-2 border-black bg-blue-950 text-white font-semibold p-3 rounded-2xl sm:rounded-r-2xl sm:rounded-l-none pointer text-sm sm:text-base transition-all"
            >
              Copy
            </button>
          </div>

          {/* Copied Message */}
          <div className="text-blue-600 text-center text-sm sm:text-base mb-2">{copied}</div>

          {/* Length Range */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-5">
            <label className="text-sm sm:text-base md:text-lg">
              Length:{" "}
              <span className="font-semibold">
                {length < 10 ? "0" + length : String(length)}
              </span>
            </label>
            <input
              type="range"
              className="cursor-pointer w-[80%] sm:w-[50%]"
              max={25}
              min={4}
              value={length}
              onChange={(event) => setLength(Number(event.target.value))}
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-5 text-sm sm:text-base">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="alphabet"
                className="pointer"
                onChange={() => {
                  setIsAlphabet((prev) => !prev);
                }}
              />
              <label htmlFor="alphabet" className="pointer">
                Alphabet
              </label>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="number"
                className="pointer"
                onChange={() => setIsNumber((prev) => !prev)}
              />
              <label htmlFor="number" className="pointer">
                Number
              </label>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="symbol"
                className="pointer"
                onChange={() => setIsSymbol((prev) => !prev)}
              />
              <label htmlFor="symbol" className="pointer">
                Symbol
              </label>
            </div>
          </div>

          {/* Error Message */}
          <div className="text-red-600 text-center text-sm sm:text-base mb-4">
            {check}
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              className="border-2 border-black p-3 rounded-xl text-lg sm:text-xl bg-blue-950 font-bold text-white z-10 pointer w-[80%] sm:w-auto"
              onClick={passwordGenerator}
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
