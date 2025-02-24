import { useState } from "react";
import LanguageChips from "./components/LanguageChips";
import Keyboard from "./components/Keyboard";
import { languages } from "./languages";
import { getFarewellText, getRandomWord } from "./utils";
import clsx from "clsx";
import Confetti from "react-confetti";

export default function App() {
  //State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  //Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const numGuessesLeft = languages.length - 1 - wrongGuessCount;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  // checks if the last letter we pick is incorrect
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  function startNewGame() {
    setGuessedLetters([]);
    setCurrentWord(getRandomWord());
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
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    );
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
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
        isGameOver={isGameOver}
      />
    );
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
    return null;
  }

  return (
    <main>
      {isGameWon && <Confetti recycle={false} />}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section
        aria-live="polite"
        role="status"
        className={clsx("game-status", {
          won: isGameWon,
          lost: isGameLost,
          farewell: !isGameOver && isLastGuessIncorrect,
        })}
      >
        {renderGameStatus()}
      </section>
      <section className="language-chips">{chipsEl}</section>
      <section className="word">{wordEl}</section>
      {/* Combined visualy-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) => {
              guessedLetters.includes(letter) ? letter + "." : "blank.";
            })
            .join(" ")}
        </p>
      </section>
      <section className="keyboard">{keyoardEl}</section>
      {isGameOver && (
        <button className="new-game" onClick={startNewGame}>
          New Game
        </button>
      )}
    </main>
  );
}
