import { Goal } from "src/models/game_description.model";

export enum Rotation {
  Zero = 0,
  Clock = 1,
  OneEighty = 2,
  Counter = 3,
}

export enum PieceType {
  T = "T",
  S = "S",
  Z = "Z",
  L = "L",
  O = "O",
  J = "J",
  I = "I",
  None = "",
}

export type Moves =
  | "moveLeft"
  | "moveRight"
  | "rotate90"
  | "rotate180"
  | "rotate270"
  | "holdPiece"
  | "softDrop"
  | "hardDrop"
  | "reset";

export type TetrisPiece = {
  pieceType: PieceType;
  pieceRotation: Rotation;
  pieceLocation: [number, number];
  isSlamKicked: boolean;
};

export interface Points extends Goal {
  backToBackLevel: number;
}
