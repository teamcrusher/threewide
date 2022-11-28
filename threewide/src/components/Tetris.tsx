import Board from "./Board";
import PieceQueue from "./PieceQueue";
import { getTextureFromBoardStateTile, ShadowPiece } from "@public/BoardTiles";
import Piece from "./Piece";
import { getTileLocationsFromPieceAndRotations } from "@utils/tetris/PieceRotations";
import KeyListener from "./KeyListener";
import { getTableFromPieceAndRotation } from "@utils/tetris/PieceKickTables";
import { PieceType, Points, Rotation, TetrisPiece } from "../types/tetris";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Settings } from "./Settings";
import EndGame from "./EndGame";

const useDebounce = (
  val: DAS,
  dasTime: number,
  cancel: boolean,
  setCancel: (cancel: boolean) => void
) => {
  const [debounceVal, setDebounceVal] = useState(val);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!cancel && val.direction != null && !val.enabled) {
      timer = setTimeout(() => setDebounceVal(val), dasTime);
      setCancel(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [val, cancel, setCancel]);

  return debounceVal;
};

type TetrisProps = {
  width: number;
  height: number;
  startingBoardState: PieceType[][];
  startingPieceQueue: PieceType[];
  generatePieceQueue: boolean;
  settings: Settings;
  onPointGained?: (
    currentBoardState: PieceType[][],
    completedBoardState: PieceType[][],
    completedPiece: TetrisPiece,
    clearedLines: number,
    combo: number
  ) => Points;
  onGameEnd?: (
    finalBoardState: PieceType[][],
    lastPoints: Points | undefined
  ) => void;
  onShowSettings?: () => void;
  onGameNext?: () => void;
  onGamePrevious?: () => void;
  onGameReset?: () => void;
  isWin?: boolean;
  children?: any;
};

type HeldPiece = {
  pieceType: PieceType;
  hasHeldPiece: boolean;
};

type Direction = "left" | "right" | null;

type DAS = {
  direction: Direction;
  enabled: boolean;
};

