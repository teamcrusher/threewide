import React, { KeyboardEventHandler, SyntheticEvent } from "react";
import { useState } from "react";

type Direction = "left" | "right" | null;

type KeyListenerEventHandlers = {
  onSoftDropDisable: () => void;
  onDasDisable: (direction: Direction) => void;
  onMovePieceLeftHandler: () => void;
  onMovePieceRightHandler: () => void;
  onHardDropHandler: () => void;
  onHoldPieceHandler: () => void;
  onSoftDropHandler: () => void;
  onRotatePieceHandler: (rotation: number) => void;
  children: any;
};

enum TetrisEvent {
  moveLeft = "moveLeft",
  moveRight = "moveRight",
  hardDrop = "hardDrop",
  softDrop = "softDrop",
  rotate90 = "90Rotate",
  rotate180 = "180Rotate",
  rotate270 = "270Rotate",
  holdPiece = "holdPiece",
}

const KeyListener = ({
  onSoftDropDisable,
  onDasDisable,
  onMovePieceLeftHandler,
  onMovePieceRightHandler,
  onHardDropHandler,
  onSoftDropHandler,
  onHoldPieceHandler,
  onRotatePieceHandler,
  children,
}: KeyListenerEventHandlers) => {
  const controls: { [id: string]: TetrisEvent } = {
    ArrowLeft: TetrisEvent.moveLeft,
    ArrowRight: TetrisEvent.moveRight,
    KeyD: TetrisEvent.hardDrop,
    ArrowDown: TetrisEvent.softDrop,
    ArrowUp: TetrisEvent.rotate90,
    KeyQ: TetrisEvent.rotate180,
    KeyW: TetrisEvent.rotate270,
    Tab: TetrisEvent.holdPiece,
  };
  const handlers: { [id: string]: () => void } = {
    moveLeft: onMovePieceLeftHandler,
    moveRight: onMovePieceRightHandler,
    holdPiece: onHoldPieceHandler,
    "90Rotate": () => onRotatePieceHandler(1),
    "180Rotate": () => onRotatePieceHandler(2),
    "270Rotate": () => onRotatePieceHandler(3),
    softDrop: onSoftDropHandler,
    hardDrop: onHardDropHandler,
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
    console.log(event.code);
    event.preventDefault();

    let move: TetrisEvent | undefined = controls[event.code];

    if (move === undefined) return;

    if (currentActions.filter((action) => action == move).length == 0) {
      setCurrentActions((actions: TetrisEvent[]): TetrisEvent[] => {
        return [move!, ...actions];
      });
      handlers[move]!();
    }
  };

  const [currentActions, setCurrentActions] = useState<TetrisEvent[]>([]);

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
