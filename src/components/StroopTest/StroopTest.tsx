import { useEffect, useState } from "react";
import { WordModel } from "../../models";
import { WORDS_QUANTITY } from "../../constants";
import { generateWords } from "./generateWords";
import "./StroopTest.css";

const StroopTest = ({
  isRestarted,
  handleRestart,
}: {
  isRestarted: boolean;
  handleRestart: () => void;
}) => {
  const [words, setWords] = useState<WordModel[]>([]);

  const createWords = () => {
    generateWords({
      wordsQuantity: WORDS_QUANTITY,
      addWords: setWords,
    });
  };

  useEffect(() => {
    createWords();
  }, []);

  const restartGame = () => {
    createWords();
    handleRestart();
  };

  useEffect(() => {
    if (isRestarted) {
      restartGame();
    }
  }, [isRestarted]);

  return (
    <>
      <div className="words-list__wrapper">
        <ul className="words-list">
          {words?.map((word) => (
            <li key={word.id} className="word-item">
              <div style={{ color: word.color }}>{word.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StroopTest;