const Tetris = ({
  width,
  height,
  startingBoardState,
  startingPieceQueue,
  generatePieceQueue,
  settings,
  onPointGained,
  onGameEnd,
  onShowSettings,
  onGameNext,
  onGamePrevious,
  onGameReset,
  isWin = false,
  children,
}: TetrisProps) => {
  const [isSoftDroping, setIsSoftDroping] = useState<boolean>(false);
  const [currentDAS, setCurrentDAS] = useState<DAS>({
    direction: null,
    enabled: false,
  });
  const [cancelDAS, setCancelDAS] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState(false);
  const deBouncedDAS = useDebounce(
    currentDAS,
    settings.dasAmount,
    cancelDAS,
    setCancelDAS
  );

  useEffect(() => {
    setCurrentDAS({ direction: deBouncedDAS.direction, enabled: true });

    if (deBouncedDAS.direction == "left") {
      movePieceLeft(10);
    } else if (deBouncedDAS.direction == "right") {
      movePieceRight(10);
    }
  }, [deBouncedDAS]);

  const isLeftDas = currentDAS.direction == "left" && currentDAS.enabled;
  const isRightDas = currentDAS.direction == "right" && currentDAS.enabled;

  const [currentPiece, setCurrentPiece] = useState<TetrisPiece>({
    pieceType:
      startingPieceQueue.length == 0 ? PieceType.None : startingPieceQueue[0]!,
    pieceRotation: 0,
    pieceLocation: getPieceStartingLocationFromPieceType(
      startingPieceQueue[0]!,
      startingBoardState
    ),
    isSlamKicked: false,
  });
  const [combo, setCombo] = useState<number>(0);

  const [currentHeldPiece, setCurrentHeldPiece] = useState<HeldPiece>({
    pieceType: PieceType.None,
    hasHeldPiece: false,
  });

  const copyBoard = (board: PieceType[][]): PieceType[][] => {
    const newBoard: PieceType[][] = [];

    for (const row of board) {
      const newRow: PieceType[] = [];
      for (const item of row) {
        newRow.push(item);
      }
      newBoard.push(newRow);
    }
    return newBoard;
  };

  const [board, setBoard] = useState<PieceType[][]>(
    copyBoard(startingBoardState)
  );
  const [queue, setQueue] = useState<PieceType[]>(startingPieceQueue.slice(1));

  function getPieceStartingLocationFromPieceType(
    pieceType: PieceType,
    newBoard: PieceType[][]
  ): [number, number] {
    let startingYLocation = -3;

    let startingXLocation = 3;

    if (pieceType == PieceType.O) startingXLocation = 4;

    if (isLeftDas ?? false) {
      startingXLocation = getPathFindPieceWithPieceType(
        [-1, 0],
        [-4, startingYLocation],
        [startingXLocation, startingYLocation],
        pieceType,
        newBoard
      )[0];
    } else if (isRightDas ?? false) {
      startingXLocation = getPathFindPieceWithPieceType(
        [1, 0],
        [14, startingYLocation],
        [startingXLocation, startingYLocation],
        pieceType,
        newBoard
      )[0];
    }

    if (isSoftDroping) {
      startingYLocation =
        getPathFindPieceWithPieceType(
          [0, 1],
          [startingXLocation, 23],
          [startingXLocation, 0],
          pieceType,
          newBoard
        )[1] - 3;
    }

    return [startingXLocation, startingYLocation];
  }

  useEffect(() => {
    setQueue(fillQueue(queue));
  }, []);

  function fillQueue(queue: PieceType[]): PieceType[] {
    if (generatePieceQueue && queue.length < 14) {
      let newQueue = [...queue];

      newQueue = newQueue.concat(generateBag());
      if (queue.length === 0) {
        const firstPiece = newQueue[0]!;

        setCurrentPiece((piece: TetrisPiece): TetrisPiece => {
          piece.pieceType = firstPiece;
          piece.pieceLocation = getPieceStartingLocationFromPieceType(
            firstPiece,
            board
          );
          piece.pieceRotation = 0;
          piece.isSlamKicked = false;
          return { ...piece };
        });
        newQueue = newQueue.slice(1);
      }

      newQueue = newQueue.concat(generateBag());

      return newQueue;
    } else {
      return queue;
    }
  }

  function generateBag(): PieceType[] {
    const pieces: PieceType[] = [
      PieceType.T,
      PieceType.S,
      PieceType.J,
      PieceType.L,
      PieceType.O,
      PieceType.Z,
      PieceType.I,
    ];

    for (let i = 0; i < 7; i++) {
      const randIndex = Math.floor(Math.random() * 7);
      const tmp = pieces[i];
      pieces[i] = pieces[randIndex]!;
      pieces[randIndex] = tmp!;
    }

    return pieces;
  }

  function popPiece(): PieceType {
    const nextPiece = queue[0]!;
    let newQueue = queue.slice(1);

    if (generatePieceQueue && queue.length <= 14) {
      newQueue.concat(generateBag());
    } else if (newQueue.length == 0) {
      newQueue = [PieceType.None];
    }

    newQueue = fillQueue(newQueue);
    setQueue(newQueue);
    return nextPiece;
  }

  function onResetHandler() {
    if (onGameReset) onGameReset();
    setBoard(copyBoard(startingBoardState));

    const filledQueue = fillQueue(startingPieceQueue);
    setCurrentHeldPiece({
      pieceType: PieceType.None,
      hasHeldPiece: false,
    });

    setCurrentPiece({
      pieceType: filledQueue[0]!,
      pieceLocation: getPieceStartingLocationFromPieceType(
        filledQueue[0]!,
        startingBoardState
      ),
      pieceRotation: Rotation.Zero,
      isSlamKicked: false,
    });
    setQueue(filledQueue.slice(1));
    setGameOver(false);
  }

  function onHandleRotatePiece(rotation: Rotation): void {
    let newLocation = currentPiece.pieceLocation;
    const newRotation = (currentPiece.pieceRotation + rotation) % 4;

    if (isLeftDas) {
      newLocation = getPathFindPieceWithRotation(
        [-1, 0],
        [-4, newLocation[1]],
        newLocation,
        newRotation
      );
    } else if (isRightDas) {
      newLocation = getPathFindPieceWithRotation(
        [1, 0],
        [14, newLocation[1]],
        newLocation,
        newRotation
      );
    }

    const kickTables = getTableFromPieceAndRotation(
      currentPiece.pieceType,
      currentPiece.pieceRotation,
      rotation
    );

    let isSlamKicked = false;
    for (let i = 0; i < kickTables.length; i++) {
      const kickLocation: [number, number] = [
        newLocation[0] + kickTables[i]![0],
        newLocation[1] + kickTables[i]![1],
      ];

      if (isPieceMoveValidWithRotation(kickLocation, newRotation)) {
        newLocation = kickLocation;
        if (i > 1) isSlamKicked = true;
        break;
      } else if (i == kickTables.length - 1) {
        return;
      }
    }

    if (isSoftDroping) {
      newLocation = getPathFindPieceWithRotation(
        [0, 1],
        [newLocation[0], 20],
        newLocation,
        newRotation
      );
    }

    setCurrentPiece((piece: TetrisPiece): TetrisPiece => {
      piece.pieceLocation = newLocation;
      piece.pieceRotation = newRotation;
      piece.isSlamKicked = isSlamKicked;
      return { ...piece };
    });
  }

  function onMovePieceRightHandler(): void {
    movePieceRight(1);

    setCancelDAS(true);
    setCancelDAS(false);
    setCurrentDAS({ direction: "right", enabled: false });
  }

  function onMovePieceLeftHandler(): void {
    movePieceLeft(1);

    setCancelDAS(true);
    setCancelDAS(false);
    setCurrentDAS({ direction: "left", enabled: false });
  }

  function onDasDisable(direction: Direction) {
    if (
      (direction == "left" && currentDAS.direction == "left") ||
      (direction == "right" && currentDAS.direction == "right")
    ) {
      setCancelDAS(true);
      setCurrentDAS({ direction: null, enabled: false });
    }
  }

  function movePieceLeft(amount: number) {
    let newLocation = getPathFindPiece(
      [-1, 0],
      [currentPiece.pieceLocation[0] - amount, currentPiece.pieceLocation[1]],
      currentPiece.pieceLocation
    );

    if (isSoftDroping) {
      newLocation = getPathFindPiece([0, 1], [newLocation[0], 20], newLocation);
    }

    if (newLocation != currentPiece.pieceLocation) {
      setCurrentPiece((piece: TetrisPiece): TetrisPiece => {
        piece.pieceLocation = newLocation;
        piece.isSlamKicked = false;
        return { ...piece };
      });
    }
  }

  function movePieceRight(amount: number) {
    let newLocation = getPathFindPiece(
      [1, 0],
      [currentPiece.pieceLocation[0] + amount, currentPiece.pieceLocation[1]],
      currentPiece.pieceLocation
    );

    if (isSoftDroping) {
      newLocation = getPathFindPiece([0, 1], [newLocation[0], 23], newLocation);
    }

    if (newLocation != currentPiece.pieceLocation) {
      setCurrentPiece((piece: TetrisPiece): TetrisPiece => {
        piece.pieceLocation = newLocation;
        piece.isSlamKicked = false;
        return { ...piece };
      });
    }
  }

  function getPathFindPiece(
    incrementor: [number, number],
    desiredLocation: [number, number],
    startingLocation: [number, number]
  ): [number, number] {
    let newLocation = startingLocation;

    while (
      isPieceMoveValid([
        newLocation[0] + incrementor[0],
        newLocation[1] + incrementor[1],
      ]) &&
      (desiredLocation[0] != newLocation[0] ||
        desiredLocation[1] != newLocation[1])
    ) {
      newLocation = [
        newLocation[0] + incrementor[0],
        newLocation[1] + incrementor[1],
      ];
    }

    return newLocation;
  }

  function getPathFindPieceWithRotation(
    incrementor: [number, number],
    desiredLocation: [number, number],
    startingLocation: [number, number],
    rotation: Rotation
  ): [number, number] {
    let newLocation = startingLocation;

    while (
      isPieceMoveValidWithRotation(
        [newLocation[0] + incrementor[0], newLocation[1] + incrementor[1]],
        rotation
      ) &&
      (desiredLocation[0] != newLocation[0] ||
        desiredLocation[1] != newLocation[1])
    ) {
      newLocation = [
        newLocation[0] + incrementor[0],
        newLocation[1] + incrementor[1],
      ];
    }

    return newLocation;
  }

  function getPathFindPieceWithPieceType(
    incrementor: [number, number],
    desiredLocation: [number, number],
    startingLocation: [number, number],
    pieceType: PieceType,
    newBoard: PieceType[][]
  ): [number, number] {
    let newLocation = startingLocation;

    while (
      isPieceMoveValidWithPieceType(
        [newLocation[0] + incrementor[0], newLocation[1] + incrementor[1]],
        pieceType,
        newBoard
      ) &&
      (desiredLocation[0] != newLocation[0] ||
        desiredLocation[1] != newLocation[1])
    ) {
      newLocation = [
        newLocation[0] + incrementor[0],
        newLocation[1] + incrementor[1],
      ];
    }

    return newLocation;
  }

  function isPieceMoveValid(location: [number, number]): boolean {
    const tileLocations: [number, number][] =
      getTileLocationsFromPieceAndRotations(
        currentPiece.pieceType,
        currentPiece.pieceRotation
      );

    for (const tileLocation of tileLocations) {
      if (
        locationOutOfBound([
          tileLocation[0] + location[0],
          tileLocation[1] + location[1] + 3,
        ]) ||
        board[location[1] + tileLocation[1] + 3]![
          location[0] + tileLocation[0]
        ] !== ""
      ) {
        return false;
      }
    }
    return true;
  }

  function isPieceMoveValidWithRotation(
    location: [number, number],
    rotation: Rotation
  ): boolean {
    const tileLocations: [number, number][] =
      getTileLocationsFromPieceAndRotations(currentPiece.pieceType, rotation);
    for (const tileLocation of tileLocations) {
      if (
        locationOutOfBound([
          tileLocation[0] + location[0],
          tileLocation[1] + location[1] + 3,
        ]) ||
        board[location[1] + tileLocation[1] + 3]![
          location[0] + tileLocation[0]
        ] !== ""
      ) {
        return false;
      }
    }
    return true;
  }

  function isPieceMoveValidWithRotationAndPieceType(
    location: [number, number],
    rotation: Rotation,
    pieceType: PieceType,
    newBoard: PieceType[][]
  ): boolean {
    const tileLocations: [number, number][] =
      getTileLocationsFromPieceAndRotations(pieceType, rotation);
    for (const tileLocation of tileLocations) {
      if (
        locationOutOfBound([
          tileLocation[0] + location[0],
          tileLocation[1] + location[1] + 3,
        ]) ||
        newBoard[location[1] + tileLocation[1] + 3]![
          location[0] + tileLocation[0]
        ] !== ""
      ) {
        return false;
      }
    }
    return true;
  }

  function isPieceMoveValidWithPieceType(
    location: [number, number],
    pieceType: PieceType,
    newBoard: PieceType[][]
  ): boolean {
    const tileLocations: [number, number][] =
      getTileLocationsFromPieceAndRotations(pieceType, 0);
    for (const tileLocation of tileLocations) {
      if (
        locationOutOfBound([
          tileLocation[0] + location[0],
          tileLocation[1] + location[1] + 3,
        ]) ||
        newBoard[location[1] + tileLocation[1] + 3]![
          location[0] + tileLocation[0]
        ] !== ""
      ) {
        return false;
      }
    }
    return true;
  }

  function locationOutOfBound(location: [number, number]): boolean {
    return (
      location[0] < 0 ||
      location[1] < 0 ||
      location[0] >= 10 ||
      location[1] >= 23
    );
  }

  function onHoldPiece(): void {
    if (currentHeldPiece.hasHeldPiece) return;

    if (currentHeldPiece.pieceType == "") {
      if (queue.length == 0 || queue[0] == PieceType.None) return;
      setCurrentHeldPiece({
        pieceType: currentPiece.pieceType,
        hasHeldPiece: true,
      });

      setCurrentPiece({
        pieceType: queue[0]!,
        pieceLocation: getPieceStartingLocationFromPieceType(queue[0]!, board),
        pieceRotation: 0,
        isSlamKicked: false,
      });
      popPiece();
    } else {
      const heldPiece = currentHeldPiece.pieceType;
      setCurrentHeldPiece({
        pieceType: currentPiece.pieceType,
        hasHeldPiece: true,
      });
      setCurrentPiece({
        pieceType: heldPiece,
        pieceLocation: getPieceStartingLocationFromPieceType(heldPiece, board),
        pieceRotation: 0,
        isSlamKicked: false,
      });
    }
  }

  const EMPTY_ROW: PieceType[] = [
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
  ];

  function onHandlePlacePiece(): void {
    const placePieceLocation: [number, number] = getPathFindPiece(
      [0, 1],
      [currentPiece.pieceLocation[0], 23],
      currentPiece.pieceLocation
    );

    const tileLocations = getTileLocationsFromPieceAndRotations(
      currentPiece.pieceType,
      currentPiece.pieceRotation
    );

    for (const tileLocation of tileLocations) {
      board[tileLocation[1] + placePieceLocation[1] + 3]![
        tileLocation[0] + placePieceLocation[0]
      ] = currentPiece.pieceType;
    }

    const removedYLocations = new Set<number>();
    for (const tileLocation of tileLocations) {
      const yLocationToCheck = tileLocation[1] + placePieceLocation[1] + 3;
      if (isRowFull(board[yLocationToCheck]!)) {
        removedYLocations.add(yLocationToCheck);
      }
    }

    let newBoard: PieceType[][] = [];
    let clearedLines = 0;
    for (let row = 0; row < 23; row++) {
      if (removedYLocations.has(row)) {
        clearedLines += 1;
        newBoard.unshift([...EMPTY_ROW]);
      } else {
        newBoard.push([...board[row]!]!);
      }
    }

    let points: Points | undefined;

    if (onPointGained && clearedLines !== 0) {
      console.log("POINTS");
      points = onPointGained(
        board,
        newBoard,
        { ...currentPiece, pieceLocation: placePieceLocation },
        clearedLines,
        combo
      );
    }

    if (clearedLines == 0) {
      setCombo(0);
    } else {
      setCombo(combo + 1);
    }
    setBoard(newBoard);
    setCurrentHeldPiece({ ...currentHeldPiece, hasHeldPiece: false });
    popPiece();

    if (
      (queue.length == 0 || queue[0] == PieceType.None) &&
      currentHeldPiece.pieceType == PieceType.None
    ) {
      if (onGameEnd) onGameEnd(newBoard, points);
      setGameOver(true);
      setCurrentPiece({
        pieceType: queue[0] ?? PieceType.None,
        pieceLocation: [0, 0],
        pieceRotation: 0,
        isSlamKicked: false,
      });
      return;
    }

    const nextStartingLocation = getPieceStartingLocationFromPieceType(
      queue[0]!,
      newBoard
    );

    if (
      !isPieceMoveValidWithRotationAndPieceType(
        nextStartingLocation,
        Rotation.Zero,
        queue[0]!,
        newBoard
      ) ||
      !isInBoard(placePieceLocation)
    ) {
      if (onGameEnd) onGameEnd(newBoard, points);
      setGameOver(true);
      return;
    }

    setCurrentPiece({
      pieceType: queue[0] ?? PieceType.None,
      pieceLocation: nextStartingLocation,
      pieceRotation: 0,
      isSlamKicked: false,
    });
  }

  function isInBoard(placePieceLocation: [number, number]): boolean {
    let isInBoard = false;

    const tileLocations = getTileLocationsFromPieceAndRotations(
      currentPiece.pieceType,
      currentPiece.pieceRotation
    );

    for (const tileLocation of tileLocations) {
      if (tileLocation[1] + placePieceLocation[1] >= 0) {
        isInBoard = true;
      }
    }

    return isInBoard;
  }

  function onSoftDropHandler(): void {
    setIsSoftDroping(true);

    const softDropLocation = getPathFindPiece(
      [0, 1],
      [currentPiece.pieceLocation[0], 20],
      currentPiece.pieceLocation
    );

    if (
      softDropLocation[0] == currentPiece.pieceLocation[0] &&
      softDropLocation[1] == currentPiece.pieceLocation[1]
    )
      return;

    setCurrentPiece({
      ...currentPiece,
      pieceLocation: softDropLocation,
      isSlamKicked: false,
    });
  }

  function onSoftDropDisable(): void {
    setIsSoftDroping(false);
  }

  function isRowFull(row: PieceType[]): boolean {
    for (const tile of row) {
      if (tile === "") return false;
    }
    return true;
  }

  const shadowPieceLocation = getPathFindPiece(
    [0, 1],
    [currentPiece.pieceLocation[0], 20],
    currentPiece.pieceLocation
  );

  const tileDimensions = { height: 20, width: 20 };

  return (
    <KeyListener
      gameOver={gameOver}
      onSoftDropDisable={onSoftDropDisable}
      onHoldPieceHandler={onHoldPiece}
      onSoftDropHandler={onSoftDropHandler}
      onDasDisable={onDasDisable}
      onMovePieceLeftHandler={onMovePieceLeftHandler}
      onMovePieceRightHandler={onMovePieceRightHandler}
      onHardDropHandler={onHandlePlacePiece}
      onRotatePieceHandler={onHandleRotatePiece}
      onResetHandler={onResetHandler}
      onNextGame={onGameNext}
      onPreviousGame={onGamePrevious}
      settings={settings}
    >
      <div className="mt-20 flex">
        <div className=" flex w-20 justify-center">
          <Piece
            location={[0, 1]}
            tileDimensions={{ width: 15, height: 15 }}
            texture={getTextureFromBoardStateTile(currentHeldPiece.pieceType)}
            pieceType={currentHeldPiece.pieceType}
            rotation={0}
          />
        </div>

        <div>
          <Piece
            location={shadowPieceLocation}
            tileDimensions={tileDimensions}
            texture={ShadowPiece}
            pieceType={currentPiece.pieceType}
            rotation={currentPiece.pieceRotation}
          />
          <Piece
            location={currentPiece.pieceLocation}
            tileDimensions={tileDimensions}
            texture={getTextureFromBoardStateTile(currentPiece.pieceType)}
            pieceType={currentPiece.pieceType}
            rotation={currentPiece.pieceRotation}
          />
          <Board width={width} height={height} boardState={board}>
            {children}
            <EndGame
              onGameReset={onResetHandler}
              onNextGame={onGameNext}
              onPreviousGame={onGamePrevious}
              isWin={isWin}
              gameOver={gameOver}
            />
          </Board>
        </div>
        <div className="flex flex-col">
          <PieceQueue queue={queue} />
          <FontAwesomeIcon
            className="border-1 mb-0 mt-auto border-red-500 hover:cursor-pointer"
            size="3x"
            icon={faCog}
            onClick={onShowSettings}
          />
        </div>
      </div>
    </KeyListener>
  );
};

export default Tetris;
