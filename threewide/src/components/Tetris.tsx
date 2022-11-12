import Board from "./Board";
import PieceQueue from "./PieceQueue";
import { getTextureFromBoardStateTile, ShadowPiece } from "@public/BoardTiles";
import Piece from "./Piece";
import { getTileLocationsFromPieceAndRotations } from "@utils/tetris/PieceRotations";
import KeyListener from "./KeyListener";
import { getTableFromPieceAndRotation } from "@utils/tetris/PieceKickTables";
import { PieceType, Rotation } from "../types/tetris";

import { useState, useEffect } from "react";

const useDebounce = (
  val: DAS,
  cancel: boolean,
  setCancel: (cancel: boolean) => void
) => {
  const [debounceVal, setDebounceVal] = useState(val);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!cancel && val.direction != null && !val.enabled) {
      timer = setTimeout(() => setDebounceVal(val), 100);
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
};

type TetrisPiece = {
  pieceType: PieceType;
  pieceRotation: Rotation;
  pieceLocation: [number, number];
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
}: TetrisProps) => {
  const [isSoftDroping, setIsSoftDroping] = useState<boolean>(false);
  const [currentDAS, setCurrentDAS] = useState<DAS>({
    direction: null,
    enabled: false,
  });
  const [cancelDAS, setCancelDAS] = useState<boolean>(false);

  const deBouncedDAS = useDebounce(currentDAS, cancelDAS, setCancelDAS);

  useEffect(() => {
    if (deBouncedDAS.direction == "left") {
      movePieceLeft(10);
    } else if (deBouncedDAS.direction == "right") {
      movePieceRight(10);
    }
    setCurrentDAS({ direction: deBouncedDAS.direction, enabled: true });
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
  });

  const [currentHeldPiece, setCurrentHeldPiece] = useState<HeldPiece>({
    pieceType: PieceType.None,
    hasHeldPiece: false,
  });

  const [board, setBoard] = useState<PieceType[][]>(startingBoardState);
  const [queue, setQueue] = useState<PieceType[]>(startingPieceQueue.slice(1));

  function getPieceStartingLocationFromPieceType(
    pieceType: PieceType,
    newBoard: PieceType[][]
  ): [number, number] {
    let startingYLocation = 0;

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
      startingYLocation = getPathFindPieceWithPieceType(
        [0, 1],
        [startingXLocation, 20],
        [startingXLocation, 0],
        pieceType,
        newBoard
      )[1];
    }

    return [startingXLocation, startingYLocation];
  }

  if (generatePieceQueue && queue.length < 14) {
    let newQueue = [...queue];

    newQueue = newQueue.concat(generateBag());
    console.log(newQueue);
    if (queue.length === 0) {
      let firstPiece = newQueue[0]!;

      setCurrentPiece((piece: TetrisPiece): TetrisPiece => {
        piece.pieceType = firstPiece;
        piece.pieceLocation = getPieceStartingLocationFromPieceType(
          firstPiece,
          board
        );
        piece.pieceRotation = 0;
        return { ...piece };
      });
      newQueue = newQueue.slice(1);
    }

    newQueue = newQueue.concat(generateBag());

    setQueue(newQueue);
  }

  function generateBag(): PieceType[] {
    let pieces: PieceType[] = [
      PieceType.T,
      PieceType.S,
      PieceType.J,
      PieceType.L,
      PieceType.O,
      PieceType.Z,
      PieceType.I,
    ];

    for (let i = 0; i < 7; i++) {
      let randIndex = Math.floor(Math.random() * 7);
      let tmp = pieces[i];
      pieces[i] = pieces[randIndex]!;
      pieces[randIndex] = tmp!;
    }

    return pieces;
  }

  function popPiece(): PieceType {
    let nextPiece = queue[0]!;
    let newQueue = queue.slice(1);

    if (generatePieceQueue && queue.length <= 14) {
      newQueue.concat(generateBag());
    }

    setQueue(newQueue);
    return nextPiece;
  }

  function onHandleRotatePiece(rotation: Rotation): void {
    //var currentTime = new Date();
    let newLocation = currentPiece.pieceLocation;
    let newRotation = (currentPiece.pieceRotation + rotation) % 4;

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

    let kickTables = getTableFromPieceAndRotation(
      currentPiece.pieceType,
      currentPiece.pieceRotation,
      rotation
    );
    console.log(kickTables);
    for (let i = 0; i < kickTables.length; i++) {
      let kickLocation: [number, number] = [
        newLocation[0] + kickTables[i]![0],
        newLocation[1] + kickTables[i]![1],
      ];
      console.log(kickLocation, kickTables[i]);
      if (isPieceMoveValidWithRotation(kickLocation, newRotation)) {
        newLocation = kickLocation;
        console.log(kickLocation);
        break;
      } else if (i == kickTables.length - 1) {
        return;
      }
    }

    if (isSoftDroping) {
      console.log("KICK LOCATION", newLocation);
      newLocation = getPathFindPieceWithRotation(
        [0, 1],
        [newLocation[0], 20],
        newLocation,
        newRotation
      );
      console.log("KICK LOCATION SOFT DROPPED", newLocation);
    }

    setCurrentPiece((piece: TetrisPiece): TetrisPiece => {
      piece.pieceLocation = newLocation;
      piece.pieceRotation = newRotation;
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
      newLocation = getPathFindPiece([0, 1], [newLocation[0], 20], newLocation);
    }

    if (newLocation != currentPiece.pieceLocation) {
      setCurrentPiece((piece: TetrisPiece): TetrisPiece => {
        piece.pieceLocation = newLocation;
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
    let tileLocations: [number, number][] =
      getTileLocationsFromPieceAndRotations(
        currentPiece.pieceType,
        currentPiece.pieceRotation
      );
    for (let tileLocation of tileLocations) {
      if (
        locationOutOfBound([
          tileLocation[0] + location[0],
          tileLocation[1] + location[1],
        ]) ||
        board[location[1] + tileLocation[1]]![location[0] + tileLocation[0]] !==
          ""
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
    let tileLocations: [number, number][] =
      getTileLocationsFromPieceAndRotations(currentPiece.pieceType, rotation);
    for (let tileLocation of tileLocations) {
      if (
        locationOutOfBound([
          tileLocation[0] + location[0],
          tileLocation[1] + location[1],
        ]) ||
        board[location[1] + tileLocation[1]]![location[0] + tileLocation[0]] !==
          ""
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
    let tileLocations: [number, number][] =
      getTileLocationsFromPieceAndRotations(pieceType, 0);
    for (let tileLocation of tileLocations) {
      if (
        locationOutOfBound([
          tileLocation[0] + location[0],
          tileLocation[1] + location[1],
        ]) ||
        newBoard[location[1] + tileLocation[1]]![
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
      location[1] >= 20
    );
  }

  function onHoldPiece(): void {
    if (currentHeldPiece.hasHeldPiece) return;

    if (currentHeldPiece.pieceType == "") {
      setCurrentHeldPiece({
        pieceType: currentPiece.pieceType,
        hasHeldPiece: true,
      });
      setCurrentPiece({
        pieceType: queue[0]!,
        pieceLocation: getPieceStartingLocationFromPieceType(queue[0]!, board),
        pieceRotation: 0,
      });
      popPiece();
    } else {
      let heldPiece = currentHeldPiece.pieceType;
      setCurrentHeldPiece({
        pieceType: currentPiece.pieceType,
        hasHeldPiece: true,
      });
      setCurrentPiece({
        pieceType: heldPiece,
        pieceLocation: getPieceStartingLocationFromPieceType(heldPiece, board),
        pieceRotation: 0,
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
    let placePieceLocation: [number, number] = getPathFindPiece(
      [0, 1],
      [currentPiece.pieceLocation[0], 20],
      currentPiece.pieceLocation
    );

    let tileLocations = getTileLocationsFromPieceAndRotations(
      currentPiece.pieceType,
      currentPiece.pieceRotation
    );

    for (let tileLocation of tileLocations) {
      board[tileLocation[1] + placePieceLocation[1]]![
        tileLocation[0] + placePieceLocation[0]
      ] = currentPiece.pieceType;
    }

    let removedYLocations = new Set<number>();
    for (let tileLocation of tileLocations) {
      let yLocationToCheck = tileLocation[1] + placePieceLocation[1];
      if (isRowFull(board[yLocationToCheck]!)) {
        removedYLocations.add(yLocationToCheck);
      }
    }

    let newBoard: PieceType[][] = [];
    for (let row = 0; row < 20; row++) {
      if (removedYLocations.has(row)) {
        newBoard.unshift([...EMPTY_ROW]);
      } else {
        newBoard.push(board[row]!);
      }
    }

    setCurrentHeldPiece({ ...currentHeldPiece, hasHeldPiece: false });
    popPiece();
    setBoard(newBoard);

    setCurrentPiece({
      pieceType: queue[0]!,
      pieceLocation: getPieceStartingLocationFromPieceType(queue[0]!, newBoard),
      pieceRotation: 0,
    });
  }

  function onSoftDropHandler(): void {
    setIsSoftDroping(true);

    let softDropLocation = getPathFindPiece(
      [0, 1],
      [currentPiece.pieceLocation[0], 20],
      currentPiece.pieceLocation
    );

    setCurrentPiece({ ...currentPiece, pieceLocation: softDropLocation });
  }

  function onSoftDropDisable(): void {
    setIsSoftDroping(false);
  }

  function isRowFull(row: PieceType[]): boolean {
    for (let tile of row) {
      if (tile === "") return false;
    }
    return true;
  }

  let shadowPieceLocation = getPathFindPiece(
    [0, 1],
    [currentPiece.pieceLocation[0], 20],
    currentPiece.pieceLocation
  );

  const tileDimensions = { height: 20, width: 20 };

  return (
    <KeyListener
      onSoftDropDisable={onSoftDropDisable}
      onHoldPieceHandler={onHoldPiece}
      onSoftDropHandler={onSoftDropHandler}
      onDasDisable={onDasDisable}
      onMovePieceLeftHandler={onMovePieceLeftHandler}
      onMovePieceRightHandler={onMovePieceRightHandler}
      onHardDropHandler={onHandlePlacePiece}
      onRotatePieceHandler={onHandleRotatePiece}
    >
      <div className="flex h-[400px]">
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
          <Board width={width} height={height} boardState={board} />
        </div>

        <PieceQueue queue={queue} />
      </div>
    </KeyListener>
  );
};

export default Tetris;
