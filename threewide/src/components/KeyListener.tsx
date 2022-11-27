import React, { KeyboardEventHandler, SyntheticEvent } from "react";
import { useState } from "react";
import { Moves } from "src/types/tetris";
import { Settings } from "./Settings";

type Direction = "left" | "right" | null;

type KeyListenerEventHandlers = {
  gameOver: boolean;
  onSoftDropDisable: () => void;
  onDasDisable: (direction: Direction) => void;
  onMovePieceLeftHandler: () => void;
  onMovePieceRightHandler: () => void;
  onHardDropHandler: () => void;
  onHoldPieceHandler: () => void;
  onSoftDropHandler: () => void;
  onRotatePieceHandler: (rotation: number) => void;
  onResetHandler: () => void;
  settings: Settings;
  children: any;
};

const KeyListener = ({
  gameOver,
  onSoftDropDisable,
  onDasDisable,
  onMovePieceLeftHandler,
  onMovePieceRightHandler,
  onHardDropHandler,
  onSoftDropHandler,
  onHoldPieceHandler,
  onRotatePieceHandler,
  onResetHandler,
  settings,
  children,
}: KeyListenerEventHandlers) => {
  const controls: { [id: string]: Moves } = Object.fromEntries(
    Object.entries(settings.keySettings).map(
      ([key, value]: [string, string]): [string, Moves] => [value, key as Moves]
    )
  );

  const handlers: { [id: string]: () => void } = {
    moveLeft: onMovePieceLeftHandler,
    moveRight: onMovePieceRightHandler,
    holdPiece: onHoldPieceHandler,
    rotate90: () => onRotatePieceHandler(1),
    rotate180: () => onRotatePieceHandler(2),
    rotate270: () => onRotatePieceHandler(3),
    softDrop: onSoftDropHandler,
    hardDrop: onHardDropHandler,
    reset: onResetHandler,
  };

  const onKeyUpHandler: KeyboardEventHandler = (event) => {
    let move = controls[event.code];

    if (move == "moveLeft") {
      onDasDisable("left");
    } else if (move == "moveRight") {
      onDasDisable("right");
    } else if (move == "softDrop") {
      onSoftDropDisable();
    }

    setCurrentActions((actions) => {
      return [...actions.filter((action) => action != move)];
    });
  };

  const onKeyDownHandler: KeyboardEventHandler = (event) => {
    event.preventDefault();
    if (gameOver) return;

    let move: Moves | undefined = controls[event.code];

    if (move === undefined) return;

    if (currentActions.filter((action) => action == move).length == 0) {
      setCurrentActions((actions: Moves[]): Moves[] => {
        return [move!, ...actions];
      });
      handlers[move]!();
    }
  };

  const [currentActions, setCurrentActions] = useState<Moves[]>([]);

  return (
    <div
      tabIndex={0}
      className="key-listener"
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHandler}
    >
      {children}
    </div>
  );
};

export default KeyListener;
