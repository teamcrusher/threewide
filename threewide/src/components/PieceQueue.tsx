import React from "react";
import {
  ITile,
  JTile,
  LTile,
  STile,
  ZTile,
  OTile,
  TTile,
  DefaultTile,
} from "@public/BoardTiles";
import { PieceType } from "src/types/tetris";
import { StaticImageData } from "next/image";

const PieceQueue = ({ queue }: { queue: PieceType[] }) => {
  function getTextureFromBoardStateTile(boardTile: PieceType): StaticImageData {
    let tile;

    switch (boardTile) {
      case "T":
        tile = TTile;
        break;
      case "I":
        tile = ITile;
        break;
      case "J":
        tile = JTile;
        break;
      case "L":
        tile = LTile;
        break;
      case "S":
        tile = STile;
        break;
      case "Z":
        tile = ZTile;
        break;
      case "O":
        tile = OTile;
        break;
      default:
        tile = DefaultTile;
        break;
    }
    return tile;
  }

  function getPieceQueue(q: PieceType[]) {
    let pieces = [];
    for (let queueElement of q) {
      pieces.push(
        <img
          src={getTextureFromBoardStateTile(queueElement).src}
          className="noSelect pieceQueue"
          width="10px"
          height="10px"
        />
      );

      if (pieces.length == 7) break;
    }

    return pieces;
  }

  return <div>{getPieceQueue(queue)}</div>;
};

export default PieceQueue;
