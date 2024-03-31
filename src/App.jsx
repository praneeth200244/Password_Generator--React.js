import styles from "./customStyles/App.module.css";
import Heading from "./components/Heading";
import Input from "./components/Input";
import { useCallback, useEffect, useRef, useState } from "react";

export default function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("modRan");
  const passwordReference = useRef(null);

  const passwordGenerator = useCallback(() => {
    let passwordCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let newPassword = "";

    if (numAllowed) {
      passwordCharacters += "0123456789";
    }

    if (charAllowed) {
      passwordCharacters += "~`!@#$%^&*()-+{}[]|<>?/";
    }

    const length = parseInt(passwordLength);

    for (let i = 0; i < length; i++) {
      newPassword +=
        passwordCharacters[
          Math.floor(Math.random() * passwordCharacters.length)
        ];
    }

    const specialCharCount = (
      newPassword.match(/[~`!@#$%^&*()-+{}[\]|<>?/]/g) || []
    ).length;
    const numCount = (newPassword.match(/[0-9]/g) || []).length;

    if (charAllowed && specialCharCount < 3) {
      const missingSpecialChars = 3 - specialCharCount;
      for (let i = 0; i < missingSpecialChars; i++) {
        newPassword += passwordCharacters[Math.floor(Math.random() * 14) + 52];
      }
    }

    if (numAllowed && numCount < 3) {
      const missingNums = 3 - numCount;
      for (let i = 0; i < missingNums; i++) {
        newPassword += passwordCharacters[Math.floor(Math.random() * 10) + 62];
      }
    }

    setPassword(newPassword);
  }, [passwordLength, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordReference.current?.select();
    // passwordReference.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, charAllowed, numAllowed, passwordGenerator]);

  function changeLength(event) {
    setPasswordLength(event.target.value);
  }

  function changeNumAllowed() {
    setNumAllowed((prevValue) => !prevValue);
  }

  function changeCharAllowed() {
    setCharAllowed((prevValue) => !prevValue);
  }

  return (
    <div className={styles.application}>
      <Heading headingContent="Password Generator" />

      <div className={styles.passwordDisplay}>
        <Input
          id="password"
          value={password}
          type="text"
          placeholder="password"
          readOnly={true}
          classApplied={styles.passwordContent}
          reference={passwordReference}
        />
        <button
          className={styles.copyButton}
          onClick={copyPasswordToClipboard}
          style={{ cursor: "pointer" }}
        >
          Copy
        </button>
      </div>

      <div className={styles.changePassword}>
        <div>
          <Input
            id="passwordLength"
            value={passwordLength}
            type="range"
            placeholder={null}
            readOnly={false}
            classApplied={styles.passwordLength}
            minValue={8}
            maxValue={50}
            onChangeHandler={changeLength}
          />
          <label
            htmlFor="passwordLength"
            style={{ marginLeft: "0.5rem", fontSize: "2rem" }}
          >
            {passwordLength}
          </label>
        </div>

        <div>
          <Input
            id="numAllowed"
            value={numAllowed}
            type="checkbox"
            placeholder={null}
            readOnly={false}
            classApplied={styles.numAllowed}
            onChangeHandler={changeNumAllowed}
          />
          <label
            htmlFor="numAllowed"
            style={{ marginLeft: "0.5rem", fontSize: "2rem" }}
          >
            Number
          </label>
        </div>

        <div>
          <Input
            id="charAllowed"
            value={charAllowed}
            type="checkbox"
            placeholder={null}
            readOnly={false}
            classApplied={styles.charAllowed}
            onChangeHandler={changeCharAllowed}
          />
          <label
            htmlFor="charAllowed"
            style={{ marginLeft: "0.5rem", fontSize: "2rem" }}
          >
            Special Character
          </label>
        </div>
      </div>
    </div>
  );
}
