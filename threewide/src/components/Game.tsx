import React, { useState } from "react";
import { Game } from "src/models/game_description.model";
import { PieceType, Points, Rotation, TetrisPiece } from "src/types/tetris";
import Tetris from "./Tetris";
import SettingsPage, { Settings } from "./Settings";
import GoalDisplay from "./Goal";

export type GameProperties = {
  game: Game | undefined;
  onGameWin: () => void;
  onGameLose: () => void;
  onOverlayToggle: (over: boolean) => void;
  settings: Settings;
  onSettingsUpdate: (newSettings: Settings) => void;
  onGameNext?: () => void;
  onGamePrevious?: () => void;
  children?: any;
};

const TetrisGame = ({
  game,
  onGameWin,
  onGameLose,
  onOverlayToggle,
  settings,
  onSettingsUpdate,
  onGameNext,
  onGamePrevious,
  children,
}: GameProperties) => {
  const emptyBoard = [
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
  ];

  const [isWin, setIsWin] = useState(false);

  const onSettingsSaveHandler = (newSettings: Settings) => {
    onSettingsUpdate({ ...newSettings });
    onOverlayToggle(false);
    setShowSettings(false);
  };

  const onSettingCancelHandler = () => {
    onOverlayToggle(false);
    setShowSettings(false);
  };

  const [showSettings, setShowSettings] = useState<boolean>(false);
  const onShowSettings = () => {
    onOverlayToggle(true);
    setShowSettings(true);
  };

  const [points, setPoints] = useState<Points>({
    backToBackLevel: 0,
    linesCleared: 0,
    pointsGained: 0,
    tspinDoubles: 0,
    tspinSingles: 0,
    tspinTriples: 0,
    tspinMiniDoubles: 0,
    tspinMinis: 0,
  });

  if (!game)
    return (
      <div>
        <SettingsPage
          showSettings={showSettings}
          onSettingsSave={onSettingsSaveHandler}
          onSettingCancel={onSettingCancelHandler}
          currentSettings={settings}
        />
        <Tetris
          width={200}
          height={400}
          startingBoardState={emptyBoard}
          startingPieceQueue={[]}
          generatePieceQueue={true}
          onShowSettings={onShowSettings}
          settings={settings}
        >
          {children}
        </Tetris>
      </div>
    );

  const isTspinOrMini = (
    board: PieceType[][],
    piece: TetrisPiece,
    isSlamKicked: boolean
  ): [boolean, boolean] => {
    if (piece.pieceType != PieceType.T) return [false, false];

    const corners: [
      [number, number],
      [number, number],
      [number, number],
      [number, number]
    ] = [
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
    ];

    let cornerCount = 0;
    for (const cornerLocation of corners) {
      const boardRow = board[cornerLocation[1] + piece?.pieceLocation[1] + 3];
      if (boardRow) {
        if (boardRow[cornerLocation[0] + piece?.pieceLocation[0]])
          cornerCount += 1;
      }
    }

    if (cornerCount < 3) return [false, false];

    if (isSlamKicked) return [false, true];

    let cornerLocations: [[number, number], [number, number]];

    switch (piece.pieceRotation) {
      case Rotation.Zero:
        cornerLocations = [
          [0, 0],
          [2, 0],
        ];
        break;
      case Rotation.Clock:
        cornerLocations = [
          [2, 0],
          [2, 2],
        ];
        break;
      case Rotation.OneEighty:
        cornerLocations = [
          [0, 2],
          [2, 2],
        ];
        break;
      case Rotation.Counter:
        cornerLocations = [
          [0, 0],
          [0, 2],
        ];
        break;
    }

    cornerCount = 0;

    for (const cornerLocation of cornerLocations) {
      const boardRow = board[cornerLocation[1] + piece.pieceLocation[1] + 3];
      if (boardRow)
        if (
          boardRow[cornerLocation[0] + piece.pieceLocation[0]] != PieceType.None
        ) {
          cornerCount += 1;
        }
    }

    switch (cornerCount) {
      case 2:
        return [false, true];
      case 1:
        return [true, false];
      default:
        return [false, false];
    }
  };

  const isAllClear = (board: PieceType[][]): boolean => {
    for (const row of board) {
      for (const item of row) {
        if (item != PieceType.None) {
          return false;
        }
      }
    }

    return true;
  };

  const getBackToBackClearBonus = (backToBackLevel: number): number => {
    if (backToBackLevel >= 1371) return 8;
    else if (backToBackLevel >= 505) return 7;
    else if (backToBackLevel >= 186) return 6;
    else if (backToBackLevel >= 68) return 5;
    else if (backToBackLevel >= 25) return 4;
    else if (backToBackLevel >= 9) return 3;
    else if (backToBackLevel >= 4) return 2;
    else if (backToBackLevel >= 2) return 1;
    else return 0;
  };

  const singleComboTable: number[] = [
    0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3,
  ];

  const getSingleComboAmount = (combo: number): number => {
    //TODO: Figure out how the hell the single combo system works
    if (combo > 20) return 3;

    return singleComboTable[combo]!;
  };

  const onPointsGained = (
    currentBoardState: PieceType[][],
    completedBoardState: PieceType[][],
    completedPiece: TetrisPiece,
    clearedLines: number,
    combo: number
  ): Points => {
    let linesSent = 0;

    const newPoints = { ...points };

    const [isTspinMini, isTspin] = isTspinOrMini(
      currentBoardState,
      completedPiece,
      completedPiece.isSlamKicked
    );

    if (isTspin || isTspinMini || clearedLines === 4) {
      newPoints.backToBackLevel += 1;
    }

    switch (clearedLines) {
      case 4:
        linesSent += 4;
      case 3:
        if (isTspin) {
          newPoints.tspinTriples! += 1;
          linesSent += 6;
        } else {
          linesSent += 2;
        }
        break;
      case 2:
        if (isTspin) {
          newPoints.tspinDoubles! += 1;
          linesSent += 4;
        } else if (isTspinMini) {
          newPoints.tspinMiniDoubles! += 1;
          linesSent += 1;
        } else {
          linesSent += 1;
        }
        break;
      case 1:
        if (isTspin) {
          newPoints.tspinSingles! += 1;
          linesSent += 2;
        } else if (isTspinMini) {
          newPoints.tspinMinis! += 1;
          linesSent += getSingleComboAmount(combo);
        } else {
          linesSent += getSingleComboAmount(combo);
        }
        break;
    }

    linesSent += getBackToBackClearBonus(points.backToBackLevel);

    //I have no idea how the singles combo amount is calculated. The starting value is a mystery to me, so I'm just hard coding the value above
    if (clearedLines != 1)
      linesSent = Math.floor(linesSent * (1 + 0.25 * combo));

    if (game.goal.allowAllClears && isAllClear(completedBoardState)) {
      linesSent += 10;
    }

    newPoints.pointsGained! += linesSent;
    newPoints.linesCleared! += clearedLines;
    setPoints(newPoints);

    return newPoints;
  };

  const isBoardEqual = (
    board1: PieceType[][] | undefined,
    board2: PieceType[][] | undefined
  ): boolean => {
    if (!board1 || !board2 || board1.length == 0 || board2.length == 0)
      return true;

    for (let rowIndex = 0; rowIndex < 20; rowIndex++)
      for (let columnIndex = 0; columnIndex < 10; columnIndex++)
        if (board1[rowIndex]![columnIndex] !== board2[rowIndex]![columnIndex])
          return false;
    return true;
  };

  const onGameEnd = (
    finalBoardState: PieceType[][],
    lastPoints: Points | undefined
  ): void => {
    const finalPoints = lastPoints ?? points;

    if (
      (game.goal.linesCleared &&
        game.goal.linesCleared != finalPoints.linesCleared) ||
      (game.goal.pointsGained &&
        game.goal.pointsGained != finalPoints.pointsGained) ||
      (game.goal.tspinDoubles &&
        game.goal.tspinDoubles != finalPoints.tspinDoubles) ||
      (game.goal.tspinMiniDoubles &&
        game.goal.tspinMiniDoubles != finalPoints.tspinMiniDoubles) ||
      (game.goal.tspinMinis &&
        game.goal.tspinMinis != finalPoints.tspinMinis) ||
      (game.goal.tspinSingles &&
        game.goal.tspinSingles != finalPoints.tspinSingles) ||
      (game.goal.tspinTriples &&
        game.goal.tspinTriples != finalPoints.tspinTriples) ||
      (game.goal.finalState &&
        !isBoardEqual(game.goal.finalState!, finalBoardState))
    )
      onGameLose();
    else {
      onGameWin();
      setIsWin(true);
    }
  };

  const onGameResetHandler = () => {
    setPoints({
      backToBackLevel: 0,
      linesCleared: 0,
      pointsGained: 0,
      tspinDoubles: 0,
      tspinSingles: 0,
      tspinTriples: 0,
      tspinMiniDoubles: 0,
      tspinMinis: 0,
    });
    setIsWin(false);
  };

  return (
    <div>
      <SettingsPage
        showSettings={showSettings}
        onSettingsSave={onSettingsSaveHandler}
        onSettingCancel={onSettingCancelHandler}
        currentSettings={settings}
      />
      <Tetris
        width={200}
        height={400}
        startingBoardState={game.startingBoardState}
        startingPieceQueue={game.startingPieceQueue}
        generatePieceQueue={false}
        onShowSettings={onShowSettings}
        onPointGained={onPointsGained}
        onGameEnd={onGameEnd}
        onGameNext={onGameNext}
        onGamePrevious={onGamePrevious}
        onGameReset={onGameResetHandler}
        isWin={isWin}
        settings={settings}
      />
      <GoalDisplay goal={game.goal} />
    </div>
  );
};

export default TetrisGame;
