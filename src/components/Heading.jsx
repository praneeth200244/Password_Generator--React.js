import styles from "../customStyles/Heading.module.css";

export default function Heading({ headingContent }) {
  return (
    <div className={styles.headingContent}>
      <h1>{headingContent}</h1>
    </div>
  );
}
