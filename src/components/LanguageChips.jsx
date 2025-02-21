/* eslint-disable react/prop-types */
import clsx from "clsx";

export default function LanguageChips(props) {
  const styles = {
    color: props.color,
    backgroundColor: props.bgColor,
  };
  return (
    <span className={clsx("chip", { lost: props.isLost })} style={styles}>
      {props.name}
    </span>
  );
}
