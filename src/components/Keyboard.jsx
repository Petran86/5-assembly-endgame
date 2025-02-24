/* eslint-disable react/prop-types */
import clsx from "clsx";

export default function Keyboard(props) {
  const className = clsx("keyboard-btn", {
    correct: props.isCorrect,
    wrong: props.isWrong,
  });
  return (
    <button
      className={className}
      disabled={props.isGameOver}
      aria-disabled={props.isGameOver}
      aria-label={`Letter ${props.id}`}
      onClick={() => props.addLetter(props.id)}
    >
      {props.name}
    </button>
  );
}
