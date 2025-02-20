/* eslint-disable react/prop-types */
export default function LanguageChips(props) {
  const styles = {
    color: props.color,
    backgroundColor: props.bgColor,
  };
  return (
    <div className="chip" style={styles}>
      <span>{props.name}</span>
    </div>
  );
}
