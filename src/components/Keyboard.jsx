/* eslint-disable react/prop-types */
export default function Keyboard(props) {
  return (
    <button className="keyboard-btn" onClick={() => props.addLetter(props.id)}>
      {props.name}
    </button>
  );
}
