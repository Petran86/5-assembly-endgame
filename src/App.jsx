import { useState } from "react";
import LanguageChips from "./components/LanguageChips";
import Keyboard from "./components/Keyboard";
import { languages } from "./languages";

export default function App() {
  const [currentord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);
  console.log(guessedLetters);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
    // add code to check if the letter is correct or not
  }

  const chipsEl = languages.map((chip) => {
    return (
      <LanguageChips
        key={chip.name}
        name={chip.name}
        color={chip.color}
        bgColor={chip.backgroundColor}
      />
    );
  });

  const wordEl = Array.from(currentord).map((letter, index) => {
    return (
      <span key={index} className="letter">
        {letter.toUpperCase()}
      </span>
    );
  });

  const keyoardEl = Array.from(alphabet).map((letter) => {
    return (
      <Keyboard
        key={letter}
        id={letter}
        name={letter.toUpperCase()}
        addLetter={addGuessedLetter}
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
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">{chipsEl}</section>
      <section className="word">{wordEl}</section>
      <section className="keyboard">{keyoardEl}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}
