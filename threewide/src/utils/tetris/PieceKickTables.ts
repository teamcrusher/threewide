import { PieceType, Rotation } from "../../types/tetris";

const defaultKicktable: { [id: number]: { [id: number]: [number, number][] } } =
  {
    0: {
      1: [
        [0, 0],
        [-1, 0],
        [-1, -1],
        [0, 2],
        [-1, 2],
      ],
      3: [
        [0, 0],
        [1, 0],
        [1, -1],
        [0, 2],
        [1, 2],
      ],
    },
    1: {
      1: [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, -2],
        [1, -2],
      ],
      3: [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, -2],
        [1, -2],
      ],
    },
    2: {
      1: [
        [0, 0],
        [1, 0],
        [1, -1],
        [0, 2],
        [1, 2],
      ],
      3: [
        [0, 0],
        [-1, 0],
        [-1, -1],
        [0, 2],
        [-1, 2],
      ],
    },
    3: {
      1: [
        [0, 0],
        [-1, 0],
        [-1, 1],
        [0, -2],
        [-1, -2],
      ],
      3: [
        [0, 0],
        [-1, 0],
        [-1, 1],
        [0, -2],
        [-1, -2],
      ],
    },
  };

const default180KickTable: { [id: number]: [number, number][] } = {
  0: [
    [0, 0],
    [0, -1],
    [1, -1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ],
  1: [
    [0, 0],
    [1, 0],
    [1, -2],
    [1, -1],
    [0, -2],
    [0, -1],
  ],
  2: [
    [0, 0],
    [0, 1],
    [-1, 1],
    [1, 1],
    [-1, 0],
    [1, 0],
  ],
  3: [
    [0, 0],
    [-1, 0],
    [-1, -2],
    [-1, -1],
    [0, -2],
    [0, -1],
  ],
};

const iKickTable: { [id: number]: { [id: number]: [number, number][] } } = {
  0: {
    1: [
      [0, 0],
      [1, 0],
      [-2, 0],
      [-2, 1],
      [1, -2],
    ],
    3: [
      [0, 0],
      [-1, 0],
      [2, 0],
      [2, 1],
      [-1, -2],
    ],
  },
  1: {
    1: [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, -2],
      [2, 1],
    ],
    3: [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, -2],
      [2, -1],
    ],
  },
  2: {
    1: [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, -1],
      [-1, 2],
    ],
    3: [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, -1],
      [1, 2],
    ],
  },
  3: {
    1: [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, -2],
      [-2, -1],
    ],
    3: [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, -2],
      [-2, 1],
    ],
  },
};

function getTableFromPieceAndRotation(
  pieceType: PieceType,
  currentRotation: Rotation,
  rotation: Rotation
): [number, number][] {
  if (rotation == 2) {
    return default180KickTable[currentRotation]!;
  } else if (pieceType == "I") {
    return iKickTable[currentRotation]![rotation]!;
  } else {
    return defaultKicktable[currentRotation]![rotation]!;
  }
}

export { getTableFromPieceAndRotation };
