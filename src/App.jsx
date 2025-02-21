import { useState } from "react";
import LanguageChips from "./components/LanguageChips";
import Keyboard from "./components/Keyboard";
import { languages } from "./languages";
import clsx from "clsx";

export default function App() {
  //State values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  //Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const chipsEl = languages.map((chip, index) => {
    const isLost = index < wrongGuessCount;
    return (
      <LanguageChips
        key={chip.name}
        name={chip.name}
        color={chip.color}
        bgColor={chip.backgroundColor}
        isLost={isLost}
      />
    );
  });

  const wordEl = Array.from(currentWord).map((letter, index) => {
    return (
      <span key={index} className="letter">
        {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const keyoardEl = Array.from(alphabet).map((letter) => {
    const isCorrect =
      guessedLetters.includes(letter) && currentWord.includes(letter);
    const isWrong =
      guessedLetters.includes(letter) && !currentWord.includes(letter);
    return (
      <Keyboard
        key={letter}
        id={letter}
        name={letter.toUpperCase()}
        addLetter={addGuessedLetter}
        isCorrect={isCorrect}
        isWrong={isWrong}
      />
    );
  });

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section
        className={clsx("game-status", { won: isGameWon, lost: isGameLost })}
      >
        {isGameOver ? (
          isGameWon ? (
            <>
              <h2>You win!</h2>
              <p>Well done! 🎉</p>
            </>
          ) : (
            <>
              <h2>Game over!</h2>
              <p>You lose! Better start learning Assembly 😭</p>
            </>
          )
        ) : null}
      </section>
      <section className="language-chips">{chipsEl}</section>
      <section className="word">{wordEl}</section>
      <section className="keyboard">{keyoardEl}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}

/**import React, { useState } from "react";
import clsx from "clsx";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const WordGame = () => {
  const [word, setWord] = useState("REACT"); // Example word
  const [guessedLetters, setGuessedLetters] = useState([]);

  const handleClick = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => handleClick(letter)}
          className={clsx(
            "px-4 py-2 border rounded text-white font-bold transition-colors",
            {
              "bg-green-500": guessedLetters.includes(letter) && word.includes(letter),
              "bg-red-500": guessedLetters.includes(letter) && !word.includes(letter),
              "bg-gray-700": !guessedLetters.includes(letter),
            }
          )}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default WordGame;
 */
