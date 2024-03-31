import styles from "../customStyles/Heading.module.css";

export default function Input({
  id,
  value,
  type,
  placeholder,
  readonly,
  classApplied,
  maxValue = null,
  minValue = null,
  onChangeHandler,
  reference = null,
}) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      readOnly={readonly}
      className={classApplied}
      max={maxValue}
      min={minValue}
      onChange={onChangeHandler}
      ref={reference}
    />
  );
}
