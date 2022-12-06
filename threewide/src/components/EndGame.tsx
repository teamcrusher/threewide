import React from "react";

type EndGameProperties = {
  onGameReset: () => void;
  onNextGame?: () => void;
  onPreviousGame?: () => void;
  isWin: boolean;
  gameOver: boolean;
};

const EndGame = ({
  onGameReset,
  onNextGame,
  onPreviousGame,
  isWin,
  gameOver,
}: EndGameProperties) => {
  const btnClasses =
    "text-center text-xsm hover:cursor-pointer hover:bg-white hover:text-black";

  const getPreviousGameBtn = (): React.ReactNode => {
    if (onPreviousGame)
      return (
        <div
          className={btnClasses}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onPreviousGame) onPreviousGame();
          }}
        >
          Previous
        </div>
      );

    return <div></div>;
  };

  const getNextGameBtn = () => {
    if (onNextGame)
      return (
        <div
          className={btnClasses}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onNextGame) onNextGame();
          }}
        >
          Next
        </div>
      );

    return <div></div>;
  };

  const getEndGameWindow = () => {
    if (!gameOver) return <></>;

    if (isWin) {
      return (
        <div>
          <div className="text-center">You win</div>
          <div className="grid grid-cols-3">
            {getPreviousGameBtn()}
            <div
              className={btnClasses}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onGameReset();
              }}
            >
              Reset
            </div>
            {getNextGameBtn()}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="text-center">Try again</div>
          <div
            className={btnClasses}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onGameReset();
            }}
          >
            Reset
          </div>
        </div>
      );
    }
  };

  return getEndGameWindow();
};

export default EndGame;
